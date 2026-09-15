# __PROJECT_NAME__

这是一个面向 AI 协作的现代前端项目，预设 Next.js、Zustand、Biome、Vitest 和 Testing Library，并采用分层架构。

## 快速开始

```bash
npm install
npm run dev
```

使用其他包管理器时，将 `npm` 替换为 `pnpm`、`yarn` 或 `bun`。

## 常用命令

```bash
npm run check       # Biome 与 TypeScript 检查
npm test            # 运行测试
npm run build       # 生产构建
```

## 架构

```text
src/app/              Next.js 路由与组合入口
src/presentation/     React 组件、Hooks 和客户端状态适配
src/application/      用例与外部能力端口
src/domain/           纯业务规则
src/infrastructure/   API、存储和第三方实现
src/shared/           无业务语义的共享能力
```

开始开发前请阅读 `AGENTS.md` 和 `.agent/README.md`。通用 AI 规则位于 `.agent/rules/`，技术栈增量规则位于 `.agent/stack/`。
