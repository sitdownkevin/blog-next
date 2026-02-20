## ADDED Requirements

### Requirement: Audit script SHALL identify all installed Radix UI packages

The audit script SHALL scan `package.json` dependencies and devDependencies sections to identify all installed `@radix-ui/react-*` packages with their current versions.

#### Scenario: Scan package.json for Radix UI packages

- **WHEN** audit script is executed
- **THEN** script SHALL output a list of all `@radix-ui/react-*` packages with their current installed versions

#### Scenario: Include related shadcn dependencies

- **WHEN** audit script runs
- **THEN** script SHALL also identify related dependencies including `class-variance-authority`, `tailwind-merge`, `lucide-react`, `cmdk`, `sonner`, and `vaul`

### Requirement: Audit script SHALL check latest available versions from npm registry

The audit script SHALL query the npm registry API to retrieve the latest stable version for each identified package.

#### Scenario: Query npm registry for latest versions

- **WHEN** package list is collected
- **THEN** script SHALL fetch latest version from npm registry for each package using `https://registry.npmjs.org/<package-name>/latest`

#### Scenario: Handle network errors gracefully

- **WHEN** npm registry is unreachable
- **THEN** script SHALL display error message and continue with remaining packages

### Requirement: Audit script SHALL verify React 19 compatibility

The audit script SHALL check each package's `peerDependencies` to verify if it supports React 19.x.

#### Scenario: Check peerDependencies for React 19 support

- **WHEN** package metadata is retrieved
- **THEN** script SHALL parse `peerDependencies.react` field and verify if version range includes `^19.0.0`

#### Scenario: Flag incompatible packages

- **WHEN** package does not support React 19
- **THEN** script SHALL mark package as "incompatible" in the output report with severity "HIGH"

#### Scenario: Mark packages with flexible peer dependencies

- **WHEN** package uses `*` or wide range in peerDependencies
- **THEN** script SHALL mark package as "needs verification" with severity "MEDIUM"

### Requirement: Audit script SHALL generate structured output report

The audit script SHALL produce both JSON and Markdown formatted reports summarizing the audit results.

#### Scenario: Generate JSON report

- **WHEN** audit completes successfully
- **THEN** script SHALL write JSON file to `scripts/audit-results.json` containing:
  - timestamp
  - array of packages with: name, currentVersion, latestVersion, isOutdated, reactCompatibility, severity

#### Scenario: Generate Markdown report

- **WHEN** audit completes successfully
- **THEN** script SHALL write Markdown file to `scripts/audit-results.md` with formatted table including:
  - Package name
  - Current version
  - Latest version
  - Status (up-to-date/outdated)
  - React 19 compatible (yes/no/needs verification)
  - Severity (HIGH/MEDIUM/LOW)

#### Scenario: Display summary statistics

- **WHEN** Markdown report is generated
- **THEN** report SHALL include summary section showing:
  - Total packages audited
  - Packages needing updates
  - Packages with compatibility issues
  - Recommended action items

### Requirement: Audit script SHALL provide actionable recommendations

The audit script SHALL analyze audit results and suggest specific update commands.

#### Scenario: Suggest update commands for outdated packages

- **WHEN** outdated packages are detected
- **THEN** script SHALL generate `pnpm update` commands for each package or package group

#### Scenario: Warn about breaking changes

- **WHEN** major version update is detected (e.g., 1.x to 2.x)
- **THEN** script SHALL include warning message to check CHANGELOG and migration guide

#### Scenario: Prioritize updates by severity

- **WHEN** multiple packages need updates
- **THEN** script SHALL sort recommendations by severity (HIGH > MEDIUM > LOW) in the output

### Requirement: Audit script SHALL be executable as npm script

The audit script SHALL be runnable via `pnpm run audit:components` command.

#### Scenario: Execute via npm script

- **WHEN** user runs `pnpm run audit:components`
- **THEN** script SHALL execute `node scripts/audit-components.js` and display results in terminal

#### Scenario: Return appropriate exit codes

- **WHEN** audit completes with no critical issues
- **THEN** script SHALL exit with code 0
- **WHEN** HIGH severity issues are found
- **THEN** script SHALL exit with code 1 (for CI/CD integration)

### Requirement: Audit script SHALL detect shadcn component file changes

The audit script SHALL compare installed shadcn components against latest templates from shadcn/ui repository.

#### Scenario: List installed shadcn components

- **WHEN** audit runs
- **THEN** script SHALL scan `src/components/ui/` directory and list all component files

#### Scenario: Identify custom components

- **WHEN** component file is detected
- **THEN** script SHALL mark components with non-standard names (e.g., `shiny-button.jsx`, `scroll-based-velocity.jsx`) as "custom" in the report

#### Scenario: Flag .jsx files for migration to .tsx

- **WHEN** component file has `.jsx` extension
- **THEN** script SHALL recommend migration to `.tsx` for improved type safety

### Requirement: Audit report SHALL be human-readable and actionable

The audit report SHALL use clear language and visual formatting to help developers understand required actions.

#### Scenario: Use color coding in terminal output

- **WHEN** script outputs to terminal
- **THEN** SHALL use colors: red for HIGH severity, yellow for MEDIUM, green for up-to-date packages

#### Scenario: Provide clickable links to documentation

- **WHEN** Markdown report is generated
- **THEN** SHALL include links to:
  - Radix UI migration guides
  - shadcn/ui changelog
  - npm package pages

#### Scenario: Group related packages

- **WHEN** multiple packages belong to same family (e.g., all @radix-ui/\*)
- **THEN** report SHALL group them under common heading for easier review
