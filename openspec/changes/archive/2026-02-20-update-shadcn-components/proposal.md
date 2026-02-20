## Why

项目当前使用 React 19 和大量 shadcn/ui 组件（基于 Radix UI primitives），但部分 Radix UI 包版本较旧（如 `react-avatar@1.1.10`、`react-aspect-ratio@1.1.7`），可能存在与 React 19 的兼容性问题。需要统一更新所有 shadcn 组件到最新版本，确保与 React 19 完全兼容，并解决潜在的 peer dependency 冲突和类型定义问题。

## What Changes

- 更新所有 `@radix-ui/*` 依赖包到最新稳定版本（支持 React 19）
- 重新生成所有 shadcn/ui 组件文件（60+ 个组件），确保与最新 shadcn CLI 和模板保持一致
- 解决 peer dependency 警告和版本冲突
- 更新相关类型定义和导入语句（如有变化）
- 验证所有组件在 React 19 环境下的正常运行
- 确保与 Tailwind CSS 4.1.12、TypeScript 5.8.2 的兼容性
- 保持现有组件的 API 和样式不变（除非有 breaking changes）

## Capabilities

### New Capabilities

- `component-version-audit`: 审计当前 shadcn/Radix UI 组件版本，识别过期包和兼容性问题
- `dependency-conflict-resolution`: 自动化解决 peer dependency 冲突的策略和脚本

### Modified Capabilities

<!-- 无现有 spec 需要修改 -->

## Impact

**受影响的依赖**：

- 30+ 个 `@radix-ui/react-*` 包
- `class-variance-authority`、`tailwind-merge`、`lucide-react` 等周边依赖
- `cmdk`、`sonner`、`vaul` 等基于 Radix 的第三方组件

**受影响的代码**：

- `src/components/ui/` 下的 60+ 个组件文件
- 所有使用这些组件的页面和功能组件（`src/app/`、`src/components/features/`）
- 可能涉及的类型定义文件（`src/lib/types/`）

**潜在的 Breaking Changes**：

- Radix UI 可能有 API 变更（需要逐一检查更新日志）
- shadcn CLI 生成的组件模板可能有结构调整
- 类型定义可能更加严格

**测试影响**：

- 所有使用 UI 组件的页面需要手动测试
- 表单、对话框、下拉菜单等交互组件需要重点验证
- 响应式布局和主题切换功能需要确认

**部署影响**：

- 需要重新构建生产包（`pnpm build`）
- 生产环境验证后再部署
- 建议在 staging 环境先行测试
