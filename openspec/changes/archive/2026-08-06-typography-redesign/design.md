## Context

The site is a warm-beige academic personal blog (Next.js App Router, Tailwind v4 tokens in `globals.css`). Typography today loads Inter in the root layout and re-instantiates Anton + Noto Serif SC in multiple title components. `font-serif` / `font-mono` theme tokens incorrectly alias to Inter.

## Goals / Non-Goals

**Goals:**

- Ship a four-role font system: Fraunces (display), Source Sans 3 (sans), Noto Serif SC (serif/CJK), JetBrains Mono (mono)
- Load fonts once via `next/font` in the root layout and wire Tailwind `@theme` tokens
- Migrate titles off Anton uppercase styling to editorial title case with tight tracking
- Improve Markdown body line-height and code font binding

**Non-Goals:**

- Color palette or layout skeleton changes
- Icon library swaps
- Marketing-style bento / glass / island nav redesigns

## Decisions

1. **Fraunces + Source Sans 3 over keeping Anton** — Anton’s all-caps poster voice clashes with the academic resume tone; Fraunces gives warm editorial presence that fits the beige canvas.
2. **Centralize `next/font` in `layout.tsx`** — Avoid duplicate font downloads and inconsistent CSS variable application across routes.
3. **Display stack: Fraunces → Noto Serif SC** — Latin titles use Fraunces; Chinese titles fall back to Noto Serif SC in the same serif family.
4. **Keep accent colors / narrow column** — Typography-only change preserves brand recognition.

## Risks / Trade-offs

- [CJK font weight payload] → Load only needed Noto Serif SC weights (600/700)
- [Fraunces soft axis unsupported nuances] → Use weight range via `next/font`; skip exotic axes if unsupported
- [Visual regression on uppercase-dependent layouts] → Remove `uppercase` / wide tracking and re-check name + section headings at mobile/desktop breakpoints
