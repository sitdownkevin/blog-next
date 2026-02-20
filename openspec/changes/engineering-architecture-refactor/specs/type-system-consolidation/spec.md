## ADDED Requirements

### Requirement: Single source of truth for domain types

The system SHALL define each domain type in exactly one canonical location.

#### Scenario: Post type definition

- **WHEN** defining types for posts domain
- **THEN** types SHALL be defined in `src/features/posts/types/`
- **THEN** no duplicate definitions SHALL exist in other locations

#### Scenario: Comment type definition

- **WHEN** defining types for comments domain
- **THEN** types SHALL be defined in `src/features/comments/types/`
- **THEN** no duplicate definitions SHALL exist in other locations

### Requirement: Consolidate duplicate post types

The system SHALL merge duplicate post type definitions into single canonical definition.

#### Scenario: Merging post type files

- **WHEN** consolidating post types
- **THEN** merge content from `src/lib/types/post.ts` and `src/lib/posts/types.ts`
- **THEN** create unified types in `src/features/posts/types/`
- **THEN** delete old type definition files

#### Scenario: Resolving conflicting definitions

- **WHEN** duplicate types have conflicting definitions
- **THEN** choose the most complete and well-documented version
- **THEN** ensure all usage sites are compatible with chosen definition

### Requirement: Type naming consistency

The system SHALL use consistent naming conventions for types across all domains.

#### Scenario: Type naming pattern

- **WHEN** defining domain types
- **THEN** use descriptive PascalCase names (e.g., `Post`, `Comment`, `User`)
- **THEN** avoid generic suffixes like `Type` unless necessary for clarity

#### Scenario: Props type naming

- **WHEN** defining component props types
- **THEN** use `<ComponentName>Props` pattern
- **THEN** co-locate with component or in feature types directory

### Requirement: Correct file extensions for type files

The system SHALL use `.ts` extension for files containing only types and interfaces.

#### Scenario: Type-only files

- **WHEN** file contains only type definitions and interfaces
- **THEN** file extension MUST be `.ts`
- **THEN** file extension MUST NOT be `.tsx`

#### Scenario: Fixing resume types extension

- **WHEN** migrating `src/lib/resume/types.tsx`
- **THEN** rename to `src/lib/resume/types.ts`
- **THEN** verify no JSX content exists in file

### Requirement: Type export consistency

The system SHALL export types using named exports for discoverability.

#### Scenario: Exporting domain types

- **WHEN** exporting types from a type definition file
- **THEN** use `export type` or `export interface`
- **THEN** avoid default exports for types

#### Scenario: Re-exporting types

- **WHEN** creating an index file for types
- **THEN** re-export all types from subdirectories
- **THEN** use `export type { ... } from './...'` syntax

### Requirement: Import path updates

The system SHALL update all import statements to reference consolidated type locations.

#### Scenario: Updating post type imports

- **WHEN** code imports post types
- **THEN** imports SHALL reference `@/features/posts/types`
- **THEN** imports SHALL NOT reference old locations (`src/lib/types/post.ts` or `src/lib/posts/types.ts`)

#### Scenario: Automated import updates

- **WHEN** moving type definitions
- **THEN** use find-and-replace or refactoring tools to update imports
- **THEN** verify no broken imports remain after migration

### Requirement: Remove obsolete type files

The system SHALL delete type definition files after successful migration.

#### Scenario: Cleaning up old type files

- **WHEN** all imports have been updated to new locations
- **THEN** delete `src/lib/types/post.ts`
- **THEN** delete `src/lib/posts/types.ts`
- **THEN** verify build succeeds after deletion

### Requirement: Type documentation

The system SHALL document complex types with JSDoc comments.

#### Scenario: Documenting type fields

- **WHEN** defining types with non-obvious fields
- **THEN** add JSDoc comments explaining field purpose
- **THEN** include examples where helpful

#### Scenario: Documenting type relationships

- **WHEN** types reference other types
- **THEN** document the relationship in comments
- **THEN** explain any constraints or validation rules

### Requirement: Avoid implicit any types

The system SHALL explicitly type all exported values and function parameters.

#### Scenario: Type annotations on exports

- **WHEN** exporting functions or values
- **THEN** include explicit type annotations
- **THEN** avoid relying on type inference for public APIs

#### Scenario: Type annotations in feature code

- **WHEN** writing feature-specific code
- **THEN** add type annotations to function parameters and return values
- **THEN** let TypeScript infer types only for local variables when obvious
