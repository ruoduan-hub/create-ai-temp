# 架构说明

项目采用分层架构，核心目标是让业务规则独立于界面、框架和外部服务。

```text
presentation ──→ application ──→ domain
                         ↑
infrastructure ──────────┘
```

## 分层职责

- `presentation`：界面、控制器、输入输出格式转换。
- `application`：用例编排、事务边界、外部能力端口。
- `domain`：实体、值对象、领域服务和业务错误。
- `infrastructure`：端口实现、网络、数据库、文件和第三方服务。
- `shared`：日志、通用类型等无业务含义的共享能力。

重要架构选择记录在 `docs/decisions/`，模板位于 `.agent/templates/architecture-decision.md`。
