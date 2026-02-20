## ADDED Requirements

### Requirement: Kebab-case for all files

The system SHALL use kebab-case naming for all file names in the codebase.

#### Scenario: Component file naming

- **WHEN** creating new component files
- **THEN** file names SHALL use kebab-case (e.g., `post-card.tsx`, `search-bar.tsx`)
- **THEN** file names SHALL NOT use PascalCase, camelCase, or snake_case

#### Scenario: Utility file naming

- **WHEN** creating utility and helper files
- **THEN** file names SHALL use kebab-case (e.g., `get-posts.ts`, `format-date.ts`)
- **THEN** file names SHALL match the primary export function/utility

### Requirement: Kebab-case for all routes

The system SHALL use kebab-case naming for all route directories and segments.

#### Scenario: Route directory naming

- **WHEN** creating new routes in `src/app/`
- **THEN** directory names SHALL use kebab-case
- **THEN** directory names SHALL NOT use snake_case or camelCase

#### Scenario: Dynamic route naming

- **WHEN** creating dynamic route segments
- **THEN** parameter names SHALL use kebab-case within brackets (e.g., `[post-id]`)
- **THEN** parameter names SHALL be descriptive and hyphenated

### Requirement: Rename snake_case routes to kebab-case

The system SHALL rename all existing snake_case routes to kebab-case format.

#### Scenario: Rename get_my_wx route

- **WHEN** migrating `src/app/about/get_my_wx/`
- **THEN** rename directory to `src/app/about/get-my-wx/`
- **THEN** add redirect from old URL to new URL

#### Scenario: Rename gpt_4o_image_prompts route

- **WHEN** migrating `src/app/about/gpt_4o_image_prompts/`
- **THEN** rename directory to `src/app/about/gpt-4o-image-prompts/`
- **THEN** add redirect from old URL to new URL

#### Scenario: Rename advanced_search route

- **WHEN** migrating any `advanced_search` routes
- **THEN** rename to `advanced-search`
- **THEN** add redirect from old URL to new URL

### Requirement: 301 redirects for renamed routes

The system SHALL implement 301 permanent redirects for all renamed routes.

#### Scenario: Redirect middleware implementation

- **WHEN** implementing route redirects
- **THEN** redirects SHALL be in Next.js middleware
- **THEN** redirects SHALL use 301 status code for SEO

#### Scenario: Old route access

- **WHEN** user accesses old snake_case URL
- **THEN** system SHALL redirect to new kebab-case URL
- **THEN** redirect SHALL preserve query parameters

### Requirement: PascalCase for component exports

The system SHALL use PascalCase for React component names in exports.

#### Scenario: Component export naming

- **WHEN** exporting React components
- **THEN** component name SHALL be PascalCase (e.g., `PostCard`, `SearchBar`)
- **THEN** file name SHALL be kebab-case version (e.g., `post-card.tsx`)

#### Scenario: Component consistency

- **WHEN** component file is `post-card.tsx`
- **THEN** default export SHALL be `function PostCard()` or `const PostCard`
- **THEN** naming SHALL be consistent between file and export

### Requirement: camelCase for functions and variables

The system SHALL use camelCase for function names and variables.

#### Scenario: Function naming

- **WHEN** defining functions
- **THEN** function names SHALL use camelCase (e.g., `getMarkdownContent`, `formatDate`)
- **THEN** function names SHALL be descriptive and verb-based

#### Scenario: Variable naming

- **WHEN** defining variables
- **THEN** variable names SHALL use camelCase (e.g., `postData`, `isLoading`)
- **THEN** variable names SHALL be descriptive and noun-based

### Requirement: Consistent naming across similar entities

The system SHALL use consistent naming patterns for related entities.

#### Scenario: API route naming consistency

- **WHEN** creating API routes
- **THEN** route paths SHALL match the resource they represent
- **THEN** naming SHALL be consistent with feature names (e.g., `/api/posts`, `/api/comments`)

#### Scenario: Type naming consistency

- **WHEN** defining types
- **THEN** related types SHALL follow similar naming patterns
- **THEN** use descriptive suffixes where needed (e.g., `PostData`, `PostMeta`, `PostListItem`)

### Requirement: Update import statements after renames

The system SHALL update all import statements to reflect renamed files and directories.

#### Scenario: Component import updates

- **WHEN** renaming component files
- **THEN** all imports of renamed components SHALL be updated
- **THEN** no broken imports SHALL remain

#### Scenario: Route import updates

- **WHEN** renaming route directories
- **THEN** all internal links and imports SHALL be updated
- **THEN** build SHALL succeed without errors

### Requirement: Documentation of naming conventions

The system SHALL document naming conventions for future development.

#### Scenario: Naming guidelines

- **WHEN** adding new code
- **THEN** developers SHALL follow documented naming conventions
- **THEN** conventions SHALL be enforced through code review

#### Scenario: Convention reference

- **WHEN** uncertain about naming
- **THEN** developers SHALL reference AGENTS.md or project documentation
- **THEN** documentation SHALL include examples of each naming pattern
