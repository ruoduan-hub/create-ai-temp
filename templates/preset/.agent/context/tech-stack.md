# 技术栈

## 核心选型

- 运行时：Node.js 20.19 或更高版本
- 语言：TypeScript 严格模式
- Web 框架：Next.js 16，App Router
- UI：React 19
- 客户端状态：Zustand 5
- 格式化与静态检查：Biome 2
- 测试：Vitest、Testing Library、jsdom

## 约束

- 默认使用 Server Component，只有交互、浏览器 API 或客户端状态需要时才使用 Client Component。
- Zustand 只管理必要的客户端共享状态；服务端数据优先在服务端获取。
- 业务规则保持在 `domain`，不得依赖 React、Next.js 或 Zustand。
- 使用 `npm run check` 执行 Biome 和 TypeScript 检查，使用 `npm test` 运行测试。
