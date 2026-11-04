import { toggleSession, useSelection } from "./selection.js"

function SplitGlyph({ selected }) {
  const fill = selected ? "currentColor" : "none"
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.1" y="3.1" width="4.8" height="9.8" rx="1.1" stroke="currentColor" strokeWidth="1.2" fill={fill} />
      <rect x="9.1" y="3.1" width="4.8" height="9.8" rx="1.1" stroke="currentColor" strokeWidth="1.2" fill={fill} />
    </svg>
  )
}

/**
 * Per-Session toggle in the native sidebar row actions: the split layout is
 * chosen where Sessions are listed, not in a separate dialog.
 */
export default function SplitRowToggle({ sessionId, displayTitle }) {
  const selection = useSelection()
  const selected = selection.ids.includes(sessionId)
  const name = typeof displayTitle === "string" && displayTitle.trim() !== "" ? displayTitle.trim() : "该会话"
  const label = selected ? `将「${name}」移出分屏` : `将「${name}」加入分屏`
  return (
    <button
      type="button"
      data-split-toggle=""
      data-selected={selected ? "" : undefined}
      aria-pressed={selected}
      title={selected ? "移出分屏" : "加入分屏"}
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation()
        toggleSession(sessionId)
      }}
    >
      <SplitGlyph selected={selected} />
    </button>
  )
}
