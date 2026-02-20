## 1. Preparation

- [ ] 1.1 Run `pnpm build` to confirm current build is successful
- [ ] 1.2 Run `git status` to ensure working directory is clean
- [ ] 1.3 Create feature branch `git checkout -b refactor/reorganize-components`
- [ ] 1.4 Document all current import locations with `grep -r "@/components/features" src/ > /tmp/imports-before.txt`

## 2. Migrate Auth Components

- [ ] 2.1 Create directory `src/app/_components/` if it doesn't exist
- [ ] 2.2 Move and rename `src/components/features/auth/SignIn.tsx` to `src/app/_components/sign-in.tsx`
- [ ] 2.3 Move and rename `src/components/features/auth/SignOut.tsx` to `src/app/_components/sign-out.tsx`
- [ ] 2.4 Move and rename `src/components/features/auth/Profile.tsx` to `src/app/_components/profile.tsx`
- [ ] 2.5 Search and update all imports from `@/components/features/auth` to `@/app/_components` with new kebab-case names
- [ ] 2.6 Run `pnpm build` to verify no compilation errors
- [ ] 2.7 Run `npx tsc --noEmit` to verify TypeScript types
- [ ] 2.8 Commit changes: `git add . && git commit -m "refactor: migrate auth components to app/_components"`

## 3. Migrate Comment Components

- [ ] 3.1 Create directory `src/app/tools/comment/_components/`
- [ ] 3.2 Move and rename `src/components/features/comment/Auth.tsx` to `src/app/tools/comment/_components/auth.tsx`
- [ ] 3.3 Move and rename `src/components/features/comment/Container.tsx` to `src/app/tools/comment/_components/container.tsx`
- [ ] 3.4 Move and rename `src/components/features/comment/CommentSection.tsx` to `src/app/tools/comment/_components/comment-section.tsx`
- [ ] 3.5 Update import in `src/app/posts/[postId]/page.tsx` from `@/components/features/comment/Container` to `@/app/tools/comment/_components/container`
- [ ] 3.6 Search for any other imports from `@/components/features/comment` and update them with new kebab-case names
- [ ] 3.7 Run `pnpm build` to verify no compilation errors
- [ ] 3.8 Test comment tool page in browser at `/tools/comment`
- [ ] 3.9 Commit changes: `git add . && git commit -m "refactor: migrate comment components to tools/comment/_components"`

## 4. Migrate Posts Components

- [ ] 4.1 Verify directory `src/app/posts/[postId]/_components/` exists (create if needed)
- [ ] 4.2 Move and rename `src/components/features/posts/Comment.tsx` to `src/app/posts/[postId]/_components/comment.tsx`
- [ ] 4.3 Update import in `src/app/tools/comment/page.tsx` from `@/components/features/posts/Comment` to `@/app/posts/[postId]/_components/comment`
- [ ] 4.4 Search for any other imports from `@/components/features/posts` and update them with new kebab-case names
- [ ] 4.5 Run `pnpm build` to verify no compilation errors
- [ ] 4.6 Test post detail page in browser (navigate to any post)
- [ ] 4.7 Commit changes: `git add . && git commit -m "refactor: migrate posts components to posts/[postId]/_components"`

## 5. Migrate Resume Components

- [ ] 5.1 Create directory `src/app/about/resume/_components/`
- [ ] 5.2 Move and rename `src/components/features/resume/Resume.tsx` to `src/app/about/resume/_components/resume.tsx`
- [ ] 5.3 Move and rename `src/components/features/resume/Header.tsx` to `src/app/about/resume/_components/header.tsx`
- [ ] 5.4 Move and rename `src/components/features/resume/WorkExperience.tsx` to `src/app/about/resume/_components/work-experience.tsx`
- [ ] 5.5 Move and rename `src/components/features/resume/Education.tsx` to `src/app/about/resume/_components/education.tsx`
- [ ] 5.6 Move and rename `src/components/features/resume/Publications.tsx` to `src/app/about/resume/_components/publications.tsx`
- [ ] 5.7 Move and rename `src/components/features/resume/ProjectExperience.tsx` to `src/app/about/resume/_components/project-experience.tsx`
- [ ] 5.8 Move and rename `src/components/features/resume/AdditionalInformation.tsx` to `src/app/about/resume/_components/additional-information.tsx`
- [ ] 5.9 Update import in `src/app/about/resume/page.tsx` from `@/components/features/resume/Resume` to `@/app/about/resume/_components/resume`
- [ ] 5.10 Check for any relative imports within resume components and update if needed with new kebab-case names
- [ ] 5.11 Run `pnpm build` to verify no compilation errors
- [ ] 5.12 Test resume page in browser at `/about/resume`
- [ ] 5.13 Commit changes: `git add . && git commit -m "refactor: migrate resume components to about/resume/_components"`

## 6. Migrate Advanced Search Components

- [ ] 6.1 Create directory `src/app/tools/advanced_search/_components/`
- [ ] 6.2 Move and rename `src/components/features/tools/advanced-search/JournalTable.tsx` to `src/app/tools/advanced_search/_components/journal-table.tsx`
- [ ] 6.3 Move and rename `src/components/features/tools/advanced-search/MenubarClient.tsx` to `src/app/tools/advanced_search/_components/menubar-client.tsx`
- [ ] 6.4 Move and rename `src/components/features/tools/advanced-search/Menubar.tsx` to `src/app/tools/advanced_search/_components/menubar.tsx`
- [ ] 6.5 Move and rename `src/components/features/tools/advanced-search/DescriptionCard.tsx` to `src/app/tools/advanced_search/_components/description-card.tsx`
- [ ] 6.6 Move and rename `src/components/features/tools/advanced-search/JournalClause.tsx` to `src/app/tools/advanced_search/_components/journal-clause.tsx`
- [ ] 6.7 Update import in `src/app/tools/advanced_search/layout.tsx` from `@/components/features/tools/advanced-search/Menubar` to `@/app/tools/advanced_search/_components/menubar`
- [ ] 6.8 Update imports in `src/app/tools/advanced_search/[rule]/page.tsx` for journal-table, journal-clause, and description-card with new kebab-case names
- [ ] 6.9 Check for any relative imports between advanced search components (e.g., menubar importing menubar-client) and update paths
- [ ] 6.10 Run `pnpm build` to verify no compilation errors
- [ ] 6.11 Test advanced search pages in browser at `/tools/advanced_search`
- [ ] 6.12 Commit changes: `git add . && git commit -m "refactor: migrate advanced-search components to tools/advanced_search/_components"`

## 7. Migrate GPT-4o Image Prompts Components

- [ ] 7.1 Create directory `src/app/tools/gpt_4o_image_prompts/_components/`
- [ ] 7.2 Move and rename `src/components/features/tools/gpt_4o_image_prompts/Box.tsx` to `src/app/tools/gpt_4o_image_prompts/_components/box.tsx`
- [ ] 7.3 Update import in `src/app/tools/gpt_4o_image_prompts/page.tsx` from `@/components/features/tools/gpt_4o_image_prompts/Box` to `@/app/tools/gpt_4o_image_prompts/_components/box`
- [ ] 7.4 Run `pnpm build` to verify no compilation errors
- [ ] 7.5 Test GPT-4o image prompts page in browser at `/tools/gpt_4o_image_prompts`
- [ ] 7.6 Commit changes: `git add . && git commit -m "refactor: migrate gpt-4o-image-prompts components to tools/gpt_4o_image_prompts/_components"`

## 8. Cleanup

- [ ] 8.1 Verify `src/components/features/` directory is empty with `find src/components/features -type f`
- [ ] 8.2 Delete the entire `src/components/features/` directory
- [ ] 8.3 Verify `src/components/ui/` directory is still intact
- [ ] 8.4 Run `pnpm build` for final verification
- [ ] 8.5 Run `grep -r "@/components/features" src/` to confirm no remaining old imports
- [ ] 8.6 Commit changes: `git add . && git commit -m "refactor: remove empty features directory"`

## 9. Final Verification

- [ ] 9.1 Clear Next.js cache: `rm -rf .next`
- [ ] 9.2 Run `pnpm dev` to start development server
- [ ] 9.3 Test home page (auth components if visible)
- [ ] 9.4 Test `/posts` page and navigate to a post detail page (Comment component)
- [ ] 9.5 Test `/tools/comment` page (comment tool components)
- [ ] 9.6 Test `/about/resume` page (resume components)
- [ ] 9.7 Test `/tools/advanced_search` page and navigate to a rule page (advanced search components)
- [ ] 9.8 Test `/tools/gpt_4o_image_prompts` page (GPT-4o components)
- [ ] 9.9 Verify all interactive features work (buttons, forms, navigation)
- [ ] 9.10 Check browser console for any errors or warnings

## 10. Documentation and Merge

- [ ] 10.1 Review all commits for clear messages and logical structure
- [ ] 10.2 Push branch to remote: `git push origin refactor/reorganize-components`
- [ ] 10.3 Create Pull Request with summary of changes
- [ ] 10.4 Add screenshots or screen recording showing all pages still work
- [ ] 10.5 Request code review from team members
- [ ] 10.6 Address any review feedback
- [ ] 10.7 Merge to main branch after approval
