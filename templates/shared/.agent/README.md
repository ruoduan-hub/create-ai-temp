# AI 协作中心

`.agent/` 是本项目所有 AI 工具共用的唯一规则源。根目录的 `AGENTS.md`、`CLAUDE.md`、`GEMINI.md` 以及编辑器配置只承担适配入口职责。

## 阅读顺序

1. 阅读 `context/project-overview.md`，理解项目目标。
2. 阅读 `rules/architecture.md` 与当前任务相关的其他规则。
3. 选择 `workflows/` 中对应的工作流。
4. 使用 `templates/` 中的模板整理输入和输出。
5. 如果存在 `stack/`，再读取与当前技术相关的增量规则。

## 内容边界

- `rules/`：长期有效、所有任务必须遵守的规则。
- `context/`：项目特有的目标、技术栈和业务词汇。
- `templates/`：需求、计划、审查、测试等可复用模板。
- `workflows/`：完成某类任务的推荐步骤。
- `decisions/`：架构决策记录。
- `stack/`：仅预设模式包含的技术栈增量规则。

通用规则不得依赖某个具体框架；技术栈约束必须放入 `stack/`。
