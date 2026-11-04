import { Component, Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MAX_PANES, commitWidths, setSessions, setWidths, toggleSession, useSelection } from "./selection.js"

const PER_PAGE = 4
const AUTO_PANE_WIDTH = 200
const MIN_PANE_WIDTH = 160
const GUTTER = 9
const STORAGE_MODE = "dsh-split-view:mode"
const PENDING_KINDS = new Set(["approval", "plan-review", "question"])

// Stable owner props keep the pane outlet from re-rendering on unrelated updates.
const PANE_SLOT_PROPS = Object.freeze({})

function readMode() {
  try {
    return window.localStorage.getItem(STORAGE_MODE) === "minimal" ? "minimal" : "full"
  } catch {
    return "full"
  }
}

function writeMode(mode) {
  try {
    window.localStorage.setItem(STORAGE_MODE, mode)
  } catch {
    // Persistence is best-effort.
  }
}

function titleOf(row) {
  const title = typeof row?.title === "string" ? row.title.trim() : ""
  return title !== "" ? title : "未命名会话"
}

function activityOf(status) {
  if (status?.running) return "running"
  if (PENDING_KINDS.has(status?.pendingInteraction?.kind)) return "waiting"
  return "idle"
}

function statusLabel(kind) {
  if (kind === "running") return "进行中"
  if (kind === "waiting") return "等你回复"
  return "空闲"
}

function relativeTime(updatedAt, now) {
  if (typeof updatedAt !== "number" || updatedAt <= 0) return ""
  const delta = now - updatedAt
  if (delta < 60_000) return "刚刚"
  const minutes = Math.floor(delta / 60_000)
  if (minutes < 60) return `${minutes} 分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} 小时前`
  return `${Math.floor(hours / 24)} 天前`
}

function byRecency(left, right) {
  return (right.updatedAt ?? 0) - (left.updatedAt ?? 0)
}

/** The step the agent is on right now, read from its projected todo list. */
function currentStep(row) {
  const todos = row?.projectionValues?.todos
  if (!Array.isArray(todos)) return ""
  const running = todos.find((item) => item?.status === "in_progress")
  return typeof running?.content === "string" ? running.content.trim() : ""
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.6 2.6 9.4 9.4M9.4 2.6 2.6 9.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function GrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M4.4 2.2H2.2v2.2M7.6 9.8h2.2V7.6M2.2 2.2l3 3M9.8 9.8l-3-3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShrinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M5.2 2.2v3h-3M6.8 9.8v-3h3M2.2 5.2l3 3M9.8 6.8l-3-3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * One pane fails on its own: a Session reference whose Controller generation
 * ended or a broken chat node must not take the whole panel down.
 */
class PaneBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn("[dsh-split-view] pane failed to render:", error)
  }

  render() {
    return this.state.failed ? <div data-split-pane-fallback>会话不可用</div> : this.props.children
  }
}

/**
 * Hand one file drop to the composer of the pane under the pointer.
 *
 * Every mounted composer installs its own document-level file-drop listener
 * (installDocumentDropEvents in ui-attachment), so with N panes one drop would
 * reach all of them. The panel swallows the document event and replays it as a
 * paste inside the target composer's editor, which runs that composer's own
 * intake — limits, toasts, upload queue and directory handling included.
 */
function deliverDrop(pane, dataTransfer) {
  const editor = pane.querySelector('[contenteditable="true"]')
  if (editor === null) return
  let event
  try {
    event = new ClipboardEvent("paste", { clipboardData: dataTransfer, bubbles: true, cancelable: true })
  } catch {
    return
  }
  if (event.clipboardData === null || event.clipboardData === undefined) {
    try {
      Object.defineProperty(event, "clipboardData", { value: dataTransfer })
    } catch {
      return
    }
  }
  editor.dispatchEvent(event)
}

function canScrollInside(target, delta, boundary) {
  let element = target instanceof Element ? target : null
  while (element !== null && element !== boundary) {
    const style = window.getComputedStyle(element)
    if ((style.overflowY === "auto" || style.overflowY === "scroll") && element.scrollHeight > element.clientHeight + 1) {
      const canMove = delta < 0 ? element.scrollTop > 0 : element.scrollTop + element.clientHeight < element.scrollHeight - 1
      if (canMove) return true
    }
    element = element.parentElement
  }
  return false
}

/**
 * One column. On a paged strip it unmounts its conversation while it sits off
 * screen, so only the four visible Sessions render at any time.
 */
const SplitPane = memo(function SplitPane({
  id,
  width,
  reference,
  title,
  activity,
  focused,
  dropActive,
  canFocus,
  paged,
  initiallyVisible,
  unavailable,
  onClose,
  onToggleFocus,
  renderSlot,
  SessionProvider,
}) {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(!paged || initiallyVisible)

  useEffect(() => {
    if (!paged) {
      setVisible(true)
      return
    }
    const section = sectionRef.current
    if (section === null || typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const root = section.closest("[data-split-view-strip]")
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setVisible(entry.isIntersecting)
      },
      { root, rootMargin: "0px" },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [paged])

  return (
    <section
      ref={sectionRef}
      data-split-pane={id}
      data-focused={focused ? "" : undefined}
      data-drop-active={dropActive ? "" : undefined}
      style={{ width: `${width}px` }}
    >
      <header data-split-pane-head onDoubleClick={canFocus ? () => onToggleFocus(id) : undefined}>
        <span data-split-pane-dot={activity} />
        <span data-split-pane-title title={title}>
          {title}
        </span>
        <span data-split-pane-status>{statusLabel(activity)}</span>
        {canFocus ? (
          <button
            type="button"
            data-pane-action
            title={focused ? "还原分屏" : "展开这一屏"}
            aria-label={focused ? "还原分屏" : "展开这一屏"}
            onClick={(event) => {
              event.stopPropagation()
              onToggleFocus(id)
            }}
          >
            {focused ? <ShrinkIcon /> : <GrowIcon />}
          </button>
        ) : null}
        <button
          type="button"
          data-pane-action
          title="关闭该屏"
          aria-label="关闭该屏"
          onClick={(event) => {
            event.stopPropagation()
            onClose(id)
          }}
        >
          <CloseIcon />
        </button>
      </header>
      <div data-split-pane-body>
        {reference === undefined ? (
          unavailable ? <div data-split-pane-fallback>会话不可用</div> : <div data-split-pane-idle />
        ) : visible ? (
          <PaneBoundary>
            <SessionProvider session={reference}>{renderSlot("dsh-split-view.pane", PANE_SLOT_PROPS)}</SessionProvider>
          </PaneBoundary>
        ) : (
          <div data-split-pane-idle />
        )}
      </div>
    </section>
  )
})

function SplitRow({ id, title, step, activity, time, onClose }) {
  return (
    <div data-split-row={id} data-activity={activity}>
      <span data-split-pane-dot={activity} />
      <span data-split-row-title title={title}>
        {title}
      </span>
      <span data-split-row-detail title={step !== "" ? step : statusLabel(activity)}>
        {step !== "" ? step : statusLabel(activity)}
      </span>
      <span data-split-row-time>{time}</span>
      <button type="button" data-row-close title="关闭该屏" aria-label="关闭该屏" onClick={() => onClose(id)}>
        <CloseIcon />
      </button>
    </div>
  )
}

export default function SplitViewPanel(props) {
  const { useSessions, useSessionStatus, sessions, layout, renderSlot, SessionProvider } = props
  const rows = useSessions((state) => state.byId)
  const statuses = useSessionStatus((state) => state)
  const selection = useSelection()
  const [mode, setMode] = useState(readMode)
  const [stripWidth, setStripWidth] = useState(0)
  const [focusedId, setFocusedId] = useState(null)
  const [resizing, setResizing] = useState(false)
  const [dropTarget, setDropTarget] = useState(null)
  const [now, setNow] = useState(() => Date.now())
  const [overflow, setOverflow] = useState(false)
  const [stripEl, setStripEl] = useState(null)
  const [, setReferenceEpoch] = useState(0)
  const rootRef = useRef(null)
  const unavailable = useRef(new Set())
  const references = useRef(new Map())
  const dragDepth = useRef(0)

  const ids = selection.ids
  const paged = ids.length > PER_PAGE

  useEffect(() => {
    writeMode(mode)
  }, [mode])

  useEffect(() => {
    const root = rootRef.current
    if (root === null) return
    const publish = () => setStripWidth(root.clientWidth)
    publish()
    if (typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(publish)
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const held = references.current
    let changed = false
    if (mode === "full" && sessions !== undefined) {
      for (const id of ids) {
        if (held.has(id) || unavailable.current.has(id)) continue
        try {
          held.set(id, sessions.retain(id, { source: "splitView" }))
          Promise.resolve(sessions.refreshProjections?.(id)).catch(() => {})
          changed = true
        } catch {
          unavailable.current.add(id)
          changed = true
        }
      }
    }
    for (const [id, reference] of [...held]) {
      if (mode === "full" && ids.includes(id)) continue
      try {
        reference.release()
      } catch {
        // A reference that already ended is nothing to recover here.
      }
      held.delete(id)
      changed = true
    }
    if (changed) setReferenceEpoch((value) => value + 1)
  }, [ids, sessions, mode])

  useEffect(() => {
    if (sessions?.refresh === undefined) return
    const timer = window.setTimeout(() => {
      Promise.resolve(sessions.refresh()).catch(() => {})
    }, 800)
    return () => window.clearTimeout(timer)
  }, [sessions])

  useEffect(() => {
    const held = references.current
    return () => {
      for (const reference of held.values()) {
        try {
          reference.release()
        } catch {
          // Teardown ignores references the owner already released.
        }
      }
      held.clear()
    }
  }, [])

  useEffect(() => {
    if (mode !== "minimal") return
    setNow(Date.now())
    const timer = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(timer)
  }, [mode])

  // Wheel pages the strip once a column page is full; an inner scroller that
  // can still move keeps the wheel for itself.
  useEffect(() => {
    if (stripEl === null) return
    let lockedUntil = 0
    const onWheel = (event) => {
      if (event.deltaY === 0 || event.shiftKey) return
      if (stripEl.scrollWidth <= stripEl.clientWidth + 1) return
      if (canScrollInside(event.target, event.deltaY, stripEl)) return
      event.preventDefault()
      const now = performance.now()
      if (now < lockedUntil || Math.abs(event.deltaY) < 4) return
      lockedUntil = now + 380
      const page = stripEl.clientWidth
      stripEl.scrollBy({ left: event.deltaY > 0 ? page : -page, behavior: "smooth" })
    }
    stripEl.addEventListener("wheel", onWheel, { passive: false })
    return () => stripEl.removeEventListener("wheel", onWheel)
  }, [stripEl])

  // File drags belong to the pane under the pointer, never to every pane.
  useEffect(() => {
    if (mode !== "full" || ids.length < 2) return
    const isFileDrag = (event) => {
      const transfer = event.dataTransfer
      return transfer !== null && transfer !== undefined && transfer.types !== undefined && [...transfer.types].includes("Files")
    }
    const paneOf = (event) => {
      const target = event.target
      if (!(target instanceof Element)) return null
      return target.closest("[data-split-pane]")
    }
    const clear = () => {
      dragDepth.current = 0
      setDropTarget(null)
    }
    const onDragEnter = (event) => {
      if (!isFileDrag(event)) return
      event.preventDefault()
      event.stopPropagation()
      dragDepth.current += 1
    }
    const onDragOver = (event) => {
      if (!isFileDrag(event)) return
      event.preventDefault()
      event.stopPropagation()
      const transfer = event.dataTransfer
      if (transfer !== null) transfer.dropEffect = "copy"
      const pane = paneOf(event)
      setDropTarget(pane === null ? null : pane.getAttribute("data-split-pane"))
    }
    const onDragLeave = (event) => {
      if (!isFileDrag(event)) return
      dragDepth.current = Math.max(0, dragDepth.current - 1)
      if (dragDepth.current === 0) setDropTarget(null)
    }
    const onDrop = (event) => {
      if (!isFileDrag(event)) return
      event.preventDefault()
      event.stopPropagation()
      const pane = paneOf(event)
      clear()
      if (pane === null || event.dataTransfer === null) return
      deliverDrop(pane, event.dataTransfer)
    }
    document.addEventListener("dragenter", onDragEnter, true)
    document.addEventListener("dragover", onDragOver, true)
    document.addEventListener("dragleave", onDragLeave, true)
    document.addEventListener("drop", onDrop, true)
    window.addEventListener("dragend", clear, true)
    return () => {
      document.removeEventListener("dragenter", onDragEnter, true)
      document.removeEventListener("dragover", onDragOver, true)
      document.removeEventListener("dragleave", onDragLeave, true)
      document.removeEventListener("drop", onDrop, true)
      window.removeEventListener("dragend", clear, true)
    }
  }, [mode, ids.length])

  const room = Math.max(0, stripWidth - (paged ? 0 : (ids.length - 1) * GUTTER))

  // Four columns make one page; past that the strip pages instead of squeezing.
  const columns = useMemo(() => {
    if (ids.length === 0) return []
    if (paged) {
      const width = room === 0 ? AUTO_PANE_WIDTH : Math.max(MIN_PANE_WIDTH, Math.floor(room / PER_PAGE))
      return ids.map((id) => ({ id, width, actual: width }))
    }
    const pinned = ids.filter((id) => selection.widths[id] !== undefined)
    const free = ids.filter((id) => selection.widths[id] === undefined)
    const pinnedTotal = pinned.reduce((sum, id) => sum + selection.widths[id], 0)
    const automatic =
      room === 0 ? AUTO_PANE_WIDTH : Math.max(AUTO_PANE_WIDTH, Math.floor((room - pinnedTotal) / Math.max(1, free.length)))
    const base = ids.map((id) => ({ id, width: selection.widths[id] ?? automatic }))
    const total = base.reduce((sum, entry) => sum + entry.width, 0)
    if (total < room) base[base.length - 1].width += room - total
    return base.map((entry) => ({ ...entry, actual: entry.width }))
  }, [ids, selection.widths, room, paged])

  const rebalance = useCallback(() => {
    setFocusedId(null)
    setWidths({}, true)
  }, [])

  const toggleFocus = useCallback(
    (id) => {
      if (paged || ids.length < 2) return
      if (focusedId === id) {
        rebalance()
        return
      }
      setFocusedId(id)
      const focusedWidth = Math.max(MIN_PANE_WIDTH, room - (ids.length - 1) * MIN_PANE_WIDTH)
      const next = {}
      for (const entry of ids) next[entry] = entry === id ? focusedWidth : MIN_PANE_WIDTH
      setWidths(next, true)
    },
    [focusedId, ids, room, rebalance, paged],
  )

  const startResize = useCallback(
    (index) => (event) => {
      if (event.button !== 0) return
      event.preventDefault()
      const startX = event.clientX
      const start = columns.map((entry) => entry.actual)
      const pair = start[index] + start[index + 1]
      setResizing(true)
      setFocusedId(null)
      const move = (moveEvent) => {
        const delta = moveEvent.clientX - startX
        const left = Math.min(Math.max(start[index] + delta, MIN_PANE_WIDTH), pair - MIN_PANE_WIDTH)
        const next = {}
        columns.forEach((entry, position) => {
          next[entry.id] = Math.round(position === index ? left : position === index + 1 ? pair - left : start[position])
        })
        setWidths(next)
      }
      const finish = () => {
        setResizing(false)
        commitWidths()
        window.removeEventListener("pointermove", move)
        window.removeEventListener("pointerup", finish)
        window.removeEventListener("pointercancel", finish)
      }
      window.addEventListener("pointermove", move)
      window.addEventListener("pointerup", finish)
      window.addEventListener("pointercancel", finish)
    },
    [columns],
  )

  const showActive = useCallback(() => {
    const active = Object.values(rows ?? {})
      .filter((row) => row.blank !== true && activityOf(statuses?.get(row.id)) !== "idle")
      .sort(byRecency)
      .map((row) => row.id)
    setSessions(active)
    setOverflow(active.length > MAX_PANES)
  }, [rows, statuses])

  const exitSplit = useCallback(() => {
    setSessions([])
    layout?.selectPanel(null)
  }, [layout])

  const bar = (
    <div data-split-view-bar>
      <span data-split-view-title>分屏</span>
      <button type="button" data-bar-button data-primary onClick={showActive}>
        全部进行中
      </button>
      <button type="button" data-bar-button onClick={exitSplit}>
        取消分屏
      </button>
      {overflow ? <span data-split-view-hint>只取前 {MAX_PANES} 个</span> : null}
      <span data-split-view-spacer />
      <div data-mode-switch role="group" aria-label="显示密度">
        <button type="button" data-mode-option data-active={mode === "full" ? "" : undefined} onClick={() => setMode("full")}>
          完整
        </button>
        <button type="button" data-mode-option data-active={mode === "minimal" ? "" : undefined} onClick={() => setMode("minimal")}>
          极简
        </button>
      </div>
      <span data-split-view-count>
        {ids.length} / {MAX_PANES}
      </span>
    </div>
  )

  const empty = (
    <div data-split-view-empty>
      <span>在左侧会话列表里悬停一行，点分屏图标加入</span>
    </div>
  )

  if (mode === "minimal") {
    return (
      <div data-split-view-root data-mode="minimal" ref={rootRef}>
        {bar}
        {ids.length === 0 ? (
          empty
        ) : (
          <div data-split-view-mini-list>
            {ids.map((id) => (
              <SplitRow
                key={id}
                id={id}
                title={titleOf(rows?.[id])}
                step={currentStep(rows?.[id])}
                activity={activityOf(statuses?.get(id))}
                time={relativeTime(rows?.[id]?.updatedAt, now)}
                onClose={toggleSession}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div data-split-view-root data-mode="full" data-resizing={resizing ? "" : undefined} ref={rootRef}>
      {bar}
      {columns.length === 0 ? (
        empty
      ) : (
        <div data-split-view-strip data-paged={paged ? "" : undefined} ref={setStripEl}>
          {columns.map((pane, index) => (
            <Fragment key={pane.id}>
              {paged || index === 0 ? null : (
                <div
                  data-split-view-gutter
                  role="separator"
                  aria-orientation="vertical"
                  title="拖动调整宽度，双击恢复等宽"
                  onPointerDown={startResize(index - 1)}
                  onDoubleClick={rebalance}
                >
                  <span data-split-view-gutter-line />
                </div>
              )}
              <SplitPane
                id={pane.id}
                width={pane.actual}
                reference={references.current.get(pane.id)}
                title={titleOf(rows?.[pane.id])}
                activity={activityOf(statuses?.get(pane.id))}
                focused={focusedId === pane.id}
                dropActive={dropTarget === pane.id}
                canFocus={!paged}
                paged={paged}
                initiallyVisible={index < PER_PAGE}
                unavailable={unavailable.current.has(pane.id)}
                onClose={toggleSession}
                onToggleFocus={toggleFocus}
                renderSlot={renderSlot}
                SessionProvider={SessionProvider}
              />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
