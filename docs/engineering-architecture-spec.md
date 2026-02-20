# blog-next 工程化架构优化 Spec

## 1. 目标与范围

本 Spec 面向当前 `blog-next` 项目，目标是将项目从“可运行”提升到“可维护、可扩展、可协作、可交付”的工程化状态。

覆盖范围：

- 项目基础工程能力（脚本、静态检查、测试、CI、配置一致性）
- 前后端分层与目录边界
- 数据获取与缓存策略
- 安全与稳定性基线
- 历史遗留问题识别与治理路线

不覆盖：

- 视觉重设计
- 业务功能扩展（仅在重构中保持行为兼容）

---

## 2. 现状快照

### 2.1 工程基线

- 仅有 `dev/build/start` 脚本，缺少 `lint/typecheck/test/format`。
- 未发现测试框架配置（如 Vitest/Jest/Playwright）与测试文件。
- 未发现 CI 工作流（`.github/workflows` 为空）。

### 2.2 配置一致性

- `next` 为 `16.1.6`，`eslint-config-next` 为 `15.1.5`，版本主线不一致。
- `tsconfig.json` 仍带大量模板注释与偏旧配置：
  - `strict: false`
  - `module: commonjs`
  - `moduleResolution: node`
  - `allowJs: true`

### 2.3 代码组织

- 同时存在 `src/app/**/_components` 与 `src/components/features/**` 两套组件组织，边界不清晰。
- 存在类型重复定义：
  - `src/lib/types/post.ts`（含 TODO）
  - `src/lib/posts/types.ts`
- `src/lib/resume/types.tsx` 仅定义类型，扩展名应为 `.ts`。
- 路由命名风格不统一，如 `get_my_wx`、`gpt_4o_image_prompts`、`advanced_search`。

### 2.4 数据与性能

- `src/app/posts/page.tsx` 客户端拉取 `/api/posts/list` 后在客户端做全文筛选，并对命中片段执行 `remark().processSync`，CPU 与首屏开销较高。
- `src/lib/posts/getMatterList.ts`、`src/lib/advanced-search.ts` 直接文件系统读取，无显式缓存层。
- 评论发布后通过整表重拉同步状态（`CommentSection`），网络开销偏高。

### 2.5 稳定性与安全

- 评论 API (`src/app/api/comments/route.ts`, `delete/route.ts`) 存在：
  - 请求级 `connect/close` 与模块级 client 混用（连接管理风险）
  - 大量调试日志（包含会话与用户信息）
- `src/lib/posts/markdownPipeline.ts` 启用 `allowDangerousHtml`，页面通过 `dangerouslySetInnerHTML` 渲染，需明确内容可信边界。
- 若未来内容来源扩展到用户输入，存在潜在 XSS 风险。

### 2.6 历史遗留信号

- `src/lib/types/post.ts` 内含 `TODO: For future reorganization`。
- `src/app/_components/personal-intro.tsx` 内使用 `@ts-ignore`。
- `src/app/about/get_my_wx/page.tsx` 单文件承担算法、请求、UI 三重职责，文件体量大（317 行）。
- `src/auth-client.ts` 配置为空对象，依赖隐式默认值。

---

## 3. 架构问题清单（按优先级）

### P0（必须优先）

1) **工程“护栏”缺失**
- 无统一检查入口与 CI，导致回归风险高，协作成本高。

2) **配置漂移**
- Next 与 ESLint 配置版本不一致；TS 规则不严格，问题易被掩盖到运行期。

3) **评论 API 连接与日志问题**
- 连接生命周期管理不规范、调试日志泄露风险，影响稳定性与安全性。

### P1（高优先）

4) **分层边界模糊**
- 页面私有组件、功能组件、数据访问逻辑混放，未来演进容易形成“牵一发而动全身”。

5) **类型系统碎片化**
- 领域类型重复定义并且命名不一致，容易出现“静态类型看似正确、运行语义不一致”。

6) **客户端重计算过多**
- `posts` 页在客户端进行 markdown 片段处理，影响交互性能与设备兼容性。

### P2（中优先）

7) **命名与规范不统一**
- 路由命名与文件风格混杂，影响可读性和搜索效率。

8) **历史大文件未拆分**
- 个别页面承担多重职责，不利于测试和复用。

---

## 4. 目标工程架构（To-Be）

建议采用“按领域 + 按层次”的结构：

- `src/features/*`
  - 聚合某一业务域（posts/comments/auth/tools）
  - 内部包含 `components`, `server`, `client`, `types`, `schema`
- `src/shared/*`
  - 跨域共享能力（ui、utils、config、types）
- `src/app/*`
  - 仅承担路由编排与页面组合，弱化业务细节
- `src/server/*`（可选）
  - 数据访问、第三方适配、缓存策略、鉴权策略

关键边界：

- 页面层不直接操作数据库与复杂数据转换；
- API Route 仅做协议适配，核心逻辑下沉到 `features/*/server`；
- 领域类型单一来源，不重复定义；
- 输入校验（zod）作为请求边界默认能力。

---

## 5. 分阶段改造计划

### Phase 1：工程基线（1-2 天）

- 新增脚本：
  - `lint`, `lint:fix`, `typecheck`, `test`, `format`, `check`（聚合检查）
- 对齐依赖主版本：
  - `eslint-config-next` 与 `next` 保持一致主版本
- 收敛 TS 配置（分步）：
  - 先开启 `noImplicitAny`, `strictNullChecks`（可分目录渐进）
- 增加 CI（PR + main）：
  - 安装依赖、类型检查、Lint、测试、构建

验收：
- 任意 PR 自动执行检查并输出结果；
- 本地一条命令可完成质量门禁。

### Phase 2：稳定性与安全（2-3 天）

- 抽离 Mongo 连接管理（单例/连接池）到 `src/server/db/mongo.ts`
- 移除生产调试日志，统一日志策略（error/warn/info 分级）
- 为评论 API 增加请求参数校验与错误码规范
- 为 markdown 渲染建立安全策略：
  - 明确内容来源可信模型；
  - 若非完全可信，引入 sanitize 白名单

验收：
- 评论 API 压测下连接数稳定；
- 日志不出现敏感会话信息；
- 参数异常返回一致。

### Phase 3：分层与性能（3-5 天）

- 重构 `posts` 列表页：
  - 迁移为服务端数据获取或 RSC + 缓存；
  - 将搜索策略分为“标题/标签即时筛选 + 内容按需加载”；
  - 避免在客户端对大文本做 `remark.processSync`
- 拆分大页面（如 `get_my_wx/page.tsx`）：
  - 算法 hooks、API client、展示组件分离
- 统一类型出口：
  - 合并 `post` 相关类型到单一目录

验收：
- posts 页首屏脚本与渲染时间下降（以 Lighthouse/Web Vitals 对比）；
- 大文件完成职责拆分并具备单测入口。

### Phase 4：规范化收口（持续）

- 路由与文件命名规范统一（建议 kebab-case）
- 引入架构约束文档与代码评审清单
- 为核心模块补齐单元测试与最小集成测试

---

## 6. 历史遗留问题台账（识别结果）

1) **类型重复与 TODO 遗留**
- `src/lib/types/post.ts` 与 `src/lib/posts/types.ts` 并存，语义重叠。

2) **客户端过重逻辑遗留**
- `src/app/posts/page.tsx` 在客户端进行 markdown 片段处理。

3) **调试代码未清理**
- 评论 API 中大量 `console.log` 调试输出。

4) **单文件职责过载**
- `src/app/about/get_my_wx/page.tsx` 混合算法、网络请求、UI。

5) **类型系统绕过**
- `src/app/_components/personal-intro.tsx` 使用 `@ts-ignore`。

6) **配置隐式依赖**
- `src/auth-client.ts` 未显式配置，依赖默认行为。

---

## 7. 建议的具体落地任务（可直接建 issue）

- [ ] 增加 `lint/typecheck/test/check` 脚本并接入 CI
- [ ] 对齐 Next 与 ESLint 版本主线
- [ ] 建立 `src/server/db/mongo.ts` 并改造 comments API 使用
- [ ] comments API 移除调试日志并加 zod 校验
- [ ] 合并 post 类型定义并删除遗留 TODO 文件
- [ ] `resume/types.tsx` 更名为 `resume/types.ts`
- [ ] 重构 `posts/page.tsx` 的数据与搜索策略
- [ ] 拆分 `about/get_my_wx/page.tsx` 为 `hooks + components + api-client`
- [ ] 建立命名规范并批量治理 snake_case 路由

---

## 8. 风险与回滚

- 风险：
  - 严格 TS 规则可能一次性暴露大量历史问题；
  - 路由重命名可能影响已有外链与 SEO。
- 缓解：
  - 严格规则分目录逐步开启；
  - 路由迁移期保留 301/重定向映射；
  - 大改造按 Feature Flag/分支分期交付。

---

## 9. 完成定义（Definition of Done）

当满足以下条件，可认为工程化改造达标：

- 代码提交前后有一致质量门禁（本地 + CI）
- 核心链路（posts/comments/auth）具备清晰分层与统一类型边界
- 关键 API 具备输入校验、稳定连接管理与错误规范
- 历史遗留项有明确“已治理/延期治理”状态，不再隐式积压

