# create-ai-temp

`create-ai-temp` 是一个面向现代前端工程与 AI 协作的项目模板生成器。它提供共享的中文 `.agent` 知识库，并通过工具专属入口兼容 Codex、Claude Code、Gemini CLI、GitHub Copilot 和 Cursor。

## 使用方式

```bash
npx create-ai-temp my-project
```

全局安装后也可以直接运行：

```bash
npm install --global create-ai-temp
create-ai-temp my-project
```

## 两种模式

- 预设模式：生成 Next.js、Zustand、Biome、Vitest 和 Testing Library 工程，在通用 AI 模板上叠加技术栈规则。
- 纯净模式：不引入技术栈和 `package.json`，只生成分层架构、工程文档和完整通用 AI 模板。

## 非交互使用

```bash
create-ai-temp my-app --preset --pm pnpm --no-install --no-git
create-ai-temp architecture-only --clean --no-git
```

参数：

- `--preset`：选择预设模式。
- `--clean`：选择纯净模式。
- `--pm <pnpm|npm|yarn|bun>`：指定预设模式的包管理器。
- `--no-install`：生成项目但不安装依赖。
- `--no-git`：不初始化 Git。

## 本地开发

```bash
npm install
npm run dev -- demo --clean --no-git
npm run check
npm test
npm run build
```

CLI 要求 Node.js 20.12 或更高版本。预设项目要求 Node.js 20.19 或更高版本。

## 模板组合

```text
templates/shared   两种模式共用的架构与中文 AI 模板
templates/preset   预设模式叠加的前端工程和技术栈规则
```

生成器先复制 `shared`，预设模式再叠加 `preset`，因此通用 AI 规则只有一个维护来源。

## 发布

推送到 `master` 分支后，GitHub Actions 会依次执行静态检查、测试和构建，并在当前版本尚未发布时通过 npm Trusted Publishing 发布。首次发布后，需要在 npm 包设置中将 `ruoduan-hub/create-ai-temp` 的 `publish.yml` 配置为可信发布者；发布新版本前先更新 `package.json` 中的版本号。

```bash
npm pack --dry-run
npm publish
```

发布前会自动运行静态检查、测试和构建。本项目不会自动执行发布操作。
