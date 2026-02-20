## ADDED Requirements

### Requirement: Component files SHALL be moved to page-specific directories

The system SHALL move all component files from `src/components/features/` to their corresponding page-specific `_components/` directories while preserving file names and internal structure.

#### Scenario: Auth components moved to global \_components

- **WHEN** auth components (SignIn.tsx, SignOut.tsx, Profile.tsx) are migrated
- **THEN** they SHALL be located in `src/app/_components/` directory

#### Scenario: Comment components moved to comment page

- **WHEN** comment components (Auth.tsx, Container.tsx, CommentSection.tsx) are migrated
- **THEN** they SHALL be located in `src/app/tools/comment/_components/` directory

#### Scenario: Posts components moved to posts page

- **WHEN** post components (Comment.tsx) are migrated
- **THEN** they SHALL be located in `src/app/posts/_components/` or `src/app/posts/[postId]/_components/` based on usage scope

#### Scenario: Resume components moved to resume page

- **WHEN** resume components (Resume.tsx, Header.tsx, WorkExperience.tsx, Education.tsx, Publications.tsx, ProjectExperience.tsx, AdditionalInformation.tsx) are migrated
- **THEN** they SHALL be located in `src/app/about/resume/_components/` directory

#### Scenario: Advanced search components moved to advanced_search page

- **WHEN** advanced search components (JournalTable.tsx, MenubarClient.tsx, Menubar.tsx, DescriptionCard.tsx, JournalClause.tsx) are migrated
- **THEN** they SHALL be located in `src/app/tools/advanced_search/_components/` directory

#### Scenario: GPT-4o image prompts components moved to gpt_4o_image_prompts page

- **WHEN** GPT-4o image prompts components (Box.tsx) are migrated
- **THEN** they SHALL be located in `src/app/tools/gpt_4o_image_prompts/_components/` directory

### Requirement: Import paths SHALL be updated across the entire codebase

The system SHALL update all import statements that reference moved components to reflect their new locations.

#### Scenario: Import path updated from features to \_components

- **WHEN** a file imports from `@/components/features/auth/SignIn`
- **THEN** the import path SHALL be updated to `@/app/_components/SignIn`

#### Scenario: Multiple imports updated in single file

- **WHEN** a file has multiple imports from `@/components/features/*`
- **THEN** all import paths SHALL be updated to their corresponding new locations

#### Scenario: No broken imports after migration

- **WHEN** all components have been moved and imports updated
- **THEN** the codebase SHALL compile without import errors

### Requirement: Empty directories SHALL be removed

The system SHALL remove the `src/components/features/` directory after all components have been migrated.

#### Scenario: Features directory removed when empty

- **WHEN** all component files have been moved out of `src/components/features/`
- **THEN** the entire `src/components/features/` directory SHALL be deleted

#### Scenario: UI directory remains intact

- **WHEN** the features directory is removed
- **THEN** `src/components/ui/` SHALL remain unchanged with all shadcn/ui components intact

### Requirement: UI functionality SHALL remain identical

The system SHALL maintain identical UI rendering and behavior after component migration.

#### Scenario: All pages render correctly after migration

- **WHEN** all components have been migrated
- **THEN** every page (home, posts, resume, tools/comment, tools/advanced_search, tools/gpt_4o_image_prompts) SHALL render identically to before migration

#### Scenario: Component functionality unchanged

- **WHEN** a migrated component is used
- **THEN** its behavior, props, and interactions SHALL remain exactly as before

### Requirement: Migration SHALL create necessary directory structure

The system SHALL create `_components/` directories under pages where they don't exist.

#### Scenario: New \_components directory created

- **WHEN** migrating components to a page without an existing `_components/` directory
- **THEN** the `_components/` directory SHALL be created automatically

#### Scenario: Existing \_components directory preserved

- **WHEN** migrating components to a page with an existing `_components/` directory
- **THEN** new components SHALL be added alongside existing ones without conflicts
