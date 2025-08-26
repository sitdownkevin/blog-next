# Project Context for Qwen Code

## Project Overview

- **Name**: k-space (Blog Next)
- **Description**: A personal website built with Next.js and Tailwind CSS.
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Key Features

- Blog with post listing and detailed views.
- Dark/light theme toggle.
- Responsive design with a hidden header on scroll.
- Search functionality for posts (client-side filtering with content snippets).
- RSS feed generation.
- Social media links in the header.
- Post metadata (title, tags, dates, pinning, hiding).
- Syntax highlighting for code blocks (using rehype-prism).
- Math rendering (using rehype-katex).

## Project Structure

- `src/app/`: Next.js app router pages.
- `src/components/`: Reusable React components.
- `src/lib/`: Utility functions and data fetching logic.
- `posts/`: Markdown files for blog posts.
- `public/`: Static assets.

## Important Dependencies

- `next`: The core framework.
- `react`, `react-dom`: UI library.
- `@libsql/client`: Database client (Turso).
- `gray-matter`: Parsing frontmatter from Markdown.
- `remark`, `remark-html`, `remark-*`, `rehype-*`: Markdown processing.
- `prismjs`, `rehype-prism`: Syntax highlighting.
- `katex`, `rehype-katex`: Math rendering.
- `lucide-react`, `react-icons`: Icons.
- `tailwindcss`: Utility-first CSS framework.
- `framer-motion`: Animation library.

## Environment Variables

- `TURSO_DATABASE_URL`: URL for the Turso database.
- `TURSO_AUTH_TOKEN`: Authentication token for the Turso database.

## Common Development Tasks

- **Start development server**: `yarn dev`
- **Build for production**: `yarn build`
- **Start production server**: `yarn start`
- **Linting**: `yarn lint` (configured via ESLint)
- **Code formatting**: `yarn format` (configured via Prettier)

## Code Style

- Follows AirBnb ESLint configuration with Prettier.
- Uses Tailwind CSS for styling.
- Uses functional components with TypeScript.
- Uses `clsx` or `tailwind-merge` for conditional class names.

## Data Management

- Blog posts are stored as Markdown files in the `posts/` directory.
- Post metadata is parsed using `gray-matter`.
- Content is processed using `remark` and `rehype` plugins.
- The client fetches post lists and content from the Next.js API routes (`/api/posts/*`).

## UI Components

- Uses Radix UI primitives for accessible UI components.
- Custom components are located in `src/components/`.
- Theming is handled by `next-themes` with a custom `ThemeProvider`.

## Deployment

- The site is built using `next build`.
- The built files are in the `.next/` directory.
- The production server is started using `next start`.

## Recent Dependency Updates

All dependencies have been updated to their latest versions as of 2025-08-26. This includes:

- Core framework updates: `next`, `react`, `react-dom`
- UI component library updates: `@radix-ui/*`, `lucide-react`, `react-icons`
- Markdown processing and syntax highlighting: `remark-*`, `rehype-*`, `prismjs`, `katex`
- Utility libraries: `framer-motion`, `axios`, `uuid`
- Development dependencies: `typescript`, `eslint`, `tailwindcss`, `postcss`