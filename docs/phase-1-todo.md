# Phase 1 TODO（工程化基线）

> 目标：先把“质量护栏”搭起来，再进入代码层重构。  
> 参考文档：`docs/engineering-architecture-spec.md`

## 使用说明

- 你每完成一项，就把 `- [ ]` 改成 `- [x]`。
- 我会按这个文件的顺序帮你修复。
- 建议先做 P0，再做 P1。

---

## P0：必须完成

### 1) 增加标准化脚本（package scripts）

- [ ] 在 `package.json` 增加以下脚本：
  - `lint`
  - `lint:fix`
  - `typecheck`
  - `format`
  - `format:check`
  - `test`（先占位，未接入测试框架时可临时回显）
  - `check`（聚合执行 lint + typecheck + test）

**完成标准**

- `pnpm run check` 能在本地执行完成。
- 脚本命名与行为语义清晰一致。

**验收命令**

- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run check`

---

### 2) 对齐 Next 与 ESLint 版本主线

- [ ] 将 `eslint-config-next` 主版本与 `next` 主版本对齐（当前 Next 16）。
- [ ] 确保安装后 lockfile 更新且可正常执行 lint/build。

**完成标准**

- `pnpm run lint` 可执行且无版本冲突报错。
- `pnpm run build` 可通过。

**验收命令**

- `pnpm run lint`
- `pnpm run build`

---

### 3) 新增 CI 工作流（PR + main）

- [ ] 新建 `.github/workflows/ci.yml`。
- [ ] 触发条件至少包含：
  - `pull_request`
  - `push` 到 `main`
- [ ] CI 步骤至少包含：
  - 安装 Node + pnpm
  - `pnpm install --frozen-lockfile`
  - `pnpm run lint`
  - `pnpm run typecheck`
  - `pnpm run test`
  - `pnpm run build`

**完成标准**

- 新开 PR 时自动触发 CI。
- CI 日志包含上述步骤并可复现本地检查。

---

## P1：建议在 Phase 1 同步完成

### 4) 收敛 TypeScript 配置（渐进式）

- [ ] 清理 `tsconfig.json` 中无关模板注释，保留必要选项。
- [ ] 先启用以下两项（若改动量可控）：
  - `noImplicitAny: true`
  - `strictNullChecks: true`
- [ ] 若一次性无法全量启用，建立“过渡策略”：
  - 暂不全局启用 strict
  - 对重点目录先落地（如 `src/app/api`, `src/lib`）

**完成标准**

- 至少形成“明确策略 + 可执行路径”，不是长期搁置。
- 不因配置调整导致主分支不可构建。

---

### 5) 建立最小测试占位策略

- [ ] 明确当前 `test` 脚本策略（二选一）：
  - A. 暂时 `echo "No tests configured yet"`（短期过渡）
  - B. 直接接入最小 Vitest（推荐）
- [ ] 在本文件记录最终选择，避免团队歧义。

**最终选择**

- [ ] A（过渡占位）
- [ ] B（最小 Vitest 接入）

**完成标准**

- `pnpm run test` 在本地与 CI 行为一致。

---

## 交付物检查清单

- [ ] `package.json` scripts 已补齐
- [ ] `pnpm-lock.yaml` 已更新
- [ ] `.github/workflows/ci.yml` 已创建
- [ ] `tsconfig.json` 已按策略调整
- [ ] 本文件勾选状态已更新为最新

---

## 我来修复时的执行顺序（给 AI）

1. 先改 `package.json` scripts  
2. 对齐 `eslint-config-next` 版本并安装依赖  
3. 新增 `ci.yml`  
4. 调整 `tsconfig.json`（按“渐进式”策略）  
5. 运行并修复 `lint/typecheck/build` 的阻塞问题  
6. 回填本 TODO 勾选状态与备注

