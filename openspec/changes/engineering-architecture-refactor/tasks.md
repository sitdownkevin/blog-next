## 1. Phase 1: Engineering Baseline

- [x] 1.1 Add `pnpm lint` script to package.json using Next.js lint
- [x] 1.2 Add `pnpm lint:fix` script for auto-fixing lint issues
- [x] 1.3 Add `pnpm typecheck` script running `tsc --noEmit`
- [x] 1.4 Add `pnpm format` script using Prettier
- [x] 1.5 Add `pnpm format:check` script to verify formatting
- [x] 1.6 Add `pnpm test` script (setup Vitest configuration)
- [x] 1.7 Add `pnpm check` script aggregating all quality checks
- [x] 1.8 Upgrade `eslint-config-next` to version 16.x to match Next.js
- [x] 1.9 Update `tsconfig.json` to enable `noImplicitAny`
- [x] 1.10 Update `tsconfig.json` to enable `strictNullChecks`
- [x] 1.11 Fix critical type errors revealed by new TypeScript settings
- [x] 1.12 Create `.github/workflows/ci.yml` workflow file
- [x] 1.13 Configure CI to run on pull requests and main branch
- [x] 1.14 Add CI jobs: install dependencies, lint, typecheck, test, build
- [ ] 1.15 Test CI workflow by opening a test PR

## 2. Phase 2: Database & Security

- [ ] 2.1 Create `src/server/db/` directory
- [ ] 2.2 Implement MongoDB connection manager in `src/server/db/mongo.ts`
- [ ] 2.3 Add `getMongoClient()` function with singleton pattern
- [ ] 2.4 Add `getDatabase(name)` helper function
- [ ] 2.5 Add `getCollection(dbName, collectionName)` helper function
- [ ] 2.6 Refactor `src/app/api/comments/route.ts` to use centralized connection
- [ ] 2.7 Refactor `src/app/api/comments/delete/route.ts` to use centralized connection
- [ ] 2.8 Remove all per-request `connect()` and `close()` calls from API routes
- [ ] 2.9 Create `src/shared/utils/logger.ts` with structured logging
- [ ] 2.10 Implement `error()`, `warn()`, `info()` log methods with JSON format
- [ ] 2.11 Add environment-aware log level filtering (production = error only)
- [ ] 2.12 Remove all `console.log` debug statements from comments API
- [ ] 2.13 Replace removed logs with appropriate logger calls
- [ ] 2.14 Create Zod schema for comment creation request in `src/features/comments/schemas/`
- [ ] 2.15 Create Zod schema for comment deletion request
- [ ] 2.16 Add request validation to comments POST endpoint
- [ ] 2.17 Add request validation to comments DELETE endpoint
- [ ] 2.18 Implement standardized error response format across API routes
- [ ] 2.19 Test comment creation and deletion flows manually
- [ ] 2.20 Verify database connection stability under load

## 3. Phase 3: Architecture & Performance

- [ ] 3.1 Create `src/features/` directory structure
- [ ] 3.2 Create `src/features/posts/` with subdirectories (components, server, types, schemas)
- [ ] 3.3 Create `src/features/comments/` with subdirectories
- [ ] 3.4 Create `src/features/auth/` with subdirectories
- [ ] 3.5 Create `src/features/tools/` with subdirectories
- [ ] 3.6 Create `src/shared/` directory structure (ui, utils, types, hooks)
- [ ] 3.7 Move shadcn/ui components from `src/components/ui/` to `src/shared/ui/`
- [ ] 3.8 Identify and consolidate duplicate post type definitions
- [ ] 3.9 Create unified post types in `src/features/posts/types/`
- [ ] 3.10 Delete `src/lib/types/post.ts` (duplicate type file)
- [ ] 3.11 Delete `src/lib/posts/types.ts` (duplicate type file)
- [ ] 3.12 Rename `src/lib/resume/types.tsx` to `src/lib/resume/types.ts`
- [ ] 3.13 Update all imports referencing old post type locations
- [ ] 3.14 Move post-related components to `src/features/posts/components/`
- [ ] 3.15 Move comment-related components to `src/features/comments/components/`
- [ ] 3.16 Update import paths for moved components throughout codebase
- [ ] 3.17 Refactor `src/app/posts/page.tsx` to remove "use client" directive
- [ ] 3.18 Implement server-side data fetching in posts page using async component
- [ ] 3.19 Add `unstable_cache` wrapper for `getMatterList` function
- [ ] 3.20 Add `unstable_cache` wrapper for `advanced-search` function
- [ ] 3.21 Remove client-side `remark().processSync()` calls from posts page
- [ ] 3.22 Move markdown processing to server-side utilities
- [ ] 3.23 Implement two-tier search: metadata filtering + lazy content loading
- [ ] 3.24 Extract algorithm logic from `get_my_wx/page.tsx` into custom hooks
- [ ] 3.25 Extract API client logic from `get_my_wx/page.tsx` into separate module
- [ ] 3.26 Extract UI components from `get_my_wx/page.tsx` into focused components
- [ ] 3.27 Run Lighthouse audit on posts page (baseline)
- [ ] 3.28 Run Lighthouse audit on posts page (after changes) and compare
- [ ] 3.29 Verify build succeeds with new structure
- [ ] 3.30 Fix any broken imports or missing files

## 4. Phase 4: Naming Standards

- [ ] 4.1 Create `middleware.ts` for route redirects
- [ ] 4.2 Add 301 redirect from `/about/get_my_wx` to `/about/get-my-wx`
- [ ] 4.3 Add 301 redirect from `/about/gpt_4o_image_prompts` to `/about/gpt-4o-image-prompts`
- [ ] 4.4 Add 301 redirects for any other snake_case routes
- [ ] 4.5 Rename `src/app/about/get_my_wx/` directory to `get-my-wx/`
- [ ] 4.6 Rename `src/app/about/gpt_4o_image_prompts/` directory to `gpt-4o-image-prompts/`
- [ ] 4.7 Rename any other snake_case route directories to kebab-case
- [ ] 4.8 Update internal links and navigation to use new kebab-case URLs
- [ ] 4.9 Test old URLs redirect correctly to new URLs
- [ ] 4.10 Audit all component file names for kebab-case consistency
- [ ] 4.11 Audit all utility file names for kebab-case consistency
- [ ] 4.12 Rename any non-compliant files to kebab-case
- [ ] 4.13 Update imports for renamed files
- [ ] 4.14 Update AGENTS.md with documented naming conventions
- [ ] 4.15 Add naming convention examples to documentation
- [ ] 4.16 Run full quality gate check (`pnpm check`)
- [ ] 4.17 Fix any remaining lint, type, or format issues
- [ ] 4.18 Verify all tests pass
- [ ] 4.19 Create deployment checklist
- [ ] 4.20 Deploy to staging/preview environment for validation

## 5. Verification & Cleanup

- [ ] 5.1 Verify all CI checks pass on main branch
- [ ] 5.2 Verify posts page load time improved (compare metrics)
- [ ] 5.3 Verify comment creation/deletion works correctly
- [ ] 5.4 Verify all redirects work for renamed routes
- [ ] 5.5 Check for any remaining TODO comments in refactored code
- [ ] 5.6 Check for any remaining @ts-ignore comments
- [ ] 5.7 Remove any unused import statements
- [ ] 5.8 Remove any empty directories from old structure
- [ ] 5.9 Update README if needed with new structure info
- [ ] 5.10 Document any open questions or future improvements
