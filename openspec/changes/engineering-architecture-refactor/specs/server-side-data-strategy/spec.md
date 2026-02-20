## ADDED Requirements

### Requirement: React Server Components for data fetching

The system SHALL use React Server Components (RSC) for data fetching in posts listing page.

#### Scenario: Server-side data fetching

- **WHEN** posts listing page is rendered
- **THEN** data SHALL be fetched on the server before rendering
- **THEN** no client-side fetch calls SHALL be made for initial data

#### Scenario: Server component implementation

- **WHEN** implementing posts page
- **THEN** page component SHALL NOT include "use client" directive
- **THEN** data fetching SHALL occur in async server component

### Requirement: Next.js caching for post data

The system SHALL use Next.js `unstable_cache` for caching post data and search results.

#### Scenario: Caching getMatterList results

- **WHEN** fetching list of posts
- **THEN** results SHALL be cached using `unstable_cache`
- **THEN** cache SHALL have appropriate TTL (time-to-live)

#### Scenario: Caching search results

- **WHEN** performing post search
- **THEN** results SHALL be cached per search query
- **THEN** cache keys SHALL include search parameters

### Requirement: Eliminate client-side markdown processing

The system SHALL process markdown content on the server, not in the browser.

#### Scenario: Server-side markdown processing

- **WHEN** rendering post content or search results
- **THEN** markdown SHALL be processed using remark/rehype on server
- **THEN** processed HTML SHALL be sent to client

#### Scenario: No client-side remark

- **WHEN** implementing posts page
- **THEN** `remark().processSync()` SHALL NOT be called in client components
- **THEN** remark library SHALL NOT be included in client bundle

### Requirement: Search strategy optimization

The system SHALL implement two-tier search strategy for posts.

#### Scenario: Metadata-based instant filtering

- **WHEN** user searches by title or tags
- **THEN** filtering SHALL happen instantly using cached metadata
- **THEN** no full content loading required for metadata searches

#### Scenario: Content-based lazy loading

- **WHEN** user searches within post content
- **THEN** full content SHALL be loaded on-demand
- **THEN** results SHALL be cached for subsequent searches

### Requirement: Server-side search implementation

The system SHALL implement search logic on the server for posts listing page.

#### Scenario: Search API endpoint

- **WHEN** implementing search functionality
- **THEN** search logic SHALL be in server component or API route
- **THEN** client SHALL receive pre-filtered results

#### Scenario: Search performance

- **WHEN** performing search operations
- **THEN** search SHALL use indexed metadata when possible
- **THEN** full-text search SHALL be optimized with caching

### Requirement: Cache invalidation strategy

The system SHALL implement appropriate cache invalidation for post data.

#### Scenario: Manual cache invalidation

- **WHEN** post content is added or modified
- **THEN** relevant caches SHALL be invalidated
- **THEN** next request SHALL fetch fresh data

#### Scenario: Time-based cache expiration

- **WHEN** cache TTL expires
- **THEN** stale data SHALL be revalidated on next request
- **THEN** fresh data SHALL be cached for subsequent requests

### Requirement: Caching layer for file system operations

The system SHALL add caching to file system read operations in `getMatterList` and `advanced-search`.

#### Scenario: Caching getMatterList

- **WHEN** `getMatterList` reads markdown files
- **THEN** results SHALL be cached to avoid repeated file system access
- **THEN** cache SHALL be invalidated when files change

#### Scenario: Caching advanced search

- **WHEN** `advanced-search` reads markdown files
- **THEN** parsed content SHALL be cached
- **THEN** subsequent searches SHALL use cached content

### Requirement: Reduced initial page load time

The system SHALL improve posts page load performance by moving processing to server.

#### Scenario: Measuring page performance

- **WHEN** measuring posts page load time
- **THEN** Time to First Byte (TTFB) SHALL be within acceptable range
- **THEN** First Contentful Paint (FCP) SHALL be improved compared to client-side approach

#### Scenario: Lighthouse score improvement

- **WHEN** running Lighthouse on posts page
- **THEN** Performance score SHALL be higher than baseline
- **THEN** Main Thread Work SHALL be reduced compared to client-side processing

### Requirement: Progressive enhancement

The system SHALL ensure posts page functions without JavaScript.

#### Scenario: No-JS functionality

- **WHEN** JavaScript is disabled in browser
- **THEN** posts listing page SHALL still display content
- **THEN** basic functionality SHALL work (viewing posts, navigation)

#### Scenario: Enhanced interactivity with JS

- **WHEN** JavaScript is enabled
- **THEN** additional interactive features SHALL be available
- **THEN** page SHALL not re-fetch data already rendered by server
