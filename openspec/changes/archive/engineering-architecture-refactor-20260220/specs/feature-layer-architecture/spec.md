## ADDED Requirements

### Requirement: Feature-based directory structure

The system SHALL organize code into feature-based directories under `src/features/`.

#### Scenario: Feature directory structure

- **WHEN** organizing code for a business domain
- **THEN** code SHALL be placed in `src/features/<domain-name>/`
- **THEN** domain name uses kebab-case (e.g., `posts`, `comments`, `auth`)

#### Scenario: Feature subdirectories

- **WHEN** organizing code within a feature
- **THEN** feature directory SHALL contain standard subdirectories
- **THEN** subdirectories include: `components/`, `server/`, `types/`, `schemas/`

### Requirement: Shared utilities organization

The system SHALL organize cross-domain utilities under `src/shared/`.

#### Scenario: Shared directory structure

- **WHEN** organizing shared code
- **THEN** code SHALL be placed in appropriate `src/shared/` subdirectory
- **THEN** subdirectories include: `ui/`, `utils/`, `types/`, `hooks/`

#### Scenario: shadcn/ui components location

- **WHEN** using shadcn/ui components
- **THEN** components SHALL remain in `src/shared/ui/`
- **THEN** components SHALL NOT be moved to feature directories

### Requirement: Server infrastructure organization

The system SHALL organize server infrastructure under `src/server/`.

#### Scenario: Server directory structure

- **WHEN** organizing server-side infrastructure
- **THEN** code SHALL be placed in `src/server/`
- **THEN** subdirectories include: `db/`, `cache/`, `middleware/`

#### Scenario: Database access layer

- **WHEN** implementing database access
- **THEN** connection management SHALL be in `src/server/db/`
- **THEN** feature-specific queries MAY be in feature's `server/` directory

### Requirement: App directory as thin routing layer

The system SHALL use `src/app/` only for Next.js routing and page composition.

#### Scenario: Page component structure

- **WHEN** creating a Next.js page
- **THEN** page file SHALL only handle routing and layout
- **THEN** business logic and complex UI SHALL be delegated to feature components

#### Scenario: API route structure

- **WHEN** creating API routes
- **THEN** API route SHALL only handle HTTP protocol concerns
- **THEN** business logic SHALL be delegated to feature's `server/` directory

### Requirement: Feature component boundaries

The system SHALL keep feature-specific components within their feature directories.

#### Scenario: Posts feature components

- **WHEN** creating components for posts feature
- **THEN** components SHALL be in `src/features/posts/components/`
- **THEN** components SHALL NOT be in `src/app/_components/`

#### Scenario: Comments feature components

- **WHEN** creating components for comments feature
- **THEN** components SHALL be in `src/features/comments/components/`
- **THEN** components SHALL NOT be mixed with other feature components

### Requirement: Type definitions per feature

The system SHALL define feature-specific types within feature directories.

#### Scenario: Feature type definitions

- **WHEN** defining types for a feature
- **THEN** types SHALL be in `src/features/<feature>/types/`
- **THEN** types SHALL NOT be in shared locations unless used by multiple features

#### Scenario: Cross-feature types

- **WHEN** types are used by multiple features
- **THEN** types SHALL be in `src/shared/types/`
- **THEN** feature-specific types SHALL reference shared types as needed

### Requirement: Migration from existing structure

The system SHALL migrate components from `src/app/_components/` and `src/components/features/` to new structure.

#### Scenario: Migrating app-level components

- **WHEN** migrating components from `src/app/_components/`
- **THEN** identify which feature each component belongs to
- **THEN** move to appropriate `src/features/<feature>/components/`

#### Scenario: Migrating feature components

- **WHEN** migrating components from `src/components/features/`
- **THEN** move to corresponding `src/features/<feature>/components/`
- **THEN** update all import paths

### Requirement: Import path consistency

The system SHALL use `@/` path alias for absolute imports.

#### Scenario: Importing from features

- **WHEN** importing feature components or utilities
- **THEN** use `@/features/<feature>/...` path
- **THEN** avoid relative imports across feature boundaries

#### Scenario: Importing from shared

- **WHEN** importing shared utilities or components
- **THEN** use `@/shared/...` path
- **THEN** avoid relative imports

### Requirement: Feature independence

The system SHALL minimize direct dependencies between features.

#### Scenario: Feature communication

- **WHEN** one feature needs functionality from another
- **THEN** prefer using shared utilities or server layer
- **THEN** avoid direct imports from other feature directories

#### Scenario: Shared business logic

- **WHEN** business logic is used by multiple features
- **THEN** extract to `src/shared/utils/` or `src/server/`
- **THEN** both features import from shared location
