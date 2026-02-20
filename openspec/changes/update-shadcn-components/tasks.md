## 1. 准备和环境设置

- [x] 1.1 创建新分支 `chore/update-shadcn-components`
- [x] 1.2 备份当前 `src/components/ui/` 目录到 `src/components/ui.backup/`
- [x] 1.3 提交备份到 Git（commit message: "chore: backup ui components before update"）
- [x] 1.4 在 package.json 添加新的 npm scripts：`"audit:components"` 和 `"resolve:conflicts"`

## 2. 创建版本审计脚本

- [x] 2.1 创建 `scripts/audit-components.js` 文件
- [x] 2.2 实现扫描 package.json 获取所有 @radix-ui/\* 包的功能
- [x] 2.3 实现扫描相关依赖（class-variance-authority、tailwind-merge、lucide-react、cmdk、sonner、vaul）
- [x] 2.4 实现查询 npm registry API 获取最新版本的功能
- [x] 2.5 实现网络错误处理（graceful fallback）
- [x] 2.6 实现检查 peerDependencies 验证 React 19 兼容性
- [x] 2.7 实现标记不兼容包（severity: HIGH/MEDIUM/LOW）
- [x] 2.8 实现生成 JSON 报告到 `scripts/audit-results.json`
- [x] 2.9 实现生成 Markdown 报告到 `scripts/audit-results.md`
- [x] 2.10 实现报告中的统计摘要（总包数、需更新数、兼容性问题数）
- [x] 2.11 实现生成 pnpm update 命令建议
- [x] 2.12 实现主版本更新警告（提示查看 CHANGELOG）
- [x] 2.13 实现按 severity 排序推荐
- [x] 2.14 实现终端颜色输出（红色=HIGH、黄色=MEDIUM、绿色=OK）
- [x] 2.15 实现退出码逻辑（0=正常、1=有严重问题）
- [x] 2.16 扫描 `src/components/ui/` 目录列出所有组件文件
- [x] 2.17 标记自定义组件（非标准 shadcn 组件）
- [x] 2.18 标记 .jsx 文件建议迁移到 .tsx

## 3. 测试版本审计脚本

- [x] 3.1 运行 `pnpm run audit:components` 验证脚本正常执行
- [x] 3.2 检查生成的 `scripts/audit-results.json` 格式正确
- [x] 3.3 检查生成的 `scripts/audit-results.md` 可读性
- [x] 3.4 验证 React 19 兼容性检查准确性
- [x] 3.5 验证终端输出颜色和格式正确
- [x] 3.6 提交审计脚本（commit message: "feat: add component version audit script"）

## 4. 创建依赖冲突解决脚本

- [x] 4.1 创建 `scripts/resolve-conflicts.js` 文件
- [x] 4.2 实现运行 `pnpm install` 并捕获 peer dependency 警告
- [x] 4.3 实现解析冲突信息（包名、版本范围、父包）
- [x] 4.4 实现生成 pnpm overrides 配置建议
- [x] 4.5 实现 `--dry-run` 模式（仅显示建议，不修改文件）
- [x] 4.6 实现自动应用模式（更新 package.json 并重新安装）
- [x] 4.7 实现为 overrides 添加注释说明理由
- [x] 4.8 实现验证解决方案（检查无警告 + 构建成功）
- [x] 4.9 提交冲突解决脚本（commit message: "feat: add peer dependency conflict resolution script"）

## 5. 更新依赖包

- [x] 5.1 在 package.json 添加 pnpm overrides 配置（react: "^19.0.0", react-dom: "^19.0.0"）
- [x] 5.2 运行 `pnpm update "@radix-ui/*"` 更新所有 Radix UI 包
- [x] 5.3 运行 `pnpm update class-variance-authority tailwind-merge lucide-react`
- [x] 5.4 运行 `pnpm update cmdk sonner vaul` 更新第三方组件依赖
- [x] 5.5 检查 pnpm install 输出，确认无严重 peer dependency 警告
- [x] 5.6 如有冲突，运行 `pnpm run resolve:conflicts --dry-run` 获取建议
- [x] 5.7 根据建议添加必要的 overrides 到 package.json
- [x] 5.8 运行 `pnpm install` 确认所有依赖安装成功
- [x] 5.9 验证 `pnpm-lock.yaml` 变更合理（使用 git diff 检查）
- [x] 5.10 运行 `pnpm list react` 确认所有包使用 React 19.x
- [x] 5.11 提交依赖更新（commit message: "chore: update radix-ui and related dependencies to latest versions"）

## 6. 重新生成 shadcn 组件 - 标准组件（第1批）

- [x] 6.1 列出所有需要重新生成的标准组件（排除自定义组件）
- [x] 6.2 运行 `npx shadcn@latest diff accordion` 检查变更
- [x] 6.3 运行 `npx shadcn@latest add accordion --overwrite`，删除旧的 accordion.jsx
- [x] 6.4 运行 `npx shadcn@latest diff alert-dialog` 并重新生成
- [x] 6.5 运行 `npx shadcn@latest diff alert` 并重新生成
- [x] 6.6 运行 `npx shadcn@latest diff aspect-ratio` 并重新生成
- [x] 6.7 运行 `npx shadcn@latest diff avatar` 并重新生成
- [x] 6.8 运行 `npx shadcn@latest diff badge` 并重新生成，删除旧的 badge.jsx
- [x] 6.9 运行 `npx shadcn@latest diff breadcrumb` 并重新生成
- [x] 6.10 运行 `npx shadcn@latest diff button` 并重新生成
- [x] 6.11 使用 `git diff` 检查前10个组件的变更合理性

## 7. 重新生成 shadcn 组件 - 标准组件（第2批）

- [ ] 7.1 运行 `npx shadcn@latest diff calendar` 并重新生成
- [ ] 7.2 运行 `npx shadcn@latest diff card` 并重新生成
- [ ] 7.3 运行 `npx shadcn@latest diff carousel` 并重新生成，删除旧的 carousel.jsx
- [ ] 7.4 运行 `npx shadcn@latest diff chart` 并重新生成
- [ ] 7.5 运行 `npx shadcn@latest diff checkbox` 并重新生成
- [ ] 7.6 运行 `npx shadcn@latest diff collapsible` 并重新生成，删除旧的 collapsible.jsx
- [ ] 7.7 运行 `npx shadcn@latest diff command` 并重新生成
- [ ] 7.8 运行 `npx shadcn@latest diff context-menu` 并重新生成
- [ ] 7.9 运行 `npx shadcn@latest diff dialog` 并重新生成
- [ ] 7.10 运行 `npx shadcn@latest diff drawer` 并重新生成
- [ ] 7.11 使用 `git diff` 检查这批组件的变更

## 8. 重新生成 shadcn 组件 - 标准组件（第3批）

- [ ] 8.1 运行 `npx shadcn@latest diff dropdown-menu` 并重新生成
- [ ] 8.2 运行 `npx shadcn@latest diff form` 并重新生成
- [ ] 8.3 运行 `npx shadcn@latest diff hover-card` 并重新生成
- [ ] 8.4 运行 `npx shadcn@latest diff input-otp` 并重新生成
- [ ] 8.5 运行 `npx shadcn@latest diff input` 并重新生成，删除旧的 input.jsx
- [ ] 8.6 运行 `npx shadcn@latest diff label` 并重新生成，删除旧的 label.jsx
- [ ] 8.7 运行 `npx shadcn@latest diff menubar` 并重新生成
- [ ] 8.8 运行 `npx shadcn@latest diff navigation-menu` 并重新生成，删除旧的 navigation-menu.jsx
- [ ] 8.9 运行 `npx shadcn@latest diff pagination` 并重新生成
- [ ] 8.10 运行 `npx shadcn@latest diff popover` 并重新生成，删除旧的 popover.jsx
- [ ] 8.11 使用 `git diff` 检查这批组件的变更

## 9. 重新生成 shadcn 组件 - 标准组件（第4批）

- [ ] 9.1 运行 `npx shadcn@latest diff progress` 并重新生成
- [ ] 9.2 运行 `npx shadcn@latest diff radio-group` 并重新生成
- [ ] 9.3 运行 `npx shadcn@latest diff resizable` 并重新生成
- [ ] 9.4 运行 `npx shadcn@latest diff scroll-area` 并重新生成
- [ ] 9.5 运行 `npx shadcn@latest diff select` 并重新生成
- [ ] 9.6 运行 `npx shadcn@latest diff separator` 并重新生成
- [ ] 9.7 运行 `npx shadcn@latest diff sheet` 并重新生成
- [ ] 9.8 运行 `npx shadcn@latest diff sidebar` 并重新生成
- [ ] 9.9 运行 `npx shadcn@latest diff skeleton` 并重新生成
- [ ] 9.10 运行 `npx shadcn@latest diff slider` 并重新生成
- [ ] 9.11 使用 `git diff` 检查这批组件的变更

## 10. 重新生成 shadcn 组件 - 标准组件（第5批）

- [ ] 10.1 运行 `npx shadcn@latest diff sonner` 并重新生成
- [ ] 10.2 运行 `npx shadcn@latest diff switch` 并重新生成
- [ ] 10.3 运行 `npx shadcn@latest diff table` 并重新生成
- [ ] 10.4 运行 `npx shadcn@latest diff tabs` 并重新生成
- [ ] 10.5 运行 `npx shadcn@latest diff textarea` 并重新生成
- [ ] 10.6 运行 `npx shadcn@latest diff toast/toaster` 并重新生成，删除旧的 toaster.jsx
- [x] 10.7 运行 `npx shadcn@latest diff toggle-group` 并重新生成
- [x] 10.8 运行 `npx shadcn@latest diff toggle` 并重新生成
- [x] 10.9 运行 `npx shadcn@latest diff tooltip` 并重新生成
- [x] 10.10 使用 `git diff` 检查这批组件的变更

## 11. 处理自定义组件

- [ ] 11.1 识别自定义组件列表（shiny-button.jsx, scroll-based-velocity.jsx, sparkles-text.jsx, typing-animation.jsx, word-fade-in.jsx）
- [ ] 11.2 手动检查 shiny-button.jsx，如有依赖 Radix UI 需手动更新
- [ ] 11.3 手动检查 scroll-based-velocity.jsx
- [ ] 11.4 手动检查 sparkles-text.jsx
- [ ] 11.5 手动检查 typing-animation.jsx
- [ ] 11.6 手动检查 word-fade-in.jsx
- [ ] 11.7 如果自定义组件是 .jsx，手动重命名为 .tsx 并更新类型定义
- [ ] 11.8 更新所有引用自定义组件的导入路径（如果扩展名改变）
- [ ] 11.9 提交所有组件更新（commit message: "chore: regenerate shadcn components and migrate to tsx"）

## 12. 类型检查和构建验证

- [ ] 12.1 运行 `pnpm typecheck` 检查 TypeScript 类型错误
- [ ] 12.2 如有类型错误，修复导入语句或类型定义
- [ ] 12.3 运行 `pnpm build` 执行生产构建
- [ ] 12.4 检查构建输出，确认无错误和警告
- [ ] 12.5 对比构建产物大小，记录是否有显著变化（超过10%需要分析）
- [ ] 12.6 如构建失败，检查错误日志并修复问题
- [ ] 12.7 提交修复（如有）：commit message: "fix: resolve type errors and build issues"

## 13. 开发环境测试

- [ ] 13.1 运行 `pnpm dev` 启动开发服务器
- [ ] 13.2 在浏览器打开 http://localhost:3000 检查首页加载
- [ ] 13.3 检查浏览器控制台，确认无 React 错误或警告
- [ ] 13.4 测试导航栏（所有链接点击正常）
- [ ] 13.5 测试文章列表页面（卡片渲染、分页、hover 效果）
- [ ] 13.6 测试文章详情页（markdown 渲染、代码高亮、目录导航）
- [ ] 13.7 测试评论系统（表单输入、对话框打开/关闭、提交功能）
- [ ] 13.8 测试搜索功能（输入框、下拉菜单、结果显示）
- [ ] 13.9 测试用户认证流程（登录、注册、登出）
- [ ] 13.10 测试主题切换（light/dark mode，所有组件样式正确）
- [ ] 13.11 测试响应式布局（移动端、平板、桌面端）
- [ ] 13.12 测试所有使用了 Dialog、Popover、Dropdown、Toast 的功能
- [ ] 13.13 记录所有发现的问题到临时清单

## 14. 修复测试中发现的问题

- [ ] 14.1 逐一修复步骤13中发现的问题
- [ ] 14.2 对每个修复重新测试相关功能
- [ ] 14.3 检查是否引入新的问题
- [ ] 14.4 提交修复（commit message: "fix: resolve component compatibility issues"）

## 15. 文档化依赖解决方案

- [ ] 15.1 创建 `docs/dependency-resolution.md` 文档
- [ ] 15.2 记录所有添加的 pnpm overrides 及其原因
- [ ] 15.3 记录 Radix UI 版本更新的主要变化
- [ ] 15.4 记录已知的兼容性问题和解决方案
- [ ] 15.5 记录第三方组件（cmdk、sonner、vaul）的更新情况
- [ ] 15.6 添加未来定期审查 overrides 的提醒
- [ ] 15.7 提交文档（commit message: "docs: add dependency resolution documentation"）

## 16. 最终验证和清理

- [ ] 16.1 再次运行 `pnpm run audit:components` 确认所有包已更新
- [ ] 16.2 运行 `pnpm typecheck` 确认无类型错误
- [ ] 16.3 运行 `pnpm build` 确认构建成功
- [ ] 16.4 运行 `pnpm format` 格式化所有修改的文件
- [ ] 16.5 运行 `pnpm lint` 检查代码规范
- [ ] 16.6 删除备份目录 `src/components/ui.backup/`
- [ ] 16.7 使用 `git status` 检查所有变更文件
- [ ] 16.8 使用 `git diff` 全面审查所有代码变更
- [ ] 16.9 确认 package.json、pnpm-lock.yaml、components.json 变更正确
- [ ] 16.10 整理所有 commit，如需要可以用 rebase 合并相关 commit

## 17. 创建 Pull Request

- [ ] 17.1 推送分支到远程仓库：`git push -u origin chore/update-shadcn-components`
- [ ] 17.2 在 GitHub 创建 Pull Request
- [ ] 17.3 PR 标题："chore: update shadcn/ui components and dependencies to latest versions"
- [ ] 17.4 PR 描述包含：变更摘要、更新的包列表、测试情况、Breaking Changes（如有）
- [ ] 17.5 添加 PR label：`dependencies`, `chore`
- [ ] 17.6 请求 code review（如适用）

## 18. Staging 环境测试

- [ ] 18.1 等待 Vercel 自动部署到 staging 环境
- [ ] 18.2 获取 staging 环境 URL
- [ ] 18.3 在 staging 环境重复步骤13的所有测试
- [ ] 18.4 测试生产构建的性能（页面加载速度、交互响应）
- [ ] 18.5 使用 Chrome DevTools Lighthouse 运行性能审计
- [ ] 18.6 在多个浏览器测试（Chrome、Firefox、Safari、Edge）
- [ ] 18.7 在真实移动设备测试（iOS Safari、Android Chrome）
- [ ] 18.8 确认所有测试通过，无严重问题

## 19. 生产部署

- [ ] 19.1 合并 PR 到 main 分支
- [ ] 19.2 等待 Vercel 自动部署到生产环境
- [ ] 19.3 在生产环境快速冒烟测试（首页、文章页、关键功能）
- [ ] 19.4 检查 Vercel Analytics 实时流量，确认无异常错误
- [ ] 19.5 监控错误日志（前30分钟密切关注）

## 20. 部署后监控

- [ ] 20.1 监控 Vercel Analytics（前24小时）
- [ ] 20.2 检查错误率是否有异常增加
- [ ] 20.3 检查页面加载性能是否有退化
- [ ] 20.4 关注用户反馈（如有反馈渠道）
- [ ] 20.5 如发现严重问题，立即执行回滚计划（git revert + 重新部署）
- [ ] 20.6 如一切正常，在 24 小时后标记任务完成
- [ ] 20.7 在团队通讯渠道宣布更新完成（如适用）
- [ ] 20.8 归档 openspec change：运行 `/opsx-archive update-shadcn-components`
