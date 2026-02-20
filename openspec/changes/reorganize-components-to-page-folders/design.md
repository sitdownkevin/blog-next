## Context

当前项目采用 Next.js App Router 架构，组件分为两类：

1. **shadcn/ui 组件**：位于 `src/components/ui/`，通过 CLI 管理，不应手动编辑
2. **Feature 组件**：位于 `src/components/features/`，按功能域组织（auth、comment、posts、resume、tools）

项目的既定组织风格是每个页面下都有 `_components/` 目录（带下划线前缀表示私有），组件与使用它们的页面紧密耦合。然而，当前的 feature 组件集中存放，与项目风格不一致。

**现状分析**：

- 共 ~20 个组件文件分布在 5 个 feature 目录下
- 仅 8 处文件导入这些组件（低复用率）
- 所有组件都是页面专用的，没有跨页面共享

**约束条件**：

- 使用 TypeScript（strict: false）
- 使用 `@/` 作为 `src/` 的路径别名
- 必须保持 UI 渲染和功能完全一致
- 不能修改 `src/components/ui/` 下的 shadcn/ui 组件

## Goals / Non-Goals

**Goals:**

- 将所有 feature 组件移动到对应页面的 `_components/` 目录
- 自动更新所有导入路径，确保编译通过
- 清理空的 `features/` 目录
- 验证所有页面渲染正常

**Non-Goals:**

- 不修改组件的功能或样式
- 不重构组件内部实现
- 不改变组件的 API 或 props
- 不迁移 `src/components/ui/` 下的组件

## Decisions

### Decision 1: 使用手动迁移而非自动化脚本

**选择**：手动移动文件并更新导入路径

**备选方案**：

- 编写 Node.js 脚本自动移动文件和更新导入
- 使用 AST 工具（如 jscodeshift）进行代码转换

**理由**：

- 组件数量少（~20 个），导入点少（8 处），手动操作更可控
- 手动操作可以仔细检查每个组件的使用上下文
- 避免自动化脚本可能引入的边界情况错误
- 无需引入额外的工具依赖

### Decision 2: 按功能域分批次迁移

**选择**：按 auth → comment → posts → resume → tools 的顺序依次迁移

**备选方案**：

- 一次性迁移所有组件
- 按页面路由分批（先 app 级，再工具页面，再内容页面）

**理由**：

- 功能域内的组件关联性强，一起迁移更容易追踪
- 每个功能域的影响范围独立，便于验证
- 如果出现问题，可以快速定位到某个功能域
- 与现有目录结构对应，减少心智负担

### Decision 3: Auth 组件放在 `src/app/_components/`（应用级）

**选择**：将 auth 组件（SignIn、SignOut、Profile）放在 `src/app/_components/`

**备选方案**：

- 放在 `src/app/auth/_components/`（如果有 auth 路由）
- 保持在 `src/components/features/auth/`

**理由**：

- Auth 组件是全局 UI，可能在多个页面使用（如导航栏）
- `src/app/_components/` 是应用级私有组件的合适位置
- 遵循 Next.js App Router 的约定（`_` 前缀表示私有）

### Decision 4: Posts/Comment 组件根据实际使用场景决定位置

**选择**：

- `Comment.tsx` → `src/app/posts/[postId]/_components/`（文章详情页用）
- Comment 相关组件 → `src/app/tools/comment/_components/`（评论工具页用）

**备选方案**：

- 都放在 `src/app/posts/_components/`
- 创建共享的 comment 组件库

**理由**：

- 检查导入发现 `Comment.tsx` 在文章详情页和 comment 工具页使用
- 根据主要使用场景放置（文章评论是主要场景）
- Comment 工具页的组件（Container、CommentSection）独立于文章系统

### Decision 5: 使用 Git 进行原子性提交

**选择**：每完成一个功能域的迁移就提交一次

**备选方案**：

- 一次性提交所有更改
- 每移动一个文件就提交一次

**理由**：

- 功能域级别的提交粒度适中
- 便于 code review 和回滚
- 提交信息清晰（如 "migrate auth components"）
- 可以在每次提交前验证构建

## Risks / Trade-offs

### Risk 1: 导入路径更新遗漏

**风险**：手动更新导入路径时可能遗漏某些文件

**缓解措施**：

- 使用 `grep -r "@/components/features" src/` 搜索所有导入
- 每次迁移后运行 `pnpm build` 检查编译错误
- 使用 TypeScript 类型检查（`npx tsc --noEmit`）
- 在浏览器中手动测试所有受影响的页面

### Risk 2: 相对导入路径问题

**风险**：组件内部可能有相对导入（如 `./utils`），移动后路径失效

**缓解措施**：

- 优先检查每个组件的内部导入
- 项目已使用 `@/` 别名，大部分导入是绝对路径
- 如果有相对导入，一并调整

### Risk 3: 运行时导入（动态导入）

**风险**：可能存在 `import()` 或 `require()` 动态导入未被搜索到

**缓解措施**：

- 搜索模式包含 `"@/components/features"` 和 `'@/components/features'`
- 检查所有 `.ts` 和 `.tsx` 文件
- 运行时测试所有页面的交互功能

### Risk 4: IDE/编辑器缓存

**风险**：IDE 可能缓存旧的导入路径，导致开发时混淆

**缓解措施**：

- 迁移完成后重启 TypeScript 服务器
- 清除 `.next` 缓存目录
- 提醒团队成员重启编辑器

## Trade-offs

### 代码定位 vs. 复用性

**Trade-off**：将组件移到页面目录下提高了定位性，但降低了未来可能的复用机会

**接受理由**：

- 当前组件复用率极低（仅 8 处导入）
- 如果未来需要复用，可以再移到 `src/components/shared/`
- 优先优化当前的可维护性而非假设的未来需求

### 手动操作 vs. 自动化

**Trade-off**：手动操作花费更多时间，但减少了自动化脚本的复杂度和潜在错误

**接受理由**：

- 这是一次性操作，不需要重复执行
- 投入编写和调试脚本的时间可能超过手动操作
- 手动操作提供了清理代码的机会

## Migration Plan

### Phase 1: 准备工作

1. 运行 `pnpm build` 确认当前构建正常
2. 运行 `git status` 确保工作区干净
3. 创建功能分支 `git checkout -b refactor/reorganize-components`

### Phase 2: 迁移执行（按功能域）

**2.1 Auth 组件**

- 创建 `src/app/_components/` 目录（如不存在）
- 移动 `SignIn.tsx`、`SignOut.tsx`、`Profile.tsx`
- 更新导入路径（全局搜索 `@/components/features/auth`）
- 测试构建：`pnpm build`
- 提交：`git add . && git commit -m "refactor: migrate auth components to app/_components"`

**2.2 Comment 组件**

- 创建 `src/app/tools/comment/_components/`
- 移动 `Auth.tsx`、`Container.tsx`、`CommentSection.tsx`
- 更新 `src/app/posts/[postId]/page.tsx` 中的导入
- 测试构建和 comment 工具页面
- 提交：`git add . && git commit -m "refactor: migrate comment components to tools/comment/_components"`

**2.3 Posts 组件**

- 创建 `src/app/posts/[postId]/_components/`（如不存在）
- 移动 `Comment.tsx`
- 更新 `src/app/tools/comment/page.tsx` 和其他导入
- 测试构建和文章详情页
- 提交：`git add . && git commit -m "refactor: migrate posts components to posts/_components"`

**2.4 Resume 组件**

- 创建 `src/app/about/resume/_components/`
- 移动所有 resume 组件（7 个文件）
- 更新 `src/app/about/resume/page.tsx` 中的导入
- 测试构建和 resume 页面
- 提交：`git add . && git commit -m "refactor: migrate resume components to about/resume/_components"`

**2.5 Tools - Advanced Search**

- 创建 `src/app/tools/advanced_search/_components/`
- 移动所有 advanced-search 组件（5 个文件）
- 更新 `src/app/tools/advanced_search/` 下的导入
- 测试构建和 advanced search 功能
- 提交：`git add . && git commit -m "refactor: migrate advanced-search components to tools/advanced_search/_components"`

**2.6 Tools - GPT-4o Image Prompts**

- 创建 `src/app/tools/gpt_4o_image_prompts/_components/`
- 移动 `Box.tsx`
- 更新 `src/app/tools/gpt_4o_image_prompts/page.tsx` 中的导入
- 测试构建和 GPT-4o 工具页面
- 提交：`git add . && git commit -m "refactor: migrate gpt-4o-image-prompts components to tools/gpt_4o_image_prompts/_components"`

### Phase 3: 清理

1. 确认 `src/components/features/` 目录为空
2. 删除整个 `src/components/features/` 目录
3. 运行 `pnpm build` 最终验证
4. 提交：`git add . && git commit -m "refactor: remove empty features directory"`

### Phase 4: 验证

1. 运行 `pnpm dev` 启动开发服务器
2. 手动测试所有受影响的页面：
   - 首页（auth 组件）
   - `/posts/[postId]`（Comment 组件）
   - `/tools/comment`（comment 组件）
   - `/about/resume`（resume 组件）
   - `/tools/advanced_search`（advanced search 组件）
   - `/tools/gpt_4o_image_prompts`（Box 组件）
3. 确认所有页面渲染和交互正常

### Phase 5: 合并

1. 推送分支：`git push origin refactor/reorganize-components`
2. 创建 Pull Request 并请求 review
3. 合并到主分支

### Rollback Strategy

如果发现问题：

- **单个功能域问题**：使用 `git revert <commit-hash>` 回滚该功能域的提交
- **整体问题**：使用 `git revert <commit-range>` 回滚所有迁移提交
- **紧急情况**：切换回迁移前的分支

## Open Questions

None - 迁移路径明确，所有组件的目标位置已确定。
