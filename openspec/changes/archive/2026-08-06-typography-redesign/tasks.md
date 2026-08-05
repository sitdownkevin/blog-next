## 1. Font loading and theme tokens

- [x] 1.1 Load Fraunces, Source Sans 3, Noto Serif SC, and JetBrains Mono in `src/app/layout.tsx` and attach CSS variables to the document
- [x] 1.2 Update `src/app/globals.css` `@theme` font tokens and add a `font-display` utility / base typography defaults

## 2. Component migration

- [x] 2.1 Migrate `personal-intro.tsx` off Anton/uppercase to `font-display` title case
- [x] 2.2 Migrate cover/post titles and `get_my_wx` (plus legacy `[slug]` title if present) to global display tokens
- [x] 2.3 Remove all component-level `next/font/google` imports for Anton/Inter/Noto

## 3. Type polish and verification

- [x] 3.1 Update Markdown CSS to use sans/mono theme fonts and ~1.7 line-height
- [x] 3.2 Light Header/Footer/resume weight and wrap polish
- [x] 3.3 Run `pnpm build` and spot-check home, posts list, and post detail in light/dark
