# 分层架构规则

## 依赖方向

```text
presentation → application → domain
infrastructure → application/domain
```

- `domain` 不依赖框架、界面、数据库或网络库。
- `application` 编排用例，通过端口描述外部能力。
- `infrastructure` 实现端口，封装 API、存储和第三方服务。
- `presentation` 负责展示、交互和输入输出转换，不承载核心业务规则。
- `shared` 只存放真正跨模块且不含业务语义的能力。

新增跨层依赖前必须说明原因。禁止用全局工具目录掩盖不清晰的职责归属。
