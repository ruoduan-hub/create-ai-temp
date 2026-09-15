<div align="center">

# create-ai-temp

**Scaffold modern frontend projects with an AI-ready knowledge base built in.**

[![npm version](https://img.shields.io/npm/v/create-ai-temp?color=cb3837&logo=npm)](https://www.npmjs.com/package/create-ai-temp)
[![npm downloads](https://img.shields.io/npm/dm/create-ai-temp?color=blue)](https://www.npmjs.com/package/create-ai-temp)
[![Build and publish](https://github.com/ruoduan-hub/create-ai-temp/actions/workflows/publish.yml/badge.svg?branch=master)](https://github.com/ruoduan-hub/create-ai-temp/actions/workflows/publish.yml)
[![Node.js version](https://img.shields.io/node/v/create-ai-temp?logo=node.js)](https://www.npmjs.com/package/create-ai-temp)
[![License](https://img.shields.io/npm/l/create-ai-temp)](https://github.com/ruoduan-hub/create-ai-temp/blob/master/LICENSE)

English · [简体中文](https://github.com/ruoduan-hub/create-ai-temp/blob/master/README.zh-CN.md)

</div>

## Why create-ai-temp?

Starting a project is more than installing a framework. Your team—and the AI tools working with it—also need shared architecture, conventions, workflows, and context.

`create-ai-temp` generates that foundation in one command. Choose a ready-to-run Next.js preset or a stack-neutral clean architecture, and get a shared Chinese `.agent` knowledge base with dedicated entry points for Codex, Claude Code, Gemini CLI, GitHub Copilot, and Cursor.

## Features

- **AI-ready by default** — shared project context, coding rules, workflows, and reusable task templates.
- **Works across AI tools** — dedicated instruction files point every supported assistant to the same source of truth.
- **Two project modes** — start with a modern frontend preset or a technology-agnostic clean structure.
- **Layered architecture** — clear boundaries for domain, application, infrastructure, presentation, and shared code.
- **Interactive and scriptable** — use guided prompts locally or explicit flags in automation.
- **Package-manager aware** — supports pnpm, npm, Yarn, and Bun, including automatic detection.
- **Safe project creation** — validates project names, refuses non-empty target directories, and reports recoverable setup failures.

## Quick start

```bash
npx create-ai-temp my-project
```

Follow the prompts to choose a mode, package manager, dependency installation, and Git initialization.

You can also install the CLI globally:

```bash
npm install --global create-ai-temp
create-ai-temp my-project
```

## Project modes

| Mode | Best for | What it creates |
| --- | --- | --- |
| **Preset** | Starting a frontend application immediately | Next.js, TypeScript, Zustand, Biome, Vitest, Testing Library, layered source folders, and AI instructions |
| **Clean** | Designing architecture before choosing a stack | Layered source folders, engineering documentation, and the complete AI knowledge base without a `package.json` |

### Preset mode

```bash
npx create-ai-temp my-app --preset
```

Choose a package manager explicitly and skip optional setup when needed:

```bash
npx create-ai-temp my-app --preset --pm pnpm --no-install --no-git
```

### Clean mode

```bash
npx create-ai-temp architecture-only --clean --no-git
```

Clean mode does not install dependencies because it intentionally contains no framework or package manifest.

## CLI options

```text
Usage: create-ai-temp [options] [project-name]
```

| Option | Description |
| --- | --- |
| `--preset` | Generate the Next.js + Zustand + Biome preset |
| `--clean` | Generate a stack-neutral clean project |
| `--pm, --package-manager <manager>` | Use `pnpm`, `npm`, `yarn`, or `bun` |
| `--no-install` | Skip dependency installation |
| `--no-git` | Skip Git repository initialization |
| `-h, --help` | Show CLI help |

`--preset` and `--clean` are mutually exclusive. In a non-interactive environment, one of them must be provided.

## What gets generated

Every project starts with the shared foundation:

```text
my-project/
├── .agent/
│   ├── context/       # Project overview, stack notes, and glossary
│   ├── decisions/     # Architecture decision records
│   ├── rules/         # Architecture, security, testing, and style rules
│   ├── templates/     # Reusable specs, plans, and review templates
│   └── workflows/     # Feature, bug, and refactoring workflows
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

Preset mode layers the Next.js application, state management, styling, tests, and tool configuration on top of this shared structure.

## Supported AI tools

| Tool | Generated entry point |
| --- | --- |
| OpenAI Codex | `AGENTS.md` |
| Claude Code | `CLAUDE.md` |
| Gemini CLI | `GEMINI.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Cursor | `.cursor/rules/project.mdc` |

These files reference the shared `.agent` directory so conventions stay consistent instead of being duplicated for every tool.

## Requirements

- Node.js **20.12 or later** to run the CLI.
- Node.js **20.19 or later** for projects generated in preset mode.
- Git is optional and only required when initializing a repository.

## Development

```bash
git clone https://github.com/ruoduan-hub/create-ai-temp.git
cd create-ai-temp
npm ci
npm run dev -- demo --clean --no-git
```

Run the project checks before submitting a change:

```bash
npm run check
npm test
npm run build
npm pack --dry-run
```

## Releases

Pushes to `master` run the GitHub Actions release workflow. It installs dependencies, checks the code, runs the test suite, builds the package, and publishes only when the version in `package.json` is not already available on npm.

The repository must provide an `NPM_TOKEN` Actions secret with read/write access to the `create-ai-temp` package and permission to bypass 2FA. Bump the package version before publishing a release.

## Contributing

Issues and pull requests are welcome. Please keep changes focused, add tests for important behavior, and use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

## License

Released under the [MIT License](https://github.com/ruoduan-hub/create-ai-temp/blob/master/LICENSE).
