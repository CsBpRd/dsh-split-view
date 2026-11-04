import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const code = readFileSync(path.join(root, "lib/client.js"), "utf8")

// The selection store reads storage while the module body materializes, so the
// browser stubs must exist before the factory runs.
const memory = new Map([
  ["dsh-split-view:selection", JSON.stringify({ ids: ["s1"], widths: {} })],
])
const storage = {
  getItem: (key) => (memory.has(key) ? memory.get(key) : null),
  setItem: (key, value) => memory.set(key, String(value)),
  removeItem: (key) => memory.delete(key),
}

const loaded = []
globalThis.window = { __ModuleLoader__: { load: (module) => loaded.push(module) }, localStorage: storage }
globalThis.localStorage = storage
new Function(code)()

assert.equal(loaded.length, 1, "bundle must register exactly one module")
const [record] = loaded
assert.equal(record.id, "dsh-split-view")

const jsxRuntime = await import("react/jsx-runtime")
const requireStub = (specifier) => {
  if (specifier === "react") return React
  if (specifier === "react/jsx-runtime") return jsxRuntime
  throw new Error(`unexpected module request: ${specifier}`)
}

const api = record.factory(requireStub)
assert.ok(Array.isArray(api.inject), "client export must list inject services")
assert.equal(typeof api.apply, "function")

const released = []
const sessions = {
  retain: (id) => ({ sessionId: id, release: () => released.push(id) }),
}
const registrations = []
const ctx = {
  sessions,
  effect: (fn) => {
    const dispose = fn()
    return () => {
      if (typeof dispose === "function") dispose()
    }
  },
  get: (name) => (name === "layout" ? { selectPanel() {} } : undefined),
  slots: {
    inject: (_name, callback) => callback(),
    register: (spec, component) => {
      registrations.push({ spec, component })
      return () => {}
    },
  },
}
api.apply(ctx)

assert.deepEqual(
  registrations.map((row) => row.spec.name),
  ["sidebar.panellist", "sidebar.workspaces.session.row.action", "main", "dsh-split-view.pane"],
)

const main = registrations.find((row) => row.spec.name === "main")
assert.equal(main.spec.key, "dsh-split-view")
assert.deepEqual(main.spec.children, { "dsh-split-view.pane": { kind: "single", scope: "session" } })
assert.deepEqual(main.spec.inject().sessions, sessions)

const rows = {
  s1: { id: "s1", title: "任务一", blank: false, running: true, updatedAt: Date.now() },
  s2: { id: "s2", title: "任务二", blank: false, running: false, updatedAt: Date.now() },
}
const baseProps = {
  useSessions: (selector) => selector({ byId: rows }),
  useSessionStatus: (selector) => selector(new Map([["s1", { running: {} }]])),
  sessions,
  renderSlot: (key) => React.createElement("div", { "data-stub-slot": key }),
  SessionProvider: ({ children }) => React.createElement("div", { "data-stub-provider": "" }, children),
}

const fullHtml = renderToStaticMarkup(React.createElement(main.component, baseProps))
assert.match(fullHtml, /任务一/)
assert.match(fullHtml, /进行中/)
// References are acquired in an effect, so a server render shows the pane shell.
assert.match(fullHtml, /data-split-pane-idle/)
assert.match(fullHtml, /data-split-view-strip/)
assert.doesNotMatch(fullHtml, /data-split-view-mini-list/)

memory.set("dsh-split-view:mode", "minimal")
const minimalHtml = renderToStaticMarkup(React.createElement(main.component, baseProps))
assert.match(minimalHtml, /data-split-view-mini-list/)
assert.match(minimalHtml, /任务一/)
assert.doesNotMatch(minimalHtml, /data-stub-provider/, "minimal mode must not mount conversations")

const toggle = registrations.find((row) => row.spec.name === "sidebar.workspaces.session.row.action").component
const selectedHtml = renderToStaticMarkup(React.createElement(toggle, { sessionId: "s1", displayTitle: "任务一" }))
assert.match(selectedHtml, /data-split-toggle/)
assert.match(selectedHtml, /aria-pressed="true"/)
const unselectedHtml = renderToStaticMarkup(React.createElement(toggle, { sessionId: "s2", displayTitle: "任务二" }))
assert.match(unselectedHtml, /aria-pressed="false"/)

const pane = registrations.find((row) => row.spec.name === "dsh-split-view.pane").component
let captured = null
renderToStaticMarkup(
  React.createElement(pane, {
    sessionId: "s1",
    useSession: (selector) =>
      selector({ blank: false, awaitingFirstTurn: false, running: true, promptAttempted: true, openState: "open" }),
    useConversation: (selector) => selector({ activeTargets: new Set() }),
    useSessions: (selector) => selector({ byId: { s1: { blank: false } } }),
    renderFactorySlot: (name, input, options) => {
      captured = { name, input, options }
      return React.createElement("div", { "data-stub-factory": name })
    },
    renderSlot: () => null,
  }),
)

assert.equal(captured.name, "conversation.content")
assert.equal(captured.input.variant, "embedded")
assert.equal(captured.input.phase, "active")
const viewHtml = renderToStaticMarkup(
  React.createElement(captured.options.slots.views, {
    renderSlot: (key) => React.createElement("div", { "data-stub-slot": key }),
  }),
)
assert.match(viewHtml, /conversation\.session/)

console.log(`smoke ok (${fullHtml.length} full chars)`)
