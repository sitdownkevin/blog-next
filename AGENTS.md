# Agent Guidelines for blog-next

This document provides essential information for AI coding agents working on this Next.js blog project.

## Project Overview

- **Framework**: Next.js 16.1.6 (App Router) with React 19
- **Language**: TypeScript 5.8.2 (strict mode disabled)
- **Package Manager**: **pnpm** (always use `pnpm` commands)
- **Styling**: Tailwind CSS 4.1.12 with shadcn/ui components
- **Authentication**: better-auth with MongoDB
- **Content**: Markdown-based blog posts with remark/rehype
- **Deployment**: Vercel

## Build & Development Commands

```bash
# Development
pnpm dev              # Start dev server (http://localhost:3000)

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Linting & Formatting (manual - not in package.json)
npx next lint         # Run ESLint via Next.js
npx prettier --check . # Check code formatting
npx prettier --write . # Format all files

# Type Checking
npx tsc --noEmit      # Check TypeScript types without emitting files
```

### Testing

**No testing framework is currently configured.** If tests need to be added:

- Consider Vitest or Jest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests

## Project Structure

```
blog-next/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── _components/        # Private app-level components (underscore prefix)
│   │   ├── [route]/            # Route folders
│   │   │   └── _components/    # Route-specific private components
│   │   ├── api/                # API routes (route.ts files)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Page components
│   │   └── globals.css         # Global styles + Tailwind
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components (DO NOT manually edit)
│   │   └── features/           # Feature-specific components
│   │       ├── auth/
│   │       ├── comment/
│   │       └── posts/
│   ├── lib/
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # Service layer (API calls, business logic)
│   │   ├── utils/              # Utility functions
│   │   └── types/              # TypeScript type definitions
│   ├── auth.ts                 # Server-side auth config
│   └── auth-client.ts          # Client-side auth
├── content/                    # Content directory
│   └── posts/                  # Markdown blog posts (.md files)
└── public/                     # Static assets
```

## Code Style Guidelines

### File Naming Conventions

- **Components**: kebab-case (e.g., `post-list.tsx`, `search-bar.tsx`)
- **Pages/Routes**: kebab-case folders (e.g., `posts/[postId]/page.tsx`)
- **Utilities**: kebab-case (e.g., `get-posts.ts`)
- **Private folders**: Underscore prefix (e.g., `_components/`)

### Component Naming

- **Components**: PascalCase (e.g., `export default function PostCard()`)
- **Types/Interfaces**: PascalCase, often with suffix (e.g., `JournalType`, `ButtonProps`)
- **Functions/Variables**: camelCase (e.g., `getMarkdownContent`, `isLoading`)

### Import Conventions

**Order**:

1. React imports
2. Third-party libraries
3. Internal components/utilities (using `@/` alias)
4. Types (can be inline with imports)
5. Styles (if any)

**Path Alias**: Always use `@/` for absolute imports from `src/`

```typescript
// Good
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Avoid relative imports when crossing module boundaries
import { Button } from "../../components/ui/button"; // Bad
```

### TypeScript Guidelines

- **Type Safety**: Project uses `strict: false` - types are encouraged but not enforced
- **Any Usage**: Acceptable in this codebase (though specific types are preferred)
- **Type Location**: Define types inline or in `lib/types/` directories
- **Exports**: Export types/interfaces separately when reused

```typescript
// Inline types for component props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline";
}

// Separate type files for domain models
// lib/types/post.ts
export type Post = {
  id: string;
  title: string;
  content: string;
};
```

### React & Next.js Patterns

**Server vs Client Components**:

- Default to Server Components (no `"use client"` directive)
- Add `"use client"` only when using hooks, event handlers, or browser APIs
- Keep client components small and focused

```typescript
// Server Component (default)
export default async function PostPage({ params }) {
  const post = await getPost(params.postId);
  return <Post post={post} />;
}

// Client Component (interactive)
"use client";
import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>Like ({likes})</button>;
}
```

**Metadata & SEO**:

- Export `metadata` object from page components
- Include OpenGraph and Twitter cards

```typescript
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
};
```

### Styling with Tailwind CSS

**Class Merging**: Use the `cn()` utility for conditional classes

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class",
  className // Allow prop override
)} />
```

**shadcn/ui Components**:

- Located in `src/components/ui/`
- **Do not manually edit** - use CLI to add/update: `npx shadcx@latest add [component]`
- Use `cva` (Class Variance Authority) for variants
- Use `React.forwardRef` for proper ref forwarding

### API Routes

- Located in `src/app/api/[route]/route.ts`
- Export named functions: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`
- Use `NextRequest` and `NextResponse`
- Handle errors with try-catch and return appropriate status codes

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const data = await fetchData(id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### Error Handling

- Use try-catch blocks for async operations
- Log errors with `console.error()`
- Return user-friendly error messages
- Use appropriate HTTP status codes in API routes

```typescript
try {
  await riskyOperation();
} catch (error) {
  console.error("Operation failed:", error);
  // Handle error appropriately
}
```

## Key Dependencies & Patterns

- **Forms**: react-hook-form with zod validation
- **UI Primitives**: Radix UI (@radix-ui/react-\*)
- **Styling**: clsx + tailwind-merge via `cn()` utility
- **Icons**: lucide-react
- **Date Handling**: date-fns
- **Animations**: framer-motion
- **Markdown**: gray-matter, remark, rehype
- **Database**: MongoDB with native driver

## Common Tasks

### Adding a New Page

1. Create `src/app/[route]/page.tsx`
2. Export metadata and default component
3. Add to navigation if needed

### Adding a New Component

1. Place in `src/components/features/[feature-name]/`
2. Use kebab-case for filename
3. Export with PascalCase name

### Adding shadcn/ui Component

```bash
npx shadcn@latest add [component-name]
```

## Best Practices

1. **Server-first**: Leverage Server Components for data fetching
2. **Type Safety**: Add types even though strict mode is off
3. **Accessibility**: Use semantic HTML and ARIA attributes
4. **Performance**: Use Next.js Image component, dynamic imports
5. **Code Organization**: Co-locate related files (components, hooks, utils)
6. **Comments**: Add comments in Chinese where they exist (this is a bilingual codebase)

## Environment Variables

Check `.env.example` for required environment variables. Never commit `.env.local`.

## Git Workflow

- Commit messages: Clear, descriptive, present tense
- Keep commits atomic and focused
- Test build before pushing: `pnpm build`
