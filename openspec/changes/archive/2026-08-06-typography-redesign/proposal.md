## Why

The current typography stack (Anton display + Inter body) feels poster-like and generic for an academic personal site. A cohesive editorial font system will improve readability and brand presence without changing the warm-beige layout language.

## What Changes

- Replace Inter with Source Sans 3 as the global UI/body sans
- Replace Anton with Fraunces as the display title face
- Keep Noto Serif SC as Chinese/serif fallback; introduce JetBrains Mono for code
- Centralize all `next/font` loading in the root layout and expose CSS theme tokens
- Retire uppercase / wide-tracking title styles tied to Anton
- Polish type scale, line-height, and Markdown body typography

## Capabilities

### New Capabilities

- `site-typography`: Font roles (display/sans/serif/mono), loading, theme tokens, and title/body usage across the site

### Modified Capabilities

- (none)

## Impact

- `src/app/layout.tsx`, `src/app/globals.css`
- Title components: personal intro, cover title, post title, get_my_wx
- `src/app/posts/[postId]/markdown.css`
- No API or dependency package changes (Google fonts via `next/font`)
