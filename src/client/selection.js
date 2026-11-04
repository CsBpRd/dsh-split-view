import { useSyncExternalStore } from "react"

const STORAGE_KEY = "dsh-split-view:selection"
const LEGACY_ENTRIES = "dsh-split-view:panes"
const LEGACY_IDS = "dsh-split-view:paneIds"
export const MAX_PANES = 8

function readJson(key) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? null : JSON.parse(raw)
  } catch {
    return null
  }
}

function writeJson(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Persistence is best-effort; the live store stays authoritative.
  }
}

function clampWidth(value) {
  return Number.isFinite(value) ? Math.max(160, Math.round(value)) : undefined
}

function uniqueIds(values) {
  const seen = []
  for (const value of values) {
    if (typeof value !== "string" || value === "" || seen.includes(value)) continue
    seen.push(value)
    if (seen.length >= MAX_PANES) break
  }
  return seen
}

function load() {
  const stored = readJson(STORAGE_KEY)
  if (stored !== null && typeof stored === "object" && Array.isArray(stored.ids)) {
    const ids = uniqueIds(stored.ids)
    const widths = {}
    for (const id of ids) {
      const width = clampWidth(stored.widths?.[id])
      if (width !== undefined) widths[id] = width
    }
    return { ids, widths }
  }
  const legacyEntries = readJson(LEGACY_ENTRIES)
  if (Array.isArray(legacyEntries)) {
    const widths = {}
    for (const entry of legacyEntries) {
      if (entry === null || typeof entry !== "object") continue
      const width = clampWidth(entry.width)
      if (typeof entry.id === "string" && width !== undefined) widths[entry.id] = width
    }
    return { ids: uniqueIds(legacyEntries.map((entry) => entry?.id)), widths }
  }
  const legacyIds = readJson(LEGACY_IDS)
  if (Array.isArray(legacyIds)) return { ids: uniqueIds(legacyIds), widths: {} }
  return { ids: [], widths: {} }
}

let snapshot = load()
const listeners = new Set()

function publish(next, persist = true) {
  snapshot = next
  if (persist) writeJson(snapshot)
  for (const listener of [...listeners]) listener()
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getSnapshot() {
  return snapshot
}

export function useSelection() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

/** Toggle one Session in the split layout; the sidebar row action calls this. */
export function toggleSession(id) {
  const ids = snapshot.ids
  if (ids.includes(id)) {
    const widths = { ...snapshot.widths }
    delete widths[id]
    publish({ ids: ids.filter((entry) => entry !== id), widths })
    return
  }
  if (ids.length >= MAX_PANES) return
  // Any membership change returns the layout to equal columns.
  publish({ ids: [...ids, id], widths: {} })
}

/** Replace the whole selection, used by the one-click running-task action. */
export function setSessions(ids) {
  publish({ ids: uniqueIds(ids), widths: {} })
}

/** Update column widths without persisting during a drag. */
export function setWidths(widths, persist = false) {
  publish({ ids: snapshot.ids, widths: { ...widths } }, persist)
}

/** Persist the current widths once a drag settles. */
export function commitWidths() {
  writeJson(snapshot)
}
