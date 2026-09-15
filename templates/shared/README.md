# __PROJECT_NAME__

这是一个采用分层架构、面向 AI 协作的纯净项目骨架。项目不预设语言、框架或包管理器，你可以在明确技术选型后逐步补充工程配置。

## 开始之前

1. 阅读 `AGENTS.md` 和 `.agent/README.md`。
2. 在 `.agent/context/project-overview.md` 中补充目标与范围。
3. 在 `.agent/context/tech-stack.md` 中记录技术选型。
4. 业务代码遵守 `presentation → application → domain` 的依赖方向。
5. 外部系统实现放在 `infrastructure`，通过应用层端口接入。

## 项目结构

```text
src/
├── presentation/      # 用户界面和输入输出适配
├── application/       # 用例、编排和端口
├── domain/            # 实体、值对象和核心规则
├── infrastructure/    # 网络、存储和第三方实现
└── shared/            # 无业务含义的共享能力
```

更多说明见 `docs/architecture.md`。
