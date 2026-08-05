# tooltip

2026-08-06 · whole-project · engine / base-nova anatomy · migrated to `@base-ui/react`; typecheck clean.

## Changed

- `src/components/ui/tooltip.tsx` rewired from Radix to Base UI.
- Leftover scan: no `@radix-ui` in this file.

## Left alone

- Non-radix siblings (cmdk/vaul/sonner/calendar/chart) untouched.

## Behavior changes

- See `.migration/project.md` for shared deltas (asChild→render, data-open attributes, positioning model).

## Verify by hand

- Exercise tooltip open/close, keyboard, and focus return where applicable.
