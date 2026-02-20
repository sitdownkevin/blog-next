## Context

**当前状态**：

- 项目使用 React 19.0.0 + Next.js 16.1.6 (App Router)
- 安装了 30+ 个 `@radix-ui/react-*` 包，版本分布在 1.x 和 2.x（如 `react-accordion@1.2.12`、`react-context-menu@2.2.16`）
- 使用 shadcn/ui 组件库（自托管在 `src/components/ui/`），包含 60+ 个组件
- 组件使用 Tailwind CSS 4.1.12 + `class-variance-authority` 管理样式变体
- TypeScript 5.8.2（strict mode 关闭）

**问题**：

- React 19 引入了新的并发特性和类型定义，部分旧版 Radix UI 可能未完全适配
- 不同 Radix 包的版本不一致（有些是 1.x，有些是 2.x），可能导致 peer dependency 警告
- shadcn CLI 持续更新组件模板，现有组件可能缺少新的最佳实践（如更好的无障碍支持、类型安全）

**约束**：

- 必须保持向后兼容，不能破坏现有页面和功能
- 使用 pnpm 作为包管理器
- 组件样式基于 Tailwind CSS，不能切换到其他方案
- 生产环境零停机更新

## Goals / Non-Goals

**Goals:**

- ✅ 更新所有 Radix UI 依赖到最新稳定版本（React 19 兼容）
- ✅ 使用 shadcn CLI 重新生成所有组件，确保模板最新
- ✅ 解决所有 peer dependency 冲突和警告
- ✅ 验证所有组件在 React 19 下正常工作（视觉和交互）
- ✅ 建立版本审计和冲突检测的自动化流程

**Non-Goals:**

- ❌ 不迁移到其他 UI 库（如 Ant Design、MUI）
- ❌ 不重构现有组件的使用方式或 API（除非 Radix 有 breaking changes）
- ❌ 不添加新的 shadcn 组件（仅更新现有组件）
- ❌ 不升级 React 或 Next.js 版本（已是最新）

## Decisions

### 1. 依赖更新策略：分批测试 vs 一次性更新

**决策**：采用**一次性更新 + 分阶段验证**的混合策略

**理由**：

- Radix UI 各包版本高度耦合，部分更新容易导致更多冲突
- shadcn 组件依赖特定版本范围的 Radix UI，单独升级某个包可能破坏组件
- 但全量更新后需要分阶段验证（开发环境 → 构建测试 → 手动测试 → staging → 生产）

**替代方案**：

- ❌ 逐个包更新：会导致长期的版本不一致和多轮 peer dependency 警告
- ❌ 完全自动化更新：风险太高，可能引入未预见的 breaking changes

**实施步骤**：

1. 使用 `pnpm outdated` 识别所有可更新的 Radix UI 包
2. 使用 `pnpm update "@radix-ui/*"` 统一更新到最新版本
3. 检查 `pnpm-lock.yaml` 确认无冲突
4. 运行 `pnpm build` 验证构建通过
5. 手动测试关键页面和组件

### 2. shadcn 组件重新生成策略：覆盖 vs 保留自定义

**决策**：**逐个组件审查 + 选择性覆盖**

**理由**：

- 部分组件可能包含项目特定的自定义（如 `shiny-button.jsx`、`scroll-based-velocity.jsx` 等非标准组件）
- 需要对比现有组件和最新模板的差异，避免丢失自定义逻辑
- 使用 `npx shadcn@latest diff` 可以预览变更

**替代方案**：

- ❌ 全部覆盖：会丢失自定义组件和修改
- ❌ 完全保留：无法获得最新模板的改进

**实施步骤**：

1. 备份当前 `src/components/ui/` 目录
2. 对每个组件运行 `npx shadcn@latest diff <component>`
3. 如果是标准组件（无自定义），运行 `npx shadcn@latest add <component> --overwrite`
4. 如果是自定义组件（如 `shiny-button`），手动合并更新
5. 使用 Git diff 验证每个组件的变更

### 3. 版本审计自动化：CLI 脚本 vs CI/CD 集成

**决策**：创建独立的 **Node.js 审计脚本 + package.json script**

**理由**：

- 快速可执行，不依赖 CI/CD 流程
- 可在本地开发时随时运行
- 输出清晰的版本报告和兼容性警告
- 为未来 CI/CD 集成预留接口

**替代方案**：

- ❌ 仅依赖 `pnpm outdated`：信息有限，无法检测 React 19 兼容性
- ❌ 直接集成到 CI/CD：初期开发迭代慢，调试困难

**脚本功能**：

```javascript
// scripts/audit-components.js
- 读取 package.json 依赖版本
- 对比 npm registry 最新版本
- 检查 React peerDependencies（是否支持 ^19.0.0）
- 输出 JSON/Markdown 报告
- 返回非零退出码（如有严重问题）
```

### 4. Breaking Changes 处理：主动升级 vs 延迟升级

**决策**：**主动应对已知 breaking changes**

**理由**：

- Radix UI 2.x 部分包引入了 breaking changes（如 `react-select@2.x` 的 API 调整）
- 及早处理比积累技术债务更好
- 可以在同一个 PR 中完成所有调整，保持原子性

**替代方案**：

- ❌ 固定旧版本：无法获得 React 19 兼容性和性能改进
- ❌ 延迟处理：可能导致后续更新困难

**处理流程**：

1. 查阅每个 Radix UI 包的 CHANGELOG 和 migration guide
2. 识别影响 shadcn 组件的 API 变更
3. 在重新生成组件时验证新 API
4. 使用 TypeScript 类型检查捕获 API 不兼容
5. 运行构建和测试确认无运行时错误

### 5. 依赖冲突解决策略：手动 resolutions vs 自动 overrides

**决策**：优先使用 **pnpm 的 `overrides`** 字段解决 peer dependency 冲突

**理由**：

- pnpm 原生支持 `overrides`，比 npm 的 `resolutions` 更强大
- 可以强制所有传递依赖使用特定版本
- 减少警告噪音，提升开发体验

**示例配置**：

```json
{
  "pnpm": {
    "overrides": {
      "react": "^19.0.0",
      "react-dom": "^19.0.0"
    }
  }
}
```

**风险**：过度使用 overrides 可能隐藏真实的兼容性问题，需要配合测试验证

## Risks / Trade-offs

### 1. Radix UI 新版本可能引入未发现的 Bug

**风险**：最新版本可能包含回归 bug 或未充分测试的功能

**缓解措施**：

- 先在开发分支验证，不直接合并到 main
- 分阶段部署（dev → staging → production）
- 保留回滚计划（Git revert + 重新部署旧版本）
- 监控生产环境错误日志（Vercel Analytics）

### 2. 组件重新生成可能覆盖自定义修改

**风险**：手动修改的组件可能被覆盖，导致功能丢失

**缓解措施**：

- 使用 `shadcn diff` 预览变更
- 仅覆盖标准组件，自定义组件手动合并
- 通过 Git diff 审查每个文件的变更
- 使用 Git stash 临时保存修改

### 3. Breaking Changes 导致大量页面需要修改

**风险**：如果 Radix UI 2.x 引入重大 API 变更，可能需要修改数十个使用组件的页面

**缓解措施**：

- 优先选择向后兼容的版本（如 `^1.x` → `^1.y`，而非跳到 `^2.x`）
- 使用 TypeScript 类型检查提前发现 API 不兼容
- 编写 codemod 脚本批量替换（如需要）
- 分阶段修复，优先处理高频使用的组件

### 4. 构建时间和包体积增加

**风险**：新版本依赖可能增加包体积或构建时间

**缓解措施**：

- 运行 `pnpm build` 对比构建产物大小
- 使用 `next/bundle-analyzer` 分析包体积变化
- 如果增幅超过 10%，考虑启用更激进的 tree-shaking
- 可选：延迟加载不常用的组件（使用 `next/dynamic`）

### 5. 测试覆盖不足导致未发现问题

**风险**：项目当前无自动化 UI 测试，可能遗漏回归问题

**缓解措施**：

- 手动测试关键用户流程（登录、评论、文章浏览）
- 创建测试清单（Checklist）覆盖所有使用的组件
- 在 staging 环境进行完整回归测试
- 考虑未来添加 Playwright E2E 测试（本次不实施）

## Migration Plan

### Phase 1: 准备和备份（10 分钟）

1. 创建新分支 `chore/update-shadcn-components`
2. 备份当前 `src/components/ui/` 到 `src/components/ui.backup/`
3. 提交备份以便回滚

### Phase 2: 依赖更新（15 分钟）

1. 运行审计脚本：`node scripts/audit-components.js`
2. 更新 Radix UI 依赖：`pnpm update "@radix-ui/*"`
3. 检查是否有 peer dependency 警告，按需添加 `overrides`
4. 验证 `pnpm-lock.yaml` 变更合理

### Phase 3: 组件重新生成（30 分钟）

1. 对每个标准 shadcn 组件运行 `npx shadcn@latest diff <component>`
2. 如果无自定义修改，运行 `npx shadcn@latest add <component> --overwrite`
3. 对自定义组件（如 `shiny-button`）手动合并更新
4. 使用 `git diff` 审查所有变更

### Phase 4: 验证和测试（30 分钟）

1. 运行 TypeScript 类型检查：`pnpm typecheck`
2. 运行构建：`pnpm build`
3. 启动开发服务器：`pnpm dev`
4. 手动测试清单：
   - [ ] 首页加载和导航
   - [ ] 文章列表和详情页
   - [ ] 评论系统（表单、对话框）
   - [ ] 搜索功能（输入框、下拉菜单）
   - [ ] 用户认证（登录、注册）
   - [ ] 主题切换（light/dark mode）
   - [ ] 响应式布局（移动端、桌面端）

### Phase 5: 部署和监控（1 小时）

1. 合并到 main 分支
2. 自动部署到 Vercel staging 环境
3. 在 staging 环境执行完整回归测试
4. 推送到 production
5. 监控 Vercel Analytics 和错误日志（前 24 小时）

### Rollback Plan

如果出现严重问题：

1. **立即回滚**：

   ```bash
   git revert <commit-hash>
   git push origin main
   ```

   Vercel 将自动部署上一个稳定版本

2. **临时降级依赖**（如果只是依赖问题）：

   ```bash
   pnpm install "@radix-ui/react-dialog@1.0.5" --save-exact
   pnpm install  # 更新 lockfile
   git commit -am "chore: rollback radix-ui to stable version"
   git push
   ```

3. **恢复备份组件**：
   ```bash
   rm -rf src/components/ui
   cp -r src/components/ui.backup src/components/ui
   git commit -am "chore: restore component backup"
   ```

## Open Questions

### Q1: 是否需要升级相关的第三方组件？

- `cmdk` (命令面板)、`sonner` (通知)、`vaul` (抽屉) 等也依赖 Radix UI
- **✅ 已决策**：需要升级。这些第三方组件与 Radix UI 紧密耦合，需要同步更新以避免版本冲突和运行时错误。将在 Phase 2 依赖更新阶段一并处理。

### Q2: 是否需要在 CI/CD 中集成版本审计？

- 当前没有自动化检查依赖版本的流程
- **✅ 已决策**：暂时不集成到 CI/CD。先完成本次更新，版本审计脚本作为本地开发工具使用。未来可以作为独立任务添加到 GitHub Actions workflow。

### Q3: 是否需要添加自动化 UI 测试？

- 当前依赖手动测试，覆盖率有限
- **✅ 已决策**：本次不添加。UI 测试是独立的基础设施工作，与组件更新解耦。本次更新完成后可以考虑引入 Playwright 作为后续改进。

### Q4: 如何处理 `.jsx` 和 `.tsx` 混用的情况？

- 当前 `src/components/ui/` 中部分组件是 `.jsx`（如 `accordion.jsx`、`badge.jsx`）
- **✅ 已决策**：统一为 `.tsx`。在重新生成组件时，将所有 `.jsx` 文件迁移到 `.tsx` 以提升类型安全和代码一致性。使用 shadcn CLI 默认生成 `.tsx` 格式。
