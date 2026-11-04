import styles from "./panel.css"
import SplitViewIcon from "./icon.jsx"
import SplitViewPanel from "./panel.jsx"
import SplitRowToggle from "./row-toggle.jsx"
import PaneConversation from "./pane.jsx"
import { PANEL_ID, installStyles } from "./runtime.js"

export const inject = ["slots", "sessions", "layout"]

export function apply(ctx) {
  ctx.effect(() => installStyles(styles))

  ctx.slots.inject("sidebar.panellist", () =>
    ctx.slots.register({ name: "sidebar.panellist", id: PANEL_ID, order: 10, label: "分屏" }, SplitViewIcon),
  )

  // The split layout is chosen in the native Session list: every row gains a
  // split toggle in its hover actions.
  ctx.slots.inject("sidebar.workspaces.session.row.action", () =>
    ctx.slots.register({ name: "sidebar.workspaces.session.row.action", id: PANEL_ID, order: 50 }, SplitRowToggle),
  )

  ctx.slots.inject("main", () =>
    ctx.slots.register(
      {
        name: "main",
        key: PANEL_ID,
        children: { "dsh-split-panel.pane": { kind: "single", scope: "session" } },
        inject: () => ({ sessions: ctx.sessions, layout: ctx.get("layout") }),
      },
      SplitViewPanel,
    ),
  )

  ctx.slots.inject("dsh-split-panel.pane", () => ctx.slots.register({ name: "dsh-split-panel.pane" }, PaneConversation))
}
