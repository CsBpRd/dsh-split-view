window.__ModuleLoader__.load({
	id: "dsh-split-panel",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __export = (target, all) => {
		  for (var name in all)
		    __defProp(target, name, { get: all[name], enumerable: true });
		};
		var __copyProps = (to, from, except, desc) => {
		  if (from && typeof from === "object" || typeof from === "function") {
		    for (let key of __getOwnPropNames(from))
		      if (!__hasOwnProp.call(to, key) && key !== except)
		        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
		  }
		  return to;
		};
		var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

		// src/client/index.jsx
		var index_exports = {};
		__export(index_exports, {
		  apply: () => apply,
		  inject: () => inject
		});
		module.exports = __toCommonJS(index_exports);

		// src/client/panel.css
		var panel_default = '[data-split-view-root] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  min-height: 0;\n  box-sizing: border-box;\n  color: var(--dsw-alias-label-primary);\n  overflow: hidden;\n}\n\n[data-split-view-root][data-resizing] {\n  cursor: col-resize;\n  user-select: none;\n}\n\n/* \u2500\u2500 top bar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n[data-split-view-bar] {\n  flex: none;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 46px;\n  padding-right: 14px;\n  padding-left: calc(14px + var(--dsh-frame-leading-clearance, 0px));\n  border-bottom: 0.5px solid var(--dsw-alias-border-l1);\n}\n\n[data-split-view-title] {\n  margin-right: 2px;\n  font-size: 12.5px;\n  font-weight: 500;\n  line-height: 20px;\n  letter-spacing: 0.02em;\n  white-space: nowrap;\n}\n\n[data-bar-button] {\n  height: 26px;\n  padding: 0 10px;\n  border: 0.5px solid var(--dsw-alias-border-l2);\n  border-radius: 7px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary);\n  font: inherit;\n  font-size: 12px;\n  line-height: 24px;\n  white-space: nowrap;\n  cursor: pointer;\n  transition:\n    background 0.16s ease,\n    color 0.16s ease,\n    border-color 0.16s ease;\n}\n\n[data-bar-button]:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n\n[data-bar-button][data-primary] {\n  border-color: transparent;\n  background: var(--dsw-alias-bg-layer-2);\n  color: var(--dsw-alias-label-primary);\n}\n\n[data-bar-button][data-primary]:hover {\n  background: var(--dsw-alias-bg-layer-3);\n}\n\n[data-bar-button]:focus-visible,\n[data-mode-option]:focus-visible,\n[data-pane-action]:focus-visible,\n[data-row-close]:focus-visible,\n[data-split-toggle]:focus-visible {\n  outline: 1.5px solid var(--dsw-alias-label-tertiary);\n  outline-offset: 1px;\n}\n\n[data-split-view-hint] {\n  font-size: 11.5px;\n  color: var(--dsw-alias-state-warn-label);\n  white-space: nowrap;\n}\n\n[data-split-view-spacer] {\n  flex: 1;\n  min-width: 8px;\n}\n\n[data-mode-switch] {\n  display: flex;\n  gap: 2px;\n  padding: 2px;\n  border: 0.5px solid var(--dsw-alias-border-l2);\n  border-radius: 8px;\n}\n\n[data-mode-option] {\n  height: 22px;\n  padding: 0 9px;\n  border: 0;\n  border-radius: 6px;\n  background: transparent;\n  color: var(--dsw-alias-label-tertiary);\n  font: inherit;\n  font-size: 11.5px;\n  line-height: 22px;\n  cursor: pointer;\n  transition:\n    background 0.16s ease,\n    color 0.16s ease;\n}\n\n[data-mode-option]:hover {\n  color: var(--dsw-alias-label-primary);\n}\n\n[data-mode-option][data-active] {\n  background: var(--dsw-alias-bg-layer-2);\n  color: var(--dsw-alias-label-primary);\n}\n\n[data-split-view-count] {\n  min-width: 34px;\n  text-align: right;\n  font-size: 11.5px;\n  color: var(--dsw-alias-label-tertiary);\n  white-space: nowrap;\n  font-variant-numeric: tabular-nums;\n}\n\n/* \u2500\u2500 empty state \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n[data-split-view-empty] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  padding: 0 24px;\n  font-size: 12.5px;\n  line-height: 20px;\n  color: var(--dsw-alias-label-tertiary);\n  text-align: center;\n  animation: dsv-fade 0.22s ease-out both;\n}\n\n[data-split-view-empty]::before {\n  content: "";\n  width: 26px;\n  height: 18px;\n  border: 1px solid currentColor;\n  border-radius: 4px;\n  opacity: 0.35;\n  background: linear-gradient(to right, transparent 48%, currentColor 48%, currentColor 52%, transparent 52%);\n}\n\n/* \u2500\u2500 column strip \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n[data-split-view-strip] {\n  display: flex;\n  align-items: stretch;\n  flex: 1;\n  min-height: 0;\n  overflow-x: auto;\n  overflow-y: hidden;\n  overscroll-behavior-x: contain;\n  scrollbar-width: thin;\n  animation: dsv-fade 0.18s ease-out both;\n}\n\n[data-split-view-strip]::-webkit-scrollbar {\n  height: 8px;\n}\n\n[data-split-view-strip]::-webkit-scrollbar-thumb {\n  border-radius: 4px;\n  background: var(--dsw-alias-scrollbar-bg-l2);\n}\n\n[data-split-view-strip]::-webkit-scrollbar-thumb:hover {\n  background: var(--dsw-alias-scrollbar-hover-l2);\n}\n\n[data-split-view-gutter] {\n  flex: 0 0 9px;\n  position: relative;\n  cursor: col-resize;\n  touch-action: none;\n}\n\n[data-split-view-gutter-line] {\n  position: absolute;\n  top: 6px;\n  bottom: 6px;\n  left: 4px;\n  width: 1px;\n  border-radius: 1px;\n  background: var(--dsw-alias-border-l1);\n  transition:\n    background 0.16s ease,\n    width 0.16s ease,\n    left 0.16s ease;\n}\n\n[data-split-view-gutter]:hover [data-split-view-gutter-line] {\n  left: 3px;\n  width: 3px;\n  background: var(--dsw-alias-label-tertiary);\n}\n\n[data-split-view-root][data-resizing] [data-split-view-gutter-line] {\n  left: 3px;\n  width: 3px;\n  background: var(--dsw-alias-label-secondary);\n}\n\n/* \u2500\u2500 one pane \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n[data-split-pane] {\n  position: relative;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  flex: 0 0 auto;\n  min-width: 0;\n  min-height: 0;\n  height: 100%;\n  animation: dsv-pane-in 0.24s cubic-bezier(0.2, 0.7, 0.3, 1) both;\n  transition: width 0.24s cubic-bezier(0.2, 0.7, 0.3, 1);\n}\n\n[data-split-view-root][data-resizing] [data-split-pane] {\n  transition: none;\n  animation: none;\n}\n\n[data-split-pane-head] {\n  flex: none;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  height: 32px;\n  padding: 0 4px 0 10px;\n}\n\n[data-split-pane-title] {\n  flex: 1;\n  min-width: 0;\n  font-size: 12.5px;\n  font-weight: 400;\n  line-height: 18px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n[data-split-pane][data-focused] [data-split-pane-title] {\n  font-weight: 500;\n}\n\n[data-split-pane-status] {\n  flex: none;\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary);\n  white-space: nowrap;\n}\n\n[data-split-pane-dot] {\n  flex: none;\n  display: inline-block;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--dsw-alias-state-idle-primary);\n  transition: background 0.2s ease;\n}\n\n[data-split-pane-dot="running"] {\n  background: var(--dsw-alias-state-success-primary);\n  animation: dsv-pulse 1.9s ease-in-out infinite;\n}\n\n[data-split-pane-dot="waiting"] {\n  background: var(--dsw-alias-state-warn-primary);\n}\n\n[data-pane-action] {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 22px;\n  height: 22px;\n  padding: 0;\n  border: 0;\n  border-radius: 6px;\n  background: transparent;\n  color: var(--dsw-alias-label-tertiary);\n  cursor: pointer;\n  opacity: 0;\n  transition:\n    opacity 0.14s ease,\n    background 0.14s ease,\n    color 0.14s ease;\n}\n\n[data-split-pane]:hover [data-pane-action],\n[data-pane-action]:focus-visible {\n  opacity: 1;\n}\n\n[data-pane-action]:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n\n[data-split-pane-body] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n\n[data-split-pane-body] > * {\n  min-height: 0;\n}\n\n[data-split-pane][data-drop-active]::after {\n  content: "";\n  position: absolute;\n  inset: 4px;\n  border: 1px dashed var(--dsw-alias-state-success-primary);\n  border-radius: 10px;\n  pointer-events: none;\n  z-index: 5;\n  animation: dsv-fade 0.12s ease-out both;\n}\n\n[data-split-view-strip][data-paged] {\n  scroll-snap-type: x mandatory;\n}\n\n[data-split-view-strip][data-paged] [data-split-pane] {\n  scroll-snap-align: start;\n  border-left: 0.5px solid var(--dsw-alias-border-l1);\n}\n\n[data-split-view-strip][data-paged] [data-split-pane]:first-child {\n  border-left: 0;\n}\n\n[data-split-pane-idle] {\n  flex: 1;\n}\n\n[data-split-pane-fallback] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n/* \u2500\u2500 minimal mode: one compact status line per task \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n[data-split-view-mini-list] {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 6px 10px 12px;\n  scrollbar-width: thin;\n}\n\n[data-split-view-mini-list]::-webkit-scrollbar {\n  width: 8px;\n}\n\n[data-split-view-mini-list]::-webkit-scrollbar-thumb {\n  border-radius: 4px;\n  background: var(--dsw-alias-scrollbar-bg-l2);\n}\n\n[data-split-row] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  height: 36px;\n  padding: 0 6px 0 10px;\n  border-radius: 8px;\n  animation: dsv-row-in 0.18s ease-out both;\n  transition: background 0.14s ease;\n}\n\n[data-split-row]:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n[data-split-row-title] {\n  flex: 0 1 auto;\n  max-width: 38%;\n  min-width: 0;\n  font-size: 12.5px;\n  line-height: 18px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n[data-split-row-detail] {\n  flex: 1;\n  min-width: 0;\n  font-size: 11.5px;\n  line-height: 18px;\n  color: var(--dsw-alias-label-tertiary);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n[data-split-row][data-activity="running"] [data-split-row-detail] {\n  color: var(--dsw-alias-label-secondary);\n}\n\n[data-split-row][data-activity="waiting"] [data-split-row-detail] {\n  color: var(--dsw-alias-state-warn-label);\n}\n\n[data-split-row-time] {\n  flex: none;\n  min-width: 58px;\n  text-align: right;\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary);\n  white-space: nowrap;\n  font-variant-numeric: tabular-nums;\n}\n\n[data-row-close] {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  border: 0;\n  border-radius: 5px;\n  background: transparent;\n  color: var(--dsw-alias-label-tertiary);\n  cursor: pointer;\n  opacity: 0;\n  transition:\n    opacity 0.14s ease,\n    background 0.14s ease,\n    color 0.14s ease;\n}\n\n[data-split-row]:hover [data-row-close],\n[data-row-close]:focus-visible {\n  opacity: 1;\n}\n\n[data-row-close]:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n\n/* \u2500\u2500 sidebar session-row toggle \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n[data-split-toggle] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 18px;\n  height: 18px;\n  padding: 0;\n  border: 0;\n  border-radius: 5px;\n  background: transparent;\n  color: var(--dsw-alias-label-tertiary);\n  cursor: pointer;\n  transition:\n    background 0.14s ease,\n    color 0.14s ease;\n}\n\n[data-split-toggle]:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n\n[data-split-toggle][data-selected] {\n  color: var(--dsw-alias-label-primary);\n}\n\n/* \u2500\u2500 motion \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n@keyframes dsv-pane-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n@keyframes dsv-row-in {\n  from {\n    opacity: 0;\n    transform: translateY(3px);\n  }\n}\n\n@keyframes dsv-fade {\n  from {\n    opacity: 0;\n  }\n}\n\n@keyframes dsv-pulse {\n  0%,\n  100% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-state-success-primary) 55%, transparent);\n  }\n  50% {\n    box-shadow: 0 0 0 4px color-mix(in srgb, var(--dsw-alias-state-success-primary) 0%, transparent);\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  [data-split-pane],\n  [data-split-row],\n  [data-split-view-strip],\n  [data-split-view-empty],\n  [data-split-pane-dot="running"] {\n    animation: none;\n    transition: none;\n  }\n}\n';

		// src/client/icon.jsx
		var import_jsx_runtime = require("react/jsx-runtime");
		function SplitViewIcon({ size = 16 }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "2.1", y: "3.1", width: "4.8", height: "9.8", rx: "1.1", stroke: "currentColor", strokeWidth: "1.2" }),
		    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "9.1", y: "3.1", width: "4.8", height: "9.8", rx: "1.1", stroke: "currentColor", strokeWidth: "1.2" })
		  ] });
		}

		// src/client/panel.jsx
		var import_react2 = require("react");

		// src/client/selection.js
		var import_react = require("react");
		var STORAGE_KEY = "dsh-split-view:selection";
		var LEGACY_ENTRIES = "dsh-split-view:panes";
		var LEGACY_IDS = "dsh-split-view:paneIds";
		var MAX_PANES = 8;
		function readJson(key) {
		  try {
		    const raw = window.localStorage.getItem(key);
		    return raw === null ? null : JSON.parse(raw);
		  } catch {
		    return null;
		  }
		}
		function writeJson(value) {
		  try {
		    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
		  } catch {
		  }
		}
		function clampWidth(value) {
		  return Number.isFinite(value) ? Math.max(160, Math.round(value)) : void 0;
		}
		function uniqueIds(values) {
		  const seen = [];
		  for (const value of values) {
		    if (typeof value !== "string" || value === "" || seen.includes(value)) continue;
		    seen.push(value);
		    if (seen.length >= MAX_PANES) break;
		  }
		  return seen;
		}
		function load() {
		  const stored = readJson(STORAGE_KEY);
		  if (stored !== null && typeof stored === "object" && Array.isArray(stored.ids)) {
		    const ids = uniqueIds(stored.ids);
		    const widths = {};
		    for (const id of ids) {
		      const width = clampWidth(stored.widths?.[id]);
		      if (width !== void 0) widths[id] = width;
		    }
		    return { ids, widths };
		  }
		  const legacyEntries = readJson(LEGACY_ENTRIES);
		  if (Array.isArray(legacyEntries)) {
		    const widths = {};
		    for (const entry of legacyEntries) {
		      if (entry === null || typeof entry !== "object") continue;
		      const width = clampWidth(entry.width);
		      if (typeof entry.id === "string" && width !== void 0) widths[entry.id] = width;
		    }
		    return { ids: uniqueIds(legacyEntries.map((entry) => entry?.id)), widths };
		  }
		  const legacyIds = readJson(LEGACY_IDS);
		  if (Array.isArray(legacyIds)) return { ids: uniqueIds(legacyIds), widths: {} };
		  return { ids: [], widths: {} };
		}
		var snapshot = load();
		var listeners = /* @__PURE__ */ new Set();
		function publish(next, persist = true) {
		  snapshot = next;
		  if (persist) writeJson(snapshot);
		  for (const listener of [...listeners]) listener();
		}
		function subscribe(listener) {
		  listeners.add(listener);
		  return () => {
		    listeners.delete(listener);
		  };
		}
		function getSnapshot() {
		  return snapshot;
		}
		function useSelection() {
		  return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
		}
		function toggleSession(id) {
		  const ids = snapshot.ids;
		  if (ids.includes(id)) {
		    const widths = { ...snapshot.widths };
		    delete widths[id];
		    publish({ ids: ids.filter((entry) => entry !== id), widths });
		    return;
		  }
		  if (ids.length >= MAX_PANES) return;
		  publish({ ids: [...ids, id], widths: {} });
		}
		function setSessions(ids) {
		  publish({ ids: uniqueIds(ids), widths: {} });
		}
		function setWidths(widths, persist = false) {
		  publish({ ids: snapshot.ids, widths: { ...widths } }, persist);
		}
		function commitWidths() {
		  writeJson(snapshot);
		}

		// src/client/panel.jsx
		var import_jsx_runtime2 = require("react/jsx-runtime");
		var PER_PAGE = 4;
		var AUTO_PANE_WIDTH = 200;
		var MIN_PANE_WIDTH = 160;
		var GUTTER = 9;
		var STORAGE_MODE = "dsh-split-view:mode";
		var PENDING_KINDS = /* @__PURE__ */ new Set(["approval", "plan-review", "question"]);
		var PANE_SLOT_PROPS = Object.freeze({});
		function readMode() {
		  try {
		    return window.localStorage.getItem(STORAGE_MODE) === "minimal" ? "minimal" : "full";
		  } catch {
		    return "full";
		  }
		}
		function writeMode(mode) {
		  try {
		    window.localStorage.setItem(STORAGE_MODE, mode);
		  } catch {
		  }
		}
		function titleOf(row) {
		  const title = typeof row?.title === "string" ? row.title.trim() : "";
		  return title !== "" ? title : "\u672A\u547D\u540D\u4F1A\u8BDD";
		}
		function activityOf(status) {
		  if (status?.running) return "running";
		  if (PENDING_KINDS.has(status?.pendingInteraction?.kind)) return "waiting";
		  return "idle";
		}
		function statusLabel(kind) {
		  if (kind === "running") return "\u8FDB\u884C\u4E2D";
		  if (kind === "waiting") return "\u7B49\u4F60\u56DE\u590D";
		  return "\u7A7A\u95F2";
		}
		function relativeTime(updatedAt, now) {
		  if (typeof updatedAt !== "number" || updatedAt <= 0) return "";
		  const delta = now - updatedAt;
		  if (delta < 6e4) return "\u521A\u521A";
		  const minutes = Math.floor(delta / 6e4);
		  if (minutes < 60) return `${minutes} \u5206\u949F\u524D`;
		  const hours = Math.floor(minutes / 60);
		  if (hours < 24) return `${hours} \u5C0F\u65F6\u524D`;
		  return `${Math.floor(hours / 24)} \u5929\u524D`;
		}
		function byRecency(left, right) {
		  return (right.updatedAt ?? 0) - (left.updatedAt ?? 0);
		}
		function currentStep(row) {
		  const todos = row?.projectionValues?.todos;
		  if (!Array.isArray(todos)) return "";
		  const running = todos.find((item) => item?.status === "in_progress");
		  return typeof running?.content === "string" ? running.content.trim() : "";
		}
		function CloseIcon() {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M2.6 2.6 9.4 9.4M9.4 2.6 2.6 9.4", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round" }) });
		}
		function GrowIcon() {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		    "path",
		    {
		      d: "M4.4 2.2H2.2v2.2M7.6 9.8h2.2V7.6M2.2 2.2l3 3M9.8 9.8l-3-3",
		      stroke: "currentColor",
		      strokeWidth: "1.2",
		      strokeLinecap: "round",
		      strokeLinejoin: "round"
		    }
		  ) });
		}
		function ShrinkIcon() {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		    "path",
		    {
		      d: "M5.2 2.2v3h-3M6.8 9.8v-3h3M2.2 5.2l3 3M9.8 6.8l-3-3",
		      stroke: "currentColor",
		      strokeWidth: "1.2",
		      strokeLinecap: "round",
		      strokeLinejoin: "round"
		    }
		  ) });
		}
		var PaneBoundary = class extends import_react2.Component {
		  state = { failed: false };
		  static getDerivedStateFromError() {
		    return { failed: true };
		  }
		  componentDidCatch(error) {
		    console.warn("[dsh-split-panel] pane failed to render:", error);
		  }
		  render() {
		    return this.state.failed ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-split-pane-fallback": true, children: "\u4F1A\u8BDD\u4E0D\u53EF\u7528" }) : this.props.children;
		  }
		};
		function deliverDrop(pane, dataTransfer) {
		  const editor = pane.querySelector('[contenteditable="true"]');
		  if (editor === null) return;
		  let event;
		  try {
		    event = new ClipboardEvent("paste", { clipboardData: dataTransfer, bubbles: true, cancelable: true });
		  } catch {
		    return;
		  }
		  if (event.clipboardData === null || event.clipboardData === void 0) {
		    try {
		      Object.defineProperty(event, "clipboardData", { value: dataTransfer });
		    } catch {
		      return;
		    }
		  }
		  editor.dispatchEvent(event);
		}
		function canScrollInside(target, delta, boundary) {
		  let element = target instanceof Element ? target : null;
		  while (element !== null && element !== boundary) {
		    const style = window.getComputedStyle(element);
		    if ((style.overflowY === "auto" || style.overflowY === "scroll") && element.scrollHeight > element.clientHeight + 1) {
		      const canMove = delta < 0 ? element.scrollTop > 0 : element.scrollTop + element.clientHeight < element.scrollHeight - 1;
		      if (canMove) return true;
		    }
		    element = element.parentElement;
		  }
		  return false;
		}
		var SplitPane = (0, import_react2.memo)(function SplitPane2({
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
		  SessionProvider
		}) {
		  const sectionRef = (0, import_react2.useRef)(null);
		  const [visible, setVisible] = (0, import_react2.useState)(!paged || initiallyVisible);
		  (0, import_react2.useEffect)(() => {
		    if (!paged) {
		      setVisible(true);
		      return;
		    }
		    const section = sectionRef.current;
		    if (section === null || typeof IntersectionObserver === "undefined") {
		      setVisible(true);
		      return;
		    }
		    const root = section.closest("[data-split-view-strip]");
		    const observer = new IntersectionObserver(
		      (entries) => {
		        for (const entry of entries) setVisible(entry.isIntersecting);
		      },
		      { root, rootMargin: "0px" }
		    );
		    observer.observe(section);
		    return () => observer.disconnect();
		  }, [paged]);
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
		    "section",
		    {
		      ref: sectionRef,
		      "data-split-pane": id,
		      "data-focused": focused ? "" : void 0,
		      "data-drop-active": dropActive ? "" : void 0,
		      style: { width: `${width}px` },
		      children: [
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { "data-split-pane-head": true, onDoubleClick: canFocus ? () => onToggleFocus(id) : void 0, children: [
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "data-split-pane-dot": activity }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "data-split-pane-title": true, title, children: title }),
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "data-split-pane-status": true, children: statusLabel(activity) }),
		          canFocus ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		            "button",
		            {
		              type: "button",
		              "data-pane-action": true,
		              title: focused ? "\u8FD8\u539F\u5206\u5C4F" : "\u5C55\u5F00\u8FD9\u4E00\u5C4F",
		              "aria-label": focused ? "\u8FD8\u539F\u5206\u5C4F" : "\u5C55\u5F00\u8FD9\u4E00\u5C4F",
		              onClick: (event) => {
		                event.stopPropagation();
		                onToggleFocus(id);
		              },
		              children: focused ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ShrinkIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GrowIcon, {})
		            }
		          ) : null,
		          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		            "button",
		            {
		              type: "button",
		              "data-pane-action": true,
		              title: "\u5173\u95ED\u8BE5\u5C4F",
		              "aria-label": "\u5173\u95ED\u8BE5\u5C4F",
		              onClick: (event) => {
		                event.stopPropagation();
		                onClose(id);
		              },
		              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CloseIcon, {})
		            }
		          )
		        ] }),
		        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-split-pane-body": true, children: reference === void 0 ? unavailable ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-split-pane-fallback": true, children: "\u4F1A\u8BDD\u4E0D\u53EF\u7528" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-split-pane-idle": true }) : visible ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PaneBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SessionProvider, { session: reference, children: renderSlot("dsh-split-panel.pane", PANE_SLOT_PROPS) }) }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-split-pane-idle": true }) })
		      ]
		    }
		  );
		});
		function SplitRow({ id, title, step, activity, time, onClose }) {
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { "data-split-row": id, "data-activity": activity, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "data-split-pane-dot": activity }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "data-split-row-title": true, title, children: title }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "data-split-row-detail": true, title: step !== "" ? step : statusLabel(activity), children: step !== "" ? step : statusLabel(activity) }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "data-split-row-time": true, children: time }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", "data-row-close": true, title: "\u5173\u95ED\u8BE5\u5C4F", "aria-label": "\u5173\u95ED\u8BE5\u5C4F", onClick: () => onClose(id), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CloseIcon, {}) })
		  ] });
		}
		function SplitViewPanel(props) {
		  const { useSessions, useSessionStatus, sessions, layout, renderSlot, SessionProvider } = props;
		  const rows = useSessions((state) => state.byId);
		  const statuses = useSessionStatus((state) => state);
		  const selection = useSelection();
		  const [mode, setMode] = (0, import_react2.useState)(readMode);
		  const [stripWidth, setStripWidth] = (0, import_react2.useState)(0);
		  const [focusedId, setFocusedId] = (0, import_react2.useState)(null);
		  const [resizing, setResizing] = (0, import_react2.useState)(false);
		  const [dropTarget, setDropTarget] = (0, import_react2.useState)(null);
		  const [now, setNow] = (0, import_react2.useState)(() => Date.now());
		  const [overflow, setOverflow] = (0, import_react2.useState)(false);
		  const [stripEl, setStripEl] = (0, import_react2.useState)(null);
		  const [, setReferenceEpoch] = (0, import_react2.useState)(0);
		  const rootRef = (0, import_react2.useRef)(null);
		  const unavailable = (0, import_react2.useRef)(/* @__PURE__ */ new Set());
		  const references = (0, import_react2.useRef)(/* @__PURE__ */ new Map());
		  const dragDepth = (0, import_react2.useRef)(0);
		  const ids = selection.ids;
		  const paged = ids.length > PER_PAGE;
		  (0, import_react2.useEffect)(() => {
		    writeMode(mode);
		  }, [mode]);
		  (0, import_react2.useEffect)(() => {
		    const root = rootRef.current;
		    if (root === null) return;
		    const publish2 = () => setStripWidth(root.clientWidth);
		    publish2();
		    if (typeof ResizeObserver === "undefined") return;
		    const observer = new ResizeObserver(publish2);
		    observer.observe(root);
		    return () => observer.disconnect();
		  }, []);
		  (0, import_react2.useEffect)(() => {
		    const held = references.current;
		    let changed = false;
		    if (mode === "full" && sessions !== void 0) {
		      for (const id of ids) {
		        if (held.has(id) || unavailable.current.has(id)) continue;
		        try {
		          held.set(id, sessions.retain(id, { source: "splitView" }));
		          Promise.resolve(sessions.refreshProjections?.(id)).catch(() => {
		          });
		          changed = true;
		        } catch {
		          unavailable.current.add(id);
		          changed = true;
		        }
		      }
		    }
		    for (const [id, reference] of [...held]) {
		      if (mode === "full" && ids.includes(id)) continue;
		      try {
		        reference.release();
		      } catch {
		      }
		      held.delete(id);
		      changed = true;
		    }
		    if (changed) setReferenceEpoch((value) => value + 1);
		  }, [ids, sessions, mode]);
		  (0, import_react2.useEffect)(() => {
		    if (sessions?.refresh === void 0) return;
		    const timer = window.setTimeout(() => {
		      Promise.resolve(sessions.refresh()).catch(() => {
		      });
		    }, 800);
		    return () => window.clearTimeout(timer);
		  }, [sessions]);
		  (0, import_react2.useEffect)(() => {
		    const held = references.current;
		    return () => {
		      for (const reference of held.values()) {
		        try {
		          reference.release();
		        } catch {
		        }
		      }
		      held.clear();
		    };
		  }, []);
		  (0, import_react2.useEffect)(() => {
		    if (mode !== "minimal") return;
		    setNow(Date.now());
		    const timer = window.setInterval(() => setNow(Date.now()), 3e4);
		    return () => window.clearInterval(timer);
		  }, [mode]);
		  (0, import_react2.useEffect)(() => {
		    if (stripEl === null) return;
		    let lockedUntil = 0;
		    const onWheel = (event) => {
		      if (event.deltaY === 0 || event.shiftKey) return;
		      if (stripEl.scrollWidth <= stripEl.clientWidth + 1) return;
		      if (canScrollInside(event.target, event.deltaY, stripEl)) return;
		      event.preventDefault();
		      const now2 = performance.now();
		      if (now2 < lockedUntil || Math.abs(event.deltaY) < 4) return;
		      lockedUntil = now2 + 380;
		      const page = stripEl.clientWidth;
		      stripEl.scrollBy({ left: event.deltaY > 0 ? page : -page, behavior: "smooth" });
		    };
		    stripEl.addEventListener("wheel", onWheel, { passive: false });
		    return () => stripEl.removeEventListener("wheel", onWheel);
		  }, [stripEl]);
		  (0, import_react2.useEffect)(() => {
		    if (mode !== "full" || ids.length < 2) return;
		    const isFileDrag = (event) => {
		      const transfer = event.dataTransfer;
		      return transfer !== null && transfer !== void 0 && transfer.types !== void 0 && [...transfer.types].includes("Files");
		    };
		    const paneOf = (event) => {
		      const target = event.target;
		      if (!(target instanceof Element)) return null;
		      return target.closest("[data-split-pane]");
		    };
		    const clear = () => {
		      dragDepth.current = 0;
		      setDropTarget(null);
		    };
		    const onDragEnter = (event) => {
		      if (!isFileDrag(event)) return;
		      event.preventDefault();
		      event.stopPropagation();
		      dragDepth.current += 1;
		    };
		    const onDragOver = (event) => {
		      if (!isFileDrag(event)) return;
		      event.preventDefault();
		      event.stopPropagation();
		      const transfer = event.dataTransfer;
		      if (transfer !== null) transfer.dropEffect = "copy";
		      const pane = paneOf(event);
		      setDropTarget(pane === null ? null : pane.getAttribute("data-split-pane"));
		    };
		    const onDragLeave = (event) => {
		      if (!isFileDrag(event)) return;
		      dragDepth.current = Math.max(0, dragDepth.current - 1);
		      if (dragDepth.current === 0) setDropTarget(null);
		    };
		    const onDrop = (event) => {
		      if (!isFileDrag(event)) return;
		      event.preventDefault();
		      event.stopPropagation();
		      const pane = paneOf(event);
		      clear();
		      if (pane === null || event.dataTransfer === null) return;
		      deliverDrop(pane, event.dataTransfer);
		    };
		    document.addEventListener("dragenter", onDragEnter, true);
		    document.addEventListener("dragover", onDragOver, true);
		    document.addEventListener("dragleave", onDragLeave, true);
		    document.addEventListener("drop", onDrop, true);
		    window.addEventListener("dragend", clear, true);
		    return () => {
		      document.removeEventListener("dragenter", onDragEnter, true);
		      document.removeEventListener("dragover", onDragOver, true);
		      document.removeEventListener("dragleave", onDragLeave, true);
		      document.removeEventListener("drop", onDrop, true);
		      window.removeEventListener("dragend", clear, true);
		    };
		  }, [mode, ids.length]);
		  const room = Math.max(0, stripWidth - (paged ? 0 : (ids.length - 1) * GUTTER));
		  const columns = (0, import_react2.useMemo)(() => {
		    if (ids.length === 0) return [];
		    if (paged) {
		      const width = room === 0 ? AUTO_PANE_WIDTH : Math.max(MIN_PANE_WIDTH, Math.floor(room / PER_PAGE));
		      return ids.map((id) => ({ id, width, actual: width }));
		    }
		    const pinned = ids.filter((id) => selection.widths[id] !== void 0);
		    const free = ids.filter((id) => selection.widths[id] === void 0);
		    const pinnedTotal = pinned.reduce((sum, id) => sum + selection.widths[id], 0);
		    const automatic = room === 0 ? AUTO_PANE_WIDTH : Math.max(AUTO_PANE_WIDTH, Math.floor((room - pinnedTotal) / Math.max(1, free.length)));
		    const base = ids.map((id) => ({ id, width: selection.widths[id] ?? automatic }));
		    const total = base.reduce((sum, entry) => sum + entry.width, 0);
		    if (total < room) base[base.length - 1].width += room - total;
		    return base.map((entry) => ({ ...entry, actual: entry.width }));
		  }, [ids, selection.widths, room, paged]);
		  const rebalance = (0, import_react2.useCallback)(() => {
		    setFocusedId(null);
		    setWidths({}, true);
		  }, []);
		  const toggleFocus = (0, import_react2.useCallback)(
		    (id) => {
		      if (paged || ids.length < 2) return;
		      if (focusedId === id) {
		        rebalance();
		        return;
		      }
		      setFocusedId(id);
		      const focusedWidth = Math.max(MIN_PANE_WIDTH, room - (ids.length - 1) * MIN_PANE_WIDTH);
		      const next = {};
		      for (const entry of ids) next[entry] = entry === id ? focusedWidth : MIN_PANE_WIDTH;
		      setWidths(next, true);
		    },
		    [focusedId, ids, room, rebalance, paged]
		  );
		  const startResize = (0, import_react2.useCallback)(
		    (index) => (event) => {
		      if (event.button !== 0) return;
		      event.preventDefault();
		      const startX = event.clientX;
		      const start = columns.map((entry) => entry.actual);
		      const pair = start[index] + start[index + 1];
		      setResizing(true);
		      setFocusedId(null);
		      const move = (moveEvent) => {
		        const delta = moveEvent.clientX - startX;
		        const left = Math.min(Math.max(start[index] + delta, MIN_PANE_WIDTH), pair - MIN_PANE_WIDTH);
		        const next = {};
		        columns.forEach((entry, position) => {
		          next[entry.id] = Math.round(position === index ? left : position === index + 1 ? pair - left : start[position]);
		        });
		        setWidths(next);
		      };
		      const finish = () => {
		        setResizing(false);
		        commitWidths();
		        window.removeEventListener("pointermove", move);
		        window.removeEventListener("pointerup", finish);
		        window.removeEventListener("pointercancel", finish);
		      };
		      window.addEventListener("pointermove", move);
		      window.addEventListener("pointerup", finish);
		      window.addEventListener("pointercancel", finish);
		    },
		    [columns]
		  );
		  const showActive = (0, import_react2.useCallback)(() => {
		    const active = Object.values(rows ?? {}).filter((row) => row.blank !== true && activityOf(statuses?.get(row.id)) !== "idle").sort(byRecency).map((row) => row.id);
		    setSessions(active);
		    setOverflow(active.length > MAX_PANES);
		  }, [rows, statuses]);
		  const exitSplit = (0, import_react2.useCallback)(() => {
		    setSessions([]);
		    layout?.selectPanel(null);
		  }, [layout]);
		  const bar = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { "data-split-view-bar": true, children: [
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "data-split-view-title": true, children: "\u5206\u5C4F" }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", "data-bar-button": true, "data-primary": true, onClick: showActive, children: "\u5168\u90E8\u8FDB\u884C\u4E2D" }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", "data-bar-button": true, onClick: exitSplit, children: "\u53D6\u6D88\u5206\u5C4F" }),
		    overflow ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { "data-split-view-hint": true, children: [
		      "\u53EA\u53D6\u524D ",
		      MAX_PANES,
		      " \u4E2A"
		    ] }) : null,
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "data-split-view-spacer": true }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { "data-mode-switch": true, role: "group", "aria-label": "\u663E\u793A\u5BC6\u5EA6", children: [
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", "data-mode-option": true, "data-active": mode === "full" ? "" : void 0, onClick: () => setMode("full"), children: "\u5B8C\u6574" }),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", "data-mode-option": true, "data-active": mode === "minimal" ? "" : void 0, onClick: () => setMode("minimal"), children: "\u6781\u7B80" })
		    ] }),
		    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { "data-split-view-count": true, children: [
		      ids.length,
		      " / ",
		      MAX_PANES
		    ] })
		  ] });
		  const empty = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-split-view-empty": true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u5728\u5DE6\u4FA7\u4F1A\u8BDD\u5217\u8868\u91CC\u60AC\u505C\u4E00\u884C\uFF0C\u70B9\u5206\u5C4F\u56FE\u6807\u52A0\u5165" }) });
		  if (mode === "minimal") {
		    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { "data-split-view-root": true, "data-mode": "minimal", ref: rootRef, children: [
		      bar,
		      ids.length === 0 ? empty : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-split-view-mini-list": true, children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		        SplitRow,
		        {
		          id,
		          title: titleOf(rows?.[id]),
		          step: currentStep(rows?.[id]),
		          activity: activityOf(statuses?.get(id)),
		          time: relativeTime(rows?.[id]?.updatedAt, now),
		          onClose: toggleSession
		        },
		        id
		      )) })
		    ] });
		  }
		  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { "data-split-view-root": true, "data-mode": "full", "data-resizing": resizing ? "" : void 0, ref: rootRef, children: [
		    bar,
		    columns.length === 0 ? empty : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-split-view-strip": true, "data-paged": paged ? "" : void 0, ref: setStripEl, children: columns.map((pane, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react2.Fragment, { children: [
		      paged || index === 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		        "div",
		        {
		          "data-split-view-gutter": true,
		          role: "separator",
		          "aria-orientation": "vertical",
		          title: "\u62D6\u52A8\u8C03\u6574\u5BBD\u5EA6\uFF0C\u53CC\u51FB\u6062\u590D\u7B49\u5BBD",
		          onPointerDown: startResize(index - 1),
		          onDoubleClick: rebalance,
		          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "data-split-view-gutter-line": true })
		        }
		      ),
		      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
		        SplitPane,
		        {
		          id: pane.id,
		          width: pane.actual,
		          reference: references.current.get(pane.id),
		          title: titleOf(rows?.[pane.id]),
		          activity: activityOf(statuses?.get(pane.id)),
		          focused: focusedId === pane.id,
		          dropActive: dropTarget === pane.id,
		          canFocus: !paged,
		          paged,
		          initiallyVisible: index < PER_PAGE,
		          unavailable: unavailable.current.has(pane.id),
		          onClose: toggleSession,
		          onToggleFocus: toggleFocus,
		          renderSlot,
		          SessionProvider
		        }
		      )
		    ] }, pane.id)) })
		  ] });
		}

		// src/client/row-toggle.jsx
		var import_jsx_runtime3 = require("react/jsx-runtime");
		function SplitGlyph({ selected }) {
		  const fill = selected ? "currentColor" : "none";
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "2.1", y: "3.1", width: "4.8", height: "9.8", rx: "1.1", stroke: "currentColor", strokeWidth: "1.2", fill }),
		    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "9.1", y: "3.1", width: "4.8", height: "9.8", rx: "1.1", stroke: "currentColor", strokeWidth: "1.2", fill })
		  ] });
		}
		function SplitRowToggle({ sessionId, displayTitle }) {
		  const selection = useSelection();
		  const selected = selection.ids.includes(sessionId);
		  const name = typeof displayTitle === "string" && displayTitle.trim() !== "" ? displayTitle.trim() : "\u8BE5\u4F1A\u8BDD";
		  const label = selected ? `\u5C06\u300C${name}\u300D\u79FB\u51FA\u5206\u5C4F` : `\u5C06\u300C${name}\u300D\u52A0\u5165\u5206\u5C4F`;
		  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
		    "button",
		    {
		      type: "button",
		      "data-split-toggle": "",
		      "data-selected": selected ? "" : void 0,
		      "aria-pressed": selected,
		      title: selected ? "\u79FB\u51FA\u5206\u5C4F" : "\u52A0\u5165\u5206\u5C4F",
		      "aria-label": label,
		      onClick: (event) => {
		        event.stopPropagation();
		        toggleSession(sessionId);
		      },
		      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SplitGlyph, { selected })
		    }
		  );
		}

		// src/client/pane.jsx
		function FixedChatView(props) {
		  return props.renderSlot("conversation.session", { view: "chat" });
		}
		function PaneConversation(props) {
		  const { renderFactorySlot, useSession, useConversation, useSessions, sessionId } = props;
		  const session = useSession((value) => value);
		  const conversation = useConversation((value) => value);
		  const summaryBlank = useSessions((state) => state.byId[sessionId]?.blank);
		  const shellPhase = conversation.activeTargets.size > 0 || !session.blank && !session.awaitingFirstTurn || session.running ? "active" : session.promptAttempted ? "engaging" : "blank";
		  const settling = shellPhase === "blank" && session.openState === "loading" && summaryBlank !== true;
		  const hero = shellPhase === "blank" && (session.openState === "open" || summaryBlank === true);
		  return renderFactorySlot(
		    "conversation.content",
		    { variant: "embedded", phase: settling ? "settling" : hero ? "hero" : "active", hero },
		    { slots: { views: FixedChatView } }
		  );
		}

		// src/client/runtime.js
		var PANEL_ID = "dsh-split-panel";
		var STYLE_TAG_ID = "dsh-split-panel/panel.css";
		function installStyles(css) {
		  if (typeof document === "undefined") return () => {
		  };
		  if (document.querySelector(`style[data-plugin-css=${JSON.stringify(STYLE_TAG_ID)}]`) !== null) return () => {
		  };
		  const tag = document.createElement("style");
		  tag.dataset.pluginCss = STYLE_TAG_ID;
		  tag.textContent = css;
		  document.head.appendChild(tag);
		  return () => {
		    tag.remove();
		  };
		}

		// src/client/index.jsx
		var inject = ["slots", "sessions", "layout"];
		function apply(ctx) {
		  ctx.effect(() => installStyles(panel_default));
		  ctx.slots.inject(
		    "sidebar.panellist",
		    () => ctx.slots.register({ name: "sidebar.panellist", id: PANEL_ID, order: 10, label: "\u5206\u5C4F" }, SplitViewIcon)
		  );
		  ctx.slots.inject(
		    "sidebar.workspaces.session.row.action",
		    () => ctx.slots.register({ name: "sidebar.workspaces.session.row.action", id: PANEL_ID, order: 50 }, SplitRowToggle)
		  );
		  ctx.slots.inject(
		    "main",
		    () => ctx.slots.register(
		      {
		        name: "main",
		        key: PANEL_ID,
		        children: { "dsh-split-panel.pane": { kind: "single", scope: "session" } },
		        inject: () => ({ sessions: ctx.sessions, layout: ctx.get("layout") })
		      },
		      SplitViewPanel
		    )
		  );
		  ctx.slots.inject("dsh-split-panel.pane", () => ctx.slots.register({ name: "dsh-split-panel.pane" }, PaneConversation));
		}
		return module.exports;
	}
});
