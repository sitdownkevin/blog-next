## ADDED Requirements

### Requirement: Centralized font loading
The application MUST load Fraunces, Source Sans 3, Noto Serif SC, and JetBrains Mono via `next/font` in the root layout and expose them as CSS variables on the document root.

#### Scenario: Root layout provides font variables
- **WHEN** any page renders
- **THEN** CSS variables for display, sans, serif, and mono fonts are available and body text uses the sans family by default

### Requirement: Theme font tokens
The design system MUST define Tailwind theme tokens `--font-sans`, `--font-display`, `--font-serif`, and `--font-mono` that map to the loaded font variables (not aliases of a single sans font).

#### Scenario: Utility classes resolve distinct families
- **WHEN** a component uses `font-sans`, `font-display`, `font-serif`, or `font-mono`
- **THEN** each utility resolves to its designated font stack

### Requirement: Display titles use editorial styling
Site display titles (personal name, section headings, post titles) MUST use the display font stack in title/sentence case without Anton-style uppercase wide tracking.

#### Scenario: Personal name heading
- **WHEN** a visitor views the home personal introduction
- **THEN** the name heading uses the display font with tight tracking and is not forced to uppercase

#### Scenario: Post title
- **WHEN** a visitor views a post list item or post detail title
- **THEN** the title uses the display font stack with Chinese fallback to Noto Serif SC

### Requirement: Markdown typography binds to theme fonts
Markdown article bodies MUST use the sans theme font for prose, the mono theme font for code, and an improved reading line-height of approximately 1.7.

#### Scenario: Article body and code
- **WHEN** a visitor reads a Markdown post containing prose and a code block
- **THEN** prose uses the sans stack at ~1.7 line-height and code uses the mono stack
