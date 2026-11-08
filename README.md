# dsh-split-panel

DSH 分屏面板：把并行的多个任务并排显示，每屏一个任务的实时对话；另有只报进度的一条条极简视图。

## 用法

1. 在左侧会话列表里悬停任意会话行，点行尾的分屏图标把它加入 / 移出分屏（图标实心表示已在分屏里）。
2. 侧边栏「分屏」打开面板；面板里的「全部进行中」把正在运行、以及正在等你回复（审批 / 提问 / 计划确认）的会话一次性铺开。
3. 分屏永远是竖着的整列：4 屏以内正好铺满一屏；超过 4 屏按每页 4 列翻页，鼠标滚轮整页左右翻。
4. 4 屏以内列与列之间的分隔线可拖动调宽（最小 160px），双击恢复等宽；每屏标题栏的展开按钮（或双击标题栏）把这一屏撑满、其余压到最小。
5. 「完整」每屏是带输入框的实时对话；「极简」把面板换成一行行状态条，只显示状态与最近活动时间，不加载任何对话。
6. 「取消分屏」清空所有分屏并直接回到对话。
7. 把文件拖到某一屏上，只会加入这一屏的会话，不会同时进到所有分屏。
8. 最多 8 屏；选中的会话、每屏宽度与显示模式都记在本机。
9. 翻页时只有当前页的 4 个会话挂载对话，其余列不渲染，避免一开分屏就卡。

## 文件

| 文件 | 作用 |
|---|---|
| `src/client/index.jsx` | 插件入口：注册侧边栏行、会话行切换、主面板与分屏子 slot |
| `src/client/selection.js` | 共享选择状态（侧边栏与会话面板共用），本机持久化 |
| `src/client/row-toggle.jsx` | 会话行里的分屏切换按钮 |
| `src/client/panel.jsx` | 面板：顶栏、竖列布局、拖拽调宽、聚焦、极简列表、滚轮浏览、拖放路由、引用生命周期 |
| `src/client/pane.jsx` | 单屏会话体：嵌入 `conversation.content`（embedded） |
| `src/client/panel.css` | 面板与按钮样式、动效（构建时内联，运行时注入一个 style 标签） |
| `lib/index.js` | 宿主半侧空 `apply`，只为让插件行进 Loader |

## 构建

```bash
npm install
npm run build   # src/client → lib/client.js（__ModuleLoader__ 包装）
npm run smoke   # 加载契约 + 完整/极简/行切换渲染冒烟
```

## 安装

**用 npm 安装：**

```sh
dsh plugin --profile desktop add dsh-split-panel
```

或直接 `npm i -g dsh-split-panel` 后自行 link。包地址：https://www.npmjs.com/package/dsh-split-panel

**一行安装（不需要 npm）：**

```sh
curl -fsSL https://raw.githubusercontent.com/CsBpRd/dsh-split-view/main/install.sh | bash
```

脚本通过 GitHub API 下载压缩包，解压到 `~/.dsh/plugins/dsh-split-panel`，把 `link:` 依赖和 bundle 行写进 `~/.dsh/profiles/desktop/package.json`，再用 DSH 自带的 pnpm 安装依赖。装完重启 DSH NEXT。

可选参数：`--profile <名称>`、`--prefix <目录>`、`--branch <ref>`、`--no-install`。

访问不了 `raw.githubusercontent.com` 时，改从 API 取脚本：

```sh
curl -fsSL -H "Accept: application/vnd.github.raw" https://api.github.com/repos/CsBpRd/dsh-split-view/contents/install.sh | bash
```

**手动安装：**

1. 取回仓库：
   - `git clone https://github.com/CsBpRd/dsh-split-view.git`
   - 或 `curl -L -o dsh-split-view.tar.gz https://api.github.com/repos/CsBpRd/dsh-split-view/tarball/main && tar xzf dsh-split-view.tar.gz`
2. 在 DSH 的 profile（`~/.dsh/profiles/desktop/package.json`）里：
   - `dependencies` 增加 `"dsh-split-panel": "link:<仓库所在目录>"`
   - `dsh.profile.bundles` 增加 `"dsh-split-panel"`
3. 在 profile 目录执行 `pnpm install`，重启 DSH NEXT。

## 边界

- 同一会话不会开两屏；会话被删除或引用失败时该屏显示「会话不可用」，可直接关掉。
- 极简模式不挂载对话，因此不持有会话引用、也不接收拖放。
- 未做拖拽排序、独立窗口和快捷键。
