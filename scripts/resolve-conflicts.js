#!/usr/bin/env node

/**
 * Dependency Conflict Resolution Script
 *
 * Detects peer dependency conflicts, analyzes them,
 * and provides automated resolution strategies.
 */

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const execAsync = promisify(exec);

// Color codes
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
};

/**
 * Run pnpm install and capture output
 */
async function runPnpmInstall() {
  try {
    const { stdout, stderr } = await execAsync("pnpm install", {
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });

    return {
      success: true,
      output: stdout + stderr,
    };
  } catch (error) {
    return {
      success: false,
      output: error.stdout + error.stderr,
      error: error.message,
    };
  }
}

/**
 * Parse peer dependency warnings from pnpm output
 */
function parsePeerDependencyWarnings(output) {
  const warnings = [];
  const lines = output.split("\n");

  const warningPattern =
    /WARN\s+(.+?)\s+requires a peer of\s+(.+?)@(.+?)\s+but/i;

  for (const line of lines) {
    const match = line.match(warningPattern);
    if (match) {
      warnings.push({
        package: match[1].trim(),
        peerDependency: match[2].trim(),
        requiredVersion: match[3].trim(),
        rawLine: line.trim(),
      });
    }
  }

  return warnings;
}

/**
 * Analyze conflicts and generate resolution strategies
 */
function analyzeConflicts(warnings) {
  const strategies = [];
  const seen = new Set();

  for (const warning of warnings) {
    const key = `${warning.peerDependency}:${warning.requiredVersion}`;

    if (seen.has(key)) {
      continue;
    }
    seen.add(key);

    // Determine strategy
    if (
      warning.peerDependency === "react" ||
      warning.peerDependency === "react-dom"
    ) {
      strategies.push({
        type: "override",
        package: warning.peerDependency,
        version: "^19.0.0",
        reason: "Force React 19 for all dependencies",
        comment: `// Required for React 19 compatibility with ${warning.package}`,
        priority: "high",
      });
    } else {
      strategies.push({
        type: "update-parent",
        package: warning.package,
        peerDependency: warning.peerDependency,
        reason: `Update ${warning.package} to resolve peer dependency`,
        priority: "medium",
      });
    }
  }

  return strategies;
}

/**
 * Generate pnpm overrides configuration
 */
function generateOverridesConfig(strategies) {
  const overrides = {};
  const comments = {};

  for (const strategy of strategies) {
    if (strategy.type === "override") {
      overrides[strategy.package] = strategy.version;
      comments[strategy.package] = strategy.comment;
    }
  }

  return { overrides, comments };
}

/**
 * Read current package.json
 */
function readPackageJson() {
  const packagePath = path.join(process.cwd(), "package.json");
  const content = fs.readFileSync(packagePath, "utf8");
  return JSON.parse(content);
}

/**
 * Write updated package.json
 */
function writePackageJson(packageJson) {
  const packagePath = path.join(process.cwd(), "package.json");
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");
}

/**
 * Apply overrides to package.json
 */
function applyOverrides(overrides, comments, dryRun = false) {
  if (Object.keys(overrides).length === 0) {
    console.log(`${colors.green}No overrides needed.${colors.reset}`);
    return false;
  }

  console.log(
    `\n${colors.bold}${colors.blue}📝 Recommended Overrides:${colors.reset}\n`,
  );

  for (const [pkg, version] of Object.entries(overrides)) {
    const comment = comments[pkg] || "";
    console.log(
      `${colors.yellow}  "${pkg}": "${version}"${colors.reset} ${colors.blue}${comment}${colors.reset}`,
    );
  }

  if (dryRun) {
    console.log(
      `\n${colors.yellow}[DRY RUN] No changes made to package.json${colors.reset}\n`,
    );
    return false;
  }

  const packageJson = readPackageJson();

  if (!packageJson.pnpm) {
    packageJson.pnpm = {};
  }

  if (!packageJson.pnpm.overrides) {
    packageJson.pnpm.overrides = {};
  }

  // Merge overrides
  Object.assign(packageJson.pnpm.overrides, overrides);

  writePackageJson(packageJson);

  console.log(
    `\n${colors.green}✓ Overrides applied to package.json${colors.reset}\n`,
  );

  return true;
}

/**
 * Verify resolution by checking for clean install
 */
async function verifyResolution() {
  console.log(
    `${colors.bold}${colors.blue}🔍 Verifying resolution...${colors.reset}\n`,
  );

  const result = await runPnpmInstall();

  if (!result.success) {
    console.log(
      `${colors.red}✗ Verification failed: pnpm install failed${colors.reset}`,
    );
    return false;
  }

  const warnings = parsePeerDependencyWarnings(result.output);

  if (warnings.length === 0) {
    console.log(
      `${colors.green}✓ No peer dependency warnings found${colors.reset}`,
    );
    return true;
  }

  console.log(
    `${colors.yellow}⚠ Still found ${warnings.length} peer dependency warnings${colors.reset}`,
  );
  return false;
}

/**
 * Run build to verify no errors
 */
async function verifyBuild() {
  console.log(
    `${colors.bold}${colors.blue}🏗️  Verifying build...${colors.reset}\n`,
  );

  try {
    await execAsync("pnpm build", {
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024,
    });

    console.log(`${colors.green}✓ Build successful${colors.reset}`);
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ Build failed${colors.reset}`);
    return false;
  }
}

/**
 * Display summary
 */
function displaySummary(warnings, strategies) {
  console.log(
    `\n${colors.bold}═══════════════════════════════════════${colors.reset}`,
  );
  console.log(
    `${colors.bold}        CONFLICT RESOLUTION SUMMARY${colors.reset}`,
  );
  console.log(
    `${colors.bold}═══════════════════════════════════════${colors.reset}\n`,
  );

  console.log(
    `Peer dependency warnings found: ${colors.yellow}${warnings.length}${colors.reset}`,
  );
  console.log(
    `Resolution strategies:          ${colors.blue}${strategies.length}${colors.reset}\n`,
  );

  if (strategies.length > 0) {
    console.log(`${colors.bold}Recommended Actions:${colors.reset}\n`);

    const highPriority = strategies.filter((s) => s.priority === "high");
    const mediumPriority = strategies.filter((s) => s.priority === "medium");

    if (highPriority.length > 0) {
      console.log(`${colors.red}${colors.bold}  High Priority:${colors.reset}`);
      for (const strategy of highPriority) {
        console.log(`    - ${strategy.reason}`);
      }
      console.log();
    }

    if (mediumPriority.length > 0) {
      console.log(
        `${colors.yellow}${colors.bold}  Medium Priority:${colors.reset}`,
      );
      for (const strategy of mediumPriority) {
        console.log(`    - ${strategy.reason}`);
      }
      console.log();
    }
  }

  console.log(
    `${colors.bold}═══════════════════════════════════════${colors.reset}\n`,
  );
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const verify = args.includes("--verify");

  console.log(
    `${colors.bold}${colors.blue}🔧 Dependency Conflict Resolution${colors.reset}\n`,
  );

  if (dryRun) {
    console.log(
      `${colors.yellow}Running in DRY RUN mode - no changes will be made${colors.reset}\n`,
    );
  }

  // Step 1: Run pnpm install and capture warnings
  console.log(`${colors.bold}Step 1: Running pnpm install...${colors.reset}\n`);

  const installResult = await runPnpmInstall();

  if (!installResult.success && !installResult.output) {
    console.error(
      `${colors.red}✗ Failed to run pnpm install: ${installResult.error}${colors.reset}`,
    );
    process.exit(1);
  }

  // Step 2: Parse peer dependency warnings
  console.log(
    `${colors.bold}Step 2: Analyzing peer dependency warnings...${colors.reset}\n`,
  );

  const warnings = parsePeerDependencyWarnings(installResult.output);

  if (warnings.length === 0) {
    console.log(
      `${colors.green}${colors.bold}✓ No peer dependency conflicts found!${colors.reset}\n`,
    );
    process.exit(0);
  }

  console.log(
    `Found ${colors.yellow}${warnings.length}${colors.reset} peer dependency warnings.\n`,
  );

  // Step 3: Generate resolution strategies
  console.log(
    `${colors.bold}Step 3: Generating resolution strategies...${colors.reset}\n`,
  );

  const strategies = analyzeConflicts(warnings);

  // Step 4: Display summary
  displaySummary(warnings, strategies);

  // Step 5: Apply overrides if not dry run
  const { overrides, comments } = generateOverridesConfig(strategies);
  const applied = applyOverrides(overrides, comments, dryRun);

  // Step 6: Verify resolution if requested
  if (verify && !dryRun && applied) {
    console.log(
      `${colors.bold}Step 6: Verifying resolution...${colors.reset}\n`,
    );

    const installOk = await verifyResolution();
    const buildOk = await verifyBuild();

    if (installOk && buildOk) {
      console.log(
        `\n${colors.green}${colors.bold}✓ Resolution verified successfully!${colors.reset}\n`,
      );
    } else {
      console.log(
        `\n${colors.yellow}⚠ Resolution may need manual adjustment${colors.reset}\n`,
      );
    }
  }

  // Exit
  if (dryRun) {
    console.log(
      `${colors.blue}Run without --dry-run to apply changes${colors.reset}\n`,
    );
  } else if (applied) {
    console.log(
      `${colors.green}${colors.bold}✓ Conflict resolution complete!${colors.reset}`,
    );
    console.log(
      `${colors.blue}Run 'pnpm install' to apply overrides${colors.reset}\n`,
    );
  }

  process.exit(0);
}

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error(
      `${colors.red}${colors.bold}✗ Error: ${error.message}${colors.reset}`,
    );
    console.error(error.stack);
    process.exit(1);
  });
}

module.exports = {
  parsePeerDependencyWarnings,
  analyzeConflicts,
  generateOverridesConfig,
};
