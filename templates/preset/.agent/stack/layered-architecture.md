# Next.js 分层架构映射

| 目录 | 职责 | 允许依赖 |
| --- | --- | --- |
| `src/app` | 路由与组合根 | 所有外层模块，不承载业务规则 |
| `src/presentation` | React 组件、Hooks、Zustand 适配 | application、domain |
| `src/application` | 用例与端口 | domain |
| `src/domain` | 纯业务模型与规则 | 无框架依赖 |
| `src/infrastructure` | API、存储、第三方端口实现 | application、domain |
| `src/shared` | 无业务语义的共享能力 | 不得反向依赖业务模块 |

Next.js 的路由文件是组合根，可以实例化基础设施实现并注入应用用例。展示组件不得直接创建 API 客户端或访问数据库。
