# Biome 增量规则

- `biome.json` 是格式化、Lint 和导入整理的唯一配置源。
- 提交前运行 `npm run check`；可安全自动修复时运行 `npm run check:fix`。
- 不使用大范围忽略来隐藏问题。单行抑制必须注明无法遵守规则的原因。
- 不再叠加 ESLint 或 Prettier，除非现有 Biome 能力无法满足明确需求并记录 ADR。
- 模板、生成文件或构建产物应通过 `files.includes` 排除，而不是逐条抑制规则。
