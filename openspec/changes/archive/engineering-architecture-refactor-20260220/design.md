## Context

The blog-next project is a Next.js 16 (App Router) application with TypeScript, Tailwind CSS, MongoDB, and better-auth. It serves markdown-based blog posts with authentication and commenting features. The current codebase works but lacks engineering rigor:

- No automated quality gates (CI/CD, linting, type checking, testing)
- Inconsistent code organization with overlapping component directories
- Duplicate type definitions across modules
- Database connections opened/closed per-request in API routes
- Client-side markdown processing causing performance issues
- Debug logs containing sensitive information in production code
- Mixed naming conventions (snake_case and kebab-case)

This design establishes a phased refactoring approach that maintains backward compatibility while modernizing the engineering foundation.

## Goals / Non-Goals

**Goals:**

- Establish automated quality gates (scripts + CI) to prevent regressions
- Create clear architectural boundaries between features, shared code, and server infrastructure
- Improve performance by moving data processing to server-side
- Standardize code patterns (naming, validation, error handling, logging)
- Make the codebase maintainable and scalable for future growth

**Non-Goals:**

- Visual redesign or UI changes
- New business features (only refactoring existing functionality)
- Complete TypeScript strict mode (gradual adoption to avoid breaking everything)
- Immediate 100% test coverage (establish framework and patterns first)

## Decisions

### 1. Phased Rollout Strategy

**Decision**: Execute refactor in 4 phases (Baseline → Stability → Layering → Standards) over 1-2 weeks

**Rationale**:

- Minimizes risk by isolating changes into testable increments
- Allows early validation of tooling before architectural changes
- Enables continuous deployment without long-lived branches

**Alternatives Considered**:

- Big-bang refactor: Rejected due to high risk and difficult code review
- Feature-flag approach: Overkill for internal refactoring without user-facing changes

### 2. Feature-Based Architecture

**Decision**: Adopt domain-driven structure with `src/features/`, `src/shared/`, `src/server/`

```
src/
├── features/           # Business domains
│   ├── posts/
│   │   ├── components/    # UI components
│   │   ├── server/        # Server-side logic
│   │   ├── types/         # Domain types
│   │   └── schemas/       # Zod validation
│   ├── comments/
│   ├── auth/
│   └── tools/
├── shared/            # Cross-domain utilities
│   ├── ui/           # shadcn/ui components
│   ├── utils/        # Helper functions
│   └── types/        # Common types
├── server/           # Infrastructure
│   ├── db/          # Database connections
│   └── cache/       # Caching layer
└── app/             # Next.js routes (thin layer)
```

**Rationale**:

- Clear ownership boundaries reduce coupling
- Features encapsulate related code (components, logic, types)
- Easier to understand, test, and maintain
- Aligns with team scaling (multiple developers can work on different features)

**Alternatives Considered**:

- Keep current structure: Rejected due to confusion between `app/_components` and `components/features`
- Monorepo with packages: Overkill for current project size

### 3. MongoDB Connection Management

**Decision**: Create singleton connection manager in `src/server/db/mongo.ts` using module-level caching

```typescript
// src/server/db/mongo.ts
let clientPromise: Promise<MongoClient>;

export async function getMongoClient(): Promise<MongoClient> {
  if (!clientPromise) {
    clientPromise = MongoClient.connect(process.env.MONGODB_URI!);
  }
  return clientPromise;
}
```

**Rationale**:

- Next.js serverless functions reuse warm instances, keeping connections alive
- Eliminates per-request connect/close overhead
- Prevents connection pool exhaustion under load
- Works well with Vercel deployment model

**Alternatives Considered**:

- Connection pooling library (e.g., generic-pool): Added complexity for marginal benefit
- Keep per-request pattern: Rejected due to performance and stability issues

### 4. Incremental TypeScript Strictness

**Decision**: Enable `noImplicitAny` and `strictNullChecks` first, defer full `strict: true`

**Rationale**:

- Catches most common type errors without overwhelming the refactor
- Can be enabled per-directory using `tsconfig` extends
- Avoids blocking progress on fixing hundreds of type errors at once

**Alternatives Considered**:

- Enable strict mode immediately: Too many errors to fix in one PR
- Stay with `strict: false`: Doesn't improve type safety

### 5. Server-Side Data Strategy

**Decision**: Migrate posts page to React Server Components (RSC) with unstable_cache

```typescript
// Before: Client-side fetch + processing
"use client"
const posts = await fetch('/api/posts/list')
// remark().processSync() on client

// After: Server-side with caching
import { unstable_cache } from 'next/cache'
const getPosts = unstable_cache(async () => { ... })
```

**Rationale**:

- Reduces client bundle size (no remark in browser)
- Faster initial page load (no network round-trip)
- Better SEO (content in initial HTML)
- Leverages Next.js built-in caching

**Alternatives Considered**:

- Keep client-side: Poor performance, especially on mobile
- Add separate caching layer (Redis): Overkill for current scale

### 6. Testing Framework Selection

**Decision**: Use Vitest for unit tests, defer E2E testing framework choice

**Rationale**:

- Fast, modern, ESM-native
- Great TypeScript support
- Compatible with Next.js App Router
- E2E can be added later (Playwright likely choice)

**Alternatives Considered**:

- Jest: Slower, requires more configuration for ESM
- No testing: Doesn't establish quality baseline

### 7. Route Migration Strategy

**Decision**: Rename snake_case routes to kebab-case with 301 redirects in middleware

```typescript
// middleware.ts
if (pathname === "/about/get_my_wx") {
  return NextResponse.redirect("/about/get-my-wx", 301);
}
```

**Rationale**:

- Maintains backward compatibility for external links
- SEO-friendly (301 passes PageRank)
- Can be removed after deprecation period

**Alternatives Considered**:

- Immediate breaking change: Risks breaking external links
- Keep both routes: Maintenance burden

### 8. Logging Strategy

**Decision**: Implement structured logging with environment-aware levels

```typescript
// src/shared/utils/logger.ts
const LOG_LEVEL = process.env.NODE_ENV === 'production' ? 'error' : 'info'

export const logger = {
  error: (message, context) => console.error(JSON.stringify({ level: 'error', message, ...context })),
  warn: (message, context) => { ... },
  info: (message, context) => { ... },
}
```

**Rationale**:

- Structured logs are parseable by log aggregators
- Production only logs errors (no sensitive debug info)
- Consistent format across codebase

**Alternatives Considered**:

- Third-party library (winston, pino): Added dependency for simple needs
- Remove all logging: Loses observability

## Risks / Trade-offs

**[Risk]** Strict TypeScript rules may reveal many existing type errors  
→ **Mitigation**: Enable gradually per-directory, fix in separate PRs

**[Risk]** Route renaming could break external links or bookmarks  
→ **Mitigation**: Use 301 redirects, communicate changes, monitor 404s

**[Risk]** Feature architecture migration may introduce bugs during file moves  
→ **Mitigation**: Move files incrementally, run build/tests after each batch, use git for easy rollback

**[Risk]** MongoDB connection singleton may not work correctly in all deployment environments  
→ **Mitigation**: Test on Vercel staging environment early, add connection health checks

**[Risk]** RSC migration may break existing client-side interactivity  
→ **Mitigation**: Identify interactive components, keep "use client" directive where needed

**[Trade-off]** Phased approach takes longer than big-bang refactor  
→ **Acceptable**: Lower risk and easier code review worth the extra time

**[Trade-off]** Not achieving full `strict: true` TypeScript mode  
→ **Acceptable**: Incremental improvement is better than no improvement, can enable fully later

## Migration Plan

### Phase 1: Engineering Baseline (Days 1-2)

1. Add scripts to `package.json` (lint, typecheck, format, test, check)
2. Create `.github/workflows/ci.yml` with quality gate checks
3. Upgrade `eslint-config-next` to match Next.js version
4. Update `tsconfig.json` with `noImplicitAny`, `strictNullChecks`
5. Run checks, fix critical errors
6. Validate CI passes on test PR

### Phase 2: Stability & Security (Days 3-5)

1. Create `src/server/db/mongo.ts` with connection manager
2. Refactor comments API routes to use centralized connection
3. Remove debug logs, implement structured logger
4. Add zod schemas for API validation
5. Test comment creation/deletion flows
6. Load test API endpoints

### Phase 3: Layering & Performance (Days 6-9)

1. Create new directory structure (`features/`, `shared/`, `server/`)
2. Move posts-related code to `features/posts/`
3. Consolidate duplicate type definitions
4. Refactor posts page to RSC with caching
5. Split `get_my_wx/page.tsx` into modules
6. Run Lighthouse/Web Vitals comparison
7. Update import paths throughout codebase

### Phase 4: Standards & Naming (Days 10-12)

1. Rename routes from snake_case to kebab-case
2. Add redirect middleware for old routes
3. Rename `resume/types.tsx` to `types.ts`
4. Establish naming conventions documentation
5. Final quality gate check
6. Deploy to production

### Rollback Strategy

- Each phase is a separate PR that can be reverted independently
- Keep feature flags for major changes (e.g., new architecture) if needed
- Database schema unchanged, so no data migrations required
- Monitor error rates and performance metrics post-deployment

## Open Questions

1. **Test Coverage Target**: What's the minimum test coverage for Phase 1? Suggest starting with critical paths (auth, comments API)

2. **Caching TTL**: What's appropriate cache duration for posts data? Suggest 5 minutes for development, longer for production

3. **Migration Timeline**: Should all 4 phases happen in one release or across multiple releases? Suggest multiple releases for safer rollout

4. **Type Consolidation**: For conflicting type definitions, which should be canonical? Suggest using the one with better documentation/usage

5. **Old Route Deprecation**: How long should 301 redirects remain before removing old routes entirely? Suggest 6 months minimum
