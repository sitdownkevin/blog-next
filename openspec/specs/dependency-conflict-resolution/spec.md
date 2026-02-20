## ADDED Requirements

### Requirement: System SHALL use pnpm overrides to enforce consistent React versions

The dependency management configuration SHALL use pnpm's `overrides` field in `package.json` to enforce React 19 across all dependencies.

#### Scenario: Configure React version override

- **WHEN** pnpm installs dependencies
- **THEN** all transitive dependencies SHALL resolve to React 19.x as specified in overrides

#### Scenario: Override configuration in package.json

- **WHEN** `package.json` is updated
- **THEN** SHALL include pnpm overrides section with:
  ```json
  "pnpm": {
    "overrides": {
      "react": "^19.0.0",
      "react-dom": "^19.0.0"
    }
  }
  ```

#### Scenario: Verify overrides after installation

- **WHEN** `pnpm install` completes
- **THEN** `pnpm list react` SHALL show all dependencies using React 19.x

### Requirement: System SHALL detect and resolve peer dependency conflicts

The conflict resolution process SHALL identify peer dependency warnings and provide automated resolution strategies.

#### Scenario: Detect peer dependency warnings during install

- **WHEN** `pnpm install` is executed
- **THEN** system SHALL capture and log all peer dependency warning messages

#### Scenario: Parse conflict messages

- **WHEN** peer dependency conflict is detected
- **THEN** system SHALL extract:
  - conflicting package name
  - required version range
  - installed version
  - parent package causing conflict

#### Scenario: Generate resolution recommendations

- **WHEN** conflicts are identified
- **THEN** system SHALL suggest one of:
  - add to pnpm overrides
  - update parent package
  - use `--force` flag (with warning)

### Requirement: Conflict resolution SHALL preserve compatibility with Next.js 16 and Tailwind 4

All dependency updates SHALL maintain compatibility with the project's core framework versions.

#### Scenario: Validate Radix UI compatibility with Next.js

- **WHEN** Radix UI packages are updated
- **THEN** SHALL verify packages support React Server Components (used by Next.js App Router)

#### Scenario: Verify Tailwind CSS 4 compatibility

- **WHEN** shadcn components are regenerated
- **THEN** SHALL ensure component styles use Tailwind 4 syntax (not deprecated v3 features)

#### Scenario: Check class-variance-authority version

- **WHEN** updating CVA
- **THEN** SHALL verify it works with current Tailwind merge configuration

### Requirement: Resolution process SHALL handle third-party component dependencies

The system SHALL manage dependencies for third-party components that rely on Radix UI primitives.

#### Scenario: Update cmdk package

- **WHEN** Radix UI dialog is updated
- **THEN** SHALL check if `cmdk` needs update to maintain compatibility

#### Scenario: Update sonner package

- **WHEN** Radix UI toast is updated
- **THEN** SHALL verify `sonner` works with new toast version

#### Scenario: Update vaul package

- **WHEN** Radix UI dialog primitives are updated
- **THEN** SHALL check `vaul` drawer compatibility

#### Scenario: Document third-party update requirements

- **WHEN** third-party component needs update
- **THEN** resolution strategy SHALL include package name, current version, recommended version, and reason

### Requirement: System SHALL provide conflict resolution script for automation

A resolution script SHALL automate the detection and resolution of common dependency conflicts.

#### Scenario: Execute conflict resolution script

- **WHEN** developer runs `pnpm run resolve:conflicts`
- **THEN** script SHALL:
  - run `pnpm install`
  - capture peer dependency warnings
  - analyze conflicts
  - generate recommended `overrides` configuration

#### Scenario: Dry-run mode for conflict resolution

- **WHEN** script is run with `--dry-run` flag
- **THEN** SHALL display recommended changes without modifying `package.json`

#### Scenario: Apply resolutions automatically

- **WHEN** script is run without `--dry-run`
- **THEN** SHALL update `package.json` with overrides and re-run `pnpm install`

### Requirement: Resolution strategy SHALL prioritize least invasive solutions

When multiple resolution strategies exist, the system SHALL prefer solutions that minimize risk.

#### Scenario: Prefer version range widening over pinning

- **WHEN** package has restrictive peer dependency (e.g., `react@^18.0.0`)
- **THEN** SHALL first attempt to update package to newer version with wider range before using overrides

#### Scenario: Avoid unnecessary overrides

- **WHEN** peer dependency warning is non-critical
- **THEN** SHALL only add override if it prevents build or causes runtime errors

#### Scenario: Document override rationale

- **WHEN** override is added to package.json
- **THEN** SHALL add inline comment explaining:
  ```json
  "overrides": {
    "react": "^19.0.0"  // Required for Radix UI React 19 compatibility
  }
  ```

### Requirement: Conflict resolution SHALL validate successful resolution

After applying resolution strategies, the system SHALL verify conflicts are resolved.

#### Scenario: Verify clean installation

- **WHEN** resolution is applied
- **THEN** running `pnpm install` SHALL complete without peer dependency warnings

#### Scenario: Verify build succeeds

- **WHEN** conflicts are resolved
- **THEN** running `pnpm build` SHALL complete successfully without dependency errors

#### Scenario: Check for duplicate packages

- **WHEN** installation completes
- **THEN** running `pnpm list --depth=0` SHALL show no duplicate versions of core dependencies (react, react-dom)

### Requirement: Resolution process SHALL maintain lockfile integrity

All dependency changes SHALL properly update `pnpm-lock.yaml` to ensure reproducible builds.

#### Scenario: Regenerate lockfile after resolution

- **WHEN** overrides are added or packages updated
- **THEN** `pnpm-lock.yaml` SHALL be regenerated to reflect new resolution strategy

#### Scenario: Validate lockfile consistency

- **WHEN** lockfile is updated
- **THEN** running `pnpm install --frozen-lockfile` on clean checkout SHALL succeed without modifications

#### Scenario: Document lockfile changes in commit

- **WHEN** lockfile is updated
- **THEN** git commit message SHALL mention dependency resolution changes

### Requirement: Resolution SHALL handle breaking changes in dependencies

When dependency updates include breaking changes, the resolution process SHALL identify and document required code modifications.

#### Scenario: Detect major version updates

- **WHEN** package update crosses major version (e.g., 1.x to 2.x)
- **THEN** system SHALL flag as "requires manual review" and link to migration guide

#### Scenario: Check for API changes in Radix UI

- **WHEN** Radix UI package major version is updated
- **THEN** SHALL scan component files for deprecated API usage patterns and generate warning list

#### Scenario: Validate shadcn component regeneration

- **WHEN** breaking changes are detected in Radix UI
- **THEN** resolution process SHALL recommend regenerating affected shadcn components with `npx shadcn@latest add <component> --overwrite`

### Requirement: Resolution documentation SHALL be versioned and maintainable

Conflict resolution decisions SHALL be documented for future reference and maintenance.

#### Scenario: Maintain resolution changelog

- **WHEN** overrides are added or modified
- **THEN** SHALL update `docs/dependency-resolution.md` with:
  - date of change
  - packages affected
  - reason for override
  - expected duration (temporary vs permanent)

#### Scenario: Review overrides periodically

- **WHEN** dependencies are updated in future
- **THEN** SHALL check if existing overrides are still necessary and remove obsolete ones

#### Scenario: Document known compatibility issues

- **WHEN** specific package combination causes issues
- **THEN** SHALL document in project wiki/docs with:
  - affected versions
  - symptom description
  - resolution applied
  - workaround if no resolution exists
