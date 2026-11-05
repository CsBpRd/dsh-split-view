#!/usr/bin/env bash
# Install dsh-split-panel into a DSH profile from GitHub, without npm.
#
# The archive is fetched through the GitHub API, so this also works on networks
# where github.com itself is unreachable but api.github.com is not.
set -euo pipefail

REPO="CsBpRd/dsh-split-view"
PKG="dsh-split-panel"
BRANCH="main"
DSH_HOME="${DSH_HOME:-$HOME/.dsh}"
PROFILE="desktop"
INSTALL_ROOT=""
RUN_INSTALL=1
TMP=""

usage() {
  cat <<'TXT'
用法: install.sh [选项]

  --profile <name>   DSH profile 名称，默认 desktop
  --prefix <dir>     插件解压目录，默认 $DSH_HOME/plugins
  --branch <ref>     下载的 git 分支或标签，默认 main
  --no-install       只解压并写入 profile 依赖，不执行 pnpm install
  -h, --help         显示本帮助

环境变量:
  DSH_HOME           默认 ~/.dsh
  GITHUB_TOKEN       可选，GitHub API 限流时提供一个只读 token
TXT
}

while [ $# -gt 0 ]; do
  case "$1" in
    --profile) PROFILE="${2:?缺少 profile 名称}"; shift 2 ;;
    --prefix) INSTALL_ROOT="${2:?缺少目标目录}"; shift 2 ;;
    --branch) BRANCH="${2:?缺少分支或标签}"; shift 2 ;;
    --no-install) RUN_INSTALL=0; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "未知参数: $1" >&2; usage; exit 1 ;;
  esac
done

command -v curl >/dev/null 2>&1 || { echo "需要 curl" >&2; exit 1; }
command -v tar >/dev/null 2>&1 || { echo "需要 tar" >&2; exit 1; }

DSH_HOME="${DSH_HOME%/}"
PROFILE_DIR="$DSH_HOME/profiles/$PROFILE"
[ -d "$PROFILE_DIR" ] || { echo "找不到 profile 目录: $PROFILE_DIR" >&2; exit 1; }
[ -f "$PROFILE_DIR/package.json" ] || { echo "profile 缺少 package.json: $PROFILE_DIR" >&2; exit 1; }
INSTALL_ROOT="${INSTALL_ROOT:-$DSH_HOME/plugins}"

NODE_BIN=""
for candidate in "$DSH_HOME"/dsh-runtimes/*/dependencies/node/bin/node; do
  if [ -x "$candidate" ]; then NODE_BIN="$candidate"; break; fi
done
if [ -z "$NODE_BIN" ] && command -v node >/dev/null 2>&1; then NODE_BIN="$(command -v node)"; fi
[ -n "$NODE_BIN" ] || { echo "找不到可用的 node（DSH 运行时或系统 node 均可）" >&2; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "下载 $REPO@$BRANCH ..."
if [ -n "${GITHUB_TOKEN:-}" ]; then
  curl -fsSL --retry 3 -H "Authorization: token $GITHUB_TOKEN" -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$REPO/tarball/$BRANCH" -o "$TMP/src.tar.gz"
else
  curl -fsSL --retry 3 -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$REPO/tarball/$BRANCH" -o "$TMP/src.tar.gz"
fi

mkdir -p "$TMP/src"
tar -xzf "$TMP/src.tar.gz" -C "$TMP/src" --strip-components=1
[ -f "$TMP/src/lib/client.js" ] || { echo "压缩包里没有 lib/client.js，分支或仓库不对" >&2; exit 1; }

TARGET="$INSTALL_ROOT/$PKG"
rm -rf "$TARGET"
mkdir -p "$INSTALL_ROOT"
mv "$TMP/src" "$TARGET"
rm -rf "$TARGET/node_modules"

"$NODE_BIN" - "$PROFILE_DIR/package.json" "$PKG" "$TARGET" <<'NODE'
const fs = require("fs")
const [file, name, target] = process.argv.slice(2)
const data = JSON.parse(fs.readFileSync(file, "utf8"))
data.dependencies = data.dependencies || {}
data.dependencies[name] = "link:" + target
data.dsh = data.dsh || {}
data.dsh.profile = data.dsh.profile || {}
const bundles = data.dsh.profile.bundles = data.dsh.profile.bundles || []
if (!bundles.includes(name)) bundles.push(name)
fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n")
NODE

if [ "$RUN_INSTALL" = 1 ]; then
  PNPM_JS="/Applications/DSH NEXT.app/Contents/Resources/app.asar.unpacked/node_modules/pnpm/bin/pnpm.cjs"
  if [ -f "$PNPM_JS" ]; then
    ( cd "$PROFILE_DIR" && "$NODE_BIN" "$PNPM_JS" install )
  elif command -v pnpm >/dev/null 2>&1; then
    ( cd "$PROFILE_DIR" && pnpm install )
  else
    echo "未找到 pnpm：请在 $PROFILE_DIR 手动执行 pnpm install" >&2
  fi
fi

echo "已安装到 $TARGET"
echo "重启 DSH 后生效。"
