<div align="center">

# create-ai-temp

**一条命令创建内置 AI 协作知识库的现代前端项目。**

[![npm 版本](https://img.shields.io/npm/v/create-ai-temp?color=cb3837&logo=npm)](https://www.npmjs.com/package/create-ai-temp)
[![npm 下载量](https://img.shields.io/npm/dm/create-ai-temp?color=blue)](https://www.npmjs.com/package/create-ai-temp)
[![构建与发布](https://github.com/ruoduan-hub/create-ai-temp/actions/workflows/publish.yml/badge.svg?branch=master)](https://github.com/ruoduan-hub/create-ai-temp/actions/workflows/publish.yml)
[![Node.js 版本](https://img.shields.io/node/v/create-ai-temp?logo=node.js)](https://www.npmjs.com/package/create-ai-temp)
[![许可证](https://img.shields.io/npm/l/create-ai-temp)](https://github.com/ruoduan-hub/create-ai-temp/blob/master/LICENSE)

[English](https://github.com/ruoduan-hub/create-ai-temp/blob/master/README.md) · 简体中文

</div>

## 为什么选择 create-ai-temp？

创建项目不只是安装一个框架。团队以及参与开发的 AI 工具，还需要共享项目架构、编码约定、工作流程和业务上下文。

`create-ai-temp` 用一条命令生成这些工程基础。你可以选择开箱即用的 Next.js 预设，也可以从不绑定技术栈的纯净架构开始；两种模式都会生成共享的中文 `.agent` 知识库，并为 Codex、Claude Code、Gemini CLI、GitHub Copilot 和 Cursor 提供专属入口。

## 核心特性

- **原生支持 AI 协作**：内置项目上下文、编码规则、工作流程和可复用任务模板。
- **兼容多种 AI 工具**：不同工具的入口文件统一引用同一份知识源，避免规则分散。
- **两种项目模式**：可直接使用现代前端预设，也可生成与技术栈无关的纯净架构。
- **清晰的分层结构**：明确划分领域、应用、基础设施、表现层与共享代码。
- **支持交互和自动化**：本地使用引导式问答，CI 或脚本中使用明确参数。
- **兼容常用包管理器**：支持 pnpm、npm、Yarn 和 Bun，并能自动检测当前环境。
- **安全地创建项目**：校验项目名称，拒绝覆盖非空目录，并对可恢复的初始化错误给出提示。

## 快速开始

```bash
npx create-ai-temp my-project
```

根据交互提示选择项目模式、包管理器、是否安装依赖以及是否初始化 Git。

也可以全局安装 CLI：

```bash
npm install --global create-ai-temp
create-ai-temp my-project
```

## 项目模式

| 模式 | 适用场景 | 生成内容 |
| --- | --- | --- |
| **预设模式** | 希望立即开始前端应用开发 | Next.js、TypeScript、Zustand、Biome、Vitest、Testing Library、分层源码目录和 AI 指令 |
| **纯净模式** | 希望先设计架构，再决定技术栈 | 分层源码目录、工程文档和完整 AI 知识库，不生成 `package.json` |

### 预设模式

```bash
npx create-ai-temp my-app --preset
```

需要明确指定包管理器或跳过可选步骤时：

```bash
npx create-ai-temp my-app --preset --pm pnpm --no-install --no-git
```

### 纯净模式

```bash
npx create-ai-temp architecture-only --clean --no-git
```

纯净模式不包含框架和包清单，因此不会安装依赖。

## CLI 参数

```text
Usage: create-ai-temp [options] [project-name]
```

| 参数 | 说明 |
| --- | --- |
| `--preset` | 生成 Next.js + Zustand + Biome 预设项目 |
| `--clean` | 生成不绑定技术栈的纯净项目 |
| `--pm, --package-manager <manager>` | 使用 `pnpm`、`npm`、`yarn` 或 `bun` |
| `--no-install` | 跳过依赖安装 |
| `--no-git` | 跳过 Git 仓库初始化 |
| `-h, --help` | 显示 CLI 帮助 |

`--preset` 与 `--clean` 不能同时使用。在非交互环境中，必须明确提供其中一个参数。

## 生成内容

每个项目都会包含以下共享工程基础：

```text
my-project/
├── .agent/
│   ├── context/       # 项目概览、技术栈说明与术语表
│   ├── decisions/     # 架构决策记录
│   ├── rules/         # 架构、安全、测试和编码规则
│   ├── templates/     # 需求、计划、评审等复用模板
│   └── workflows/     # 功能开发、缺陷诊断和重构流程
├── .cursor/rules/
├── .github/copilot-instructions.md
├── docs/
├── src/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   ├── presentation/
│   └── shared/
├── tests/
├── AGENTS.md
├── CLAUDE.md
└── GEMINI.md
```

预设模式会在共享结构之上继续叠加 Next.js 应用、状态管理、样式、测试和工具配置。

## 支持的 AI 工具

| 工具 | 生成的入口文件 |
| --- | --- |
| OpenAI Codex | `AGENTS.md` |
| Claude Code | `CLAUDE.md` |
| Gemini CLI | `GEMINI.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Cursor | `.cursor/rules/project.mdc` |

这些入口统一引用 `.agent` 目录中的共享规则，避免为每个工具维护重复内容。

## 环境要求

- 运行 CLI 需要 Node.js **20.12 或更高版本**。
- 预设模式生成的项目需要 Node.js **20.19 或更高版本**。
- Git 是可选依赖，仅在初始化仓库时需要。

## 本地开发

```bash
git clone https://github.com/ruoduan-hub/create-ai-temp.git
cd create-ai-temp
npm ci
npm run dev -- demo --clean --no-git
```

提交改动前请运行完整检查：

```bash
npm run check
npm test
npm run build
npm pack --dry-run
```

## 自动发布

推送到 `master` 分支会触发 GitHub Actions。工作流依次安装依赖、执行静态检查、运行测试并构建 npm 包；只有当 `package.json` 中的版本尚未发布时，才会执行 npm 发布。

仓库需要配置名为 `NPM_TOKEN` 的 Actions Secret，其值应为具有 `create-ai-temp` 包读写权限并允许绕过 2FA 的 npm Granular Access Token。发布新版本前需要先更新包版本号。

## 参与贡献

欢迎提交 Issue 和 Pull Request。请让每次改动保持聚焦，为关键行为补充测试，并使用 [Conventional Commits](https://www.conventionalcommits.org/) 编写提交信息。

## 许可证

本项目基于 [MIT License](https://github.com/ruoduan-hub/create-ai-temp/blob/master/LICENSE) 发布。
