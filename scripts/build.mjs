import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { build } from "esbuild"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const id = "dsh-split-panel"

const result = await build({
  absWorkingDir: root,
  entryPoints: ["src/client/index.jsx"],
  bundle: true,
  write: false,
  format: "cjs",
  platform: "browser",
  target: "es2022",
  jsx: "automatic",
  external: ["react", "react/jsx-runtime", "react-dom"],
  loader: { ".css": "text" },
  legalComments: "none",
  logLevel: "warning",
})

const code = result.outputFiles[0].text.replace(/\n$/, "")
const body = code
  .split("\n")
  .map((line) => (line === "" ? "" : `\t\t${line}`))
  .join("\n")

const wrapped = `window.__ModuleLoader__.load({
\tid: ${JSON.stringify(id)},
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
${body}
\t\treturn module.exports;
\t}
});
`

await mkdir(path.join(root, "lib"), { recursive: true })
await writeFile(path.join(root, "lib/client.js"), wrapped)
console.log(`built lib/client.js (${wrapped.length} bytes)`)
