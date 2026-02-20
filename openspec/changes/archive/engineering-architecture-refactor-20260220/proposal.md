## Why

The blog-next project currently runs but lacks engineering foundations for long-term maintainability, scalability, and team collaboration. Without quality gates (CI, linting, type checking, tests), code organization standards, and proper architectural boundaries, the project faces high regression risk and increasing technical debt. This refactor establishes engineering best practices now, before the codebase grows further and problems compound.

## What Changes

- Add quality gate scripts (`lint`, `typecheck`, `test`, `format`, `check`) and CI workflow for automated validation
- Align dependency versions (Next.js 16.1.6 with eslint-config-next 16.x) and modernize TypeScript config
- Establish centralized MongoDB connection management to replace per-request connect/close pattern
- Remove debug logging from production code and implement structured logging strategy
- Add input validation (zod) and error handling standards for all API routes
- Restructure codebase into feature-oriented layers (`src/features/`, `src/shared/`, `src/server/`)
- Consolidate duplicate type definitions (posts, resume) into single-source-of-truth locations
- Refactor posts listing page to use server-side data fetching instead of client-side markdown processing
- Split large multi-responsibility files (e.g., `get_my_wx/page.tsx`) into focused modules
- Standardize file and route naming conventions to kebab-case across the project

## Capabilities

### New Capabilities

- `quality-gates`: Automated checks (lint, typecheck, test, format) with local scripts and CI workflow
- `db-connection-management`: Centralized MongoDB connection singleton/pool for stable resource management
- `api-validation`: Request validation and error handling standards using zod schemas
- `feature-layer-architecture`: Domain-driven folder structure separating features, shared utilities, and server logic
- `type-system-consolidation`: Unified type definitions per domain with single source of truth
- `server-side-data-strategy`: RSC-based data fetching with caching for posts and search
- `structured-logging`: Standardized logging levels (error/warn/info) without sensitive data exposure
- `naming-conventions`: Consistent kebab-case naming for files, routes, and components

### Modified Capabilities

_No existing capabilities are being modified - this is a foundational refactor establishing new standards._

## Impact

**Configuration Files**:

- `package.json` - new scripts (lint, typecheck, test, format, check)
- `tsconfig.json` - enable stricter rules (noImplicitAny, strictNullChecks)
- `.github/workflows/` - new CI workflow for PR and main branch checks
- Dependencies - upgrade eslint-config-next to match Next.js version

**Code Structure**:

- New directories: `src/features/`, `src/shared/`, `src/server/db/`
- Migration of components from `src/app/_components/` and `src/components/features/` into feature-based structure
- Type definitions moved from scattered locations to feature-specific `types/` directories

**API Routes**:

- `src/app/api/comments/route.ts` - use centralized DB connection, add validation, remove debug logs
- `src/app/api/comments/delete/route.ts` - same as above
- All API routes - add zod validation and standardized error responses

**Performance & Data Flow**:

- `src/app/posts/page.tsx` - migrate to server components with RSC data fetching
- `src/lib/posts/getMatterList.ts` - add caching layer
- `src/lib/advanced-search.ts` - add caching layer

**Large Files to Split**:

- `src/app/about/get_my_wx/page.tsx` (317 lines) - extract hooks, API client, components

**Naming Changes**:

- Routes: `get_my_wx` → `get-my-wx`, `gpt_4o_image_prompts` → `gpt-4o-image-prompts`, `advanced_search` → `advanced-search`
- Types: `src/lib/resume/types.tsx` → `src/lib/resume/types.ts`

**Breaking Changes**:

- None - route renaming will use 301 redirects to maintain backward compatibility
- Existing functionality preserved during refactor
