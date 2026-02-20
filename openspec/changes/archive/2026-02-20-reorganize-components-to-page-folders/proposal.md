## Why

当前项目在 `src/components/features/` 目录下集中存放了各种功能组件（auth、comment、posts、resume、tools 等），这些组件实际上都是特定页面专用的。为了符合项目既定的组织风格（每个页面下都有 `_components` 目录，用到啥写啥），需要将这些组件移动到各自对应的页面 `_components` 目录下，提高代码的内聚性和可维护性。

## What Changes

- Move authentication-related components from `src/components/features/auth/` to `src/app/_components/` (global auth UI)
- Move comment-related components from `src/components/features/comment/` to `src/app/tools/comment/_components/`
- Move post-related components from `src/components/features/posts/` to `src/app/posts/_components/` or `src/app/posts/[postId]/_components/`
- Move resume-related components from `src/components/features/resume/` to `src/app/about/resume/_components/`
- Move advanced-search components from `src/components/features/tools/advanced-search/` to `src/app/tools/advanced_search/_components/`
- Move GPT-4o image prompts components from `src/components/features/tools/gpt_4o_image_prompts/` to `src/app/tools/gpt_4o_image_prompts/_components/`
- Update all import paths across the codebase to reflect the new locations
- Remove the now-empty `src/components/features/` directory
- Keep `src/components/ui/` intact (shadcn/ui components remain unchanged)

## Capabilities

### New Capabilities

- `component-migration`: Systematic approach to moving components from centralized `features/` directory to page-specific `_components/` directories with automated import path updates

### Modified Capabilities

None - this is a refactoring that doesn't change functionality

## Impact

### Affected Code

- **Component Files**: ~20 component files across auth, comment, posts, resume, and tools features
- **Import Statements**: All files importing from `@/components/features/*` need path updates
- **Directory Structure**:
  - Creation of new `_components` directories under specific pages
  - Removal of `src/components/features/` directory

### Risk Assessment

- **Low Risk**: Pure refactoring with no functional changes
- **Verification**: UI should remain identical after migration
- **Testing Strategy**: Manual verification of all affected pages to ensure no broken imports or missing components

### Benefits

- Better code organization aligned with project conventions
- Improved component locality (components live next to where they're used)
- Clearer dependency boundaries between pages
- Easier to understand which components belong to which features
