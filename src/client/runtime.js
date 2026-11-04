const PANEL_ID = "dsh-split-view"
const STYLE_TAG_ID = "dsh-split-view/panel.css"

export function installStyles(css) {
  if (typeof document === "undefined") return () => {}
  if (document.querySelector(`style[data-plugin-css=${JSON.stringify(STYLE_TAG_ID)}]`) !== null) return () => {}
  const tag = document.createElement("style")
  tag.dataset.pluginCss = STYLE_TAG_ID
  tag.textContent = css
  document.head.appendChild(tag)
  return () => {
    tag.remove()
  }
}

export { PANEL_ID }
