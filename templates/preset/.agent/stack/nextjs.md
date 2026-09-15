# Next.js 增量规则

- 使用 App Router；`src/app` 只负责路由、布局、元数据、Provider 和模块组合。
- 组件默认为 Server Component，不因习惯添加 `"use client"`。
- Client Component 保持在尽可能小的交互边界，传入的属性必须可序列化。
- 服务端数据在服务端读取，并明确缓存、重新验证和动态渲染策略。
- Server Action 视为不可信入口，必须校验输入并在服务端重新检查权限。
- 使用框架提供的 Metadata、Image、Link 和字体能力时遵循其运行边界。
- 加载、空状态、错误和未找到页面应提供明确且可访问的反馈。
- 不在客户端环境变量中暴露密钥；`NEXT_PUBLIC_` 变量视为公开信息。
