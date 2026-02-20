#!/usr/bin/env node

/**
 * Component Version Audit Script
 *
 * Audits installed Radix UI and related shadcn dependencies,
 * checks for updates, verifies React 19 compatibility,
 * and generates actionable reports.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// Color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
};

const SEVERITY = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
};

// Packages to audit
const RELATED_PACKAGES = [
  "class-variance-authority",
  "tailwind-merge",
  "lucide-react",
  "cmdk",
  "sonner",
  "vaul",
];

/**
 * Fetch package metadata from npm registry
 */
async function fetchPackageInfo(packageName) {
  return new Promise((resolve, reject) => {
    const url = `https://registry.npmjs.org/${packageName}/latest`;

    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (error) {
            reject(
              new Error(
                `Failed to parse response for ${packageName}: ${error.message}`,
              ),
            );
          }
        });
      })
      .on("error", (error) => {
        // Graceful error handling
        console.error(
          `${colors.yellow}⚠ Network error fetching ${packageName}: ${error.message}${colors.reset}`,
        );
        resolve(null);
      });
  });
}

/**
 * Read and parse package.json
 */
function readPackageJson() {
  const packagePath = path.join(process.cwd(), "package.json");
  const content = fs.readFileSync(packagePath, "utf8");
  return JSON.parse(content);
}

/**
 * Extract all @radix-ui/* packages
 */
function getRadixPackages(packageJson) {
  const packages = [];
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  for (const [name, version] of Object.entries(allDeps)) {
    if (name.startsWith("@radix-ui/")) {
      packages.push({ name, currentVersion: version.replace(/^[\^~]/, "") });
    }
  }

  return packages;
}

/**
 * Extract related shadcn dependencies
 */
function getRelatedPackages(packageJson) {
  const packages = [];
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  for (const name of RELATED_PACKAGES) {
    if (allDeps[name]) {
      packages.push({
        name,
        currentVersion: allDeps[name].replace(/^[\^~]/, ""),
      });
    }
  }

  return packages;
}

/**
 * Check if package supports React 19
 */
function checkReact19Compatibility(peerDependencies) {
  if (!peerDependencies || !peerDependencies.react) {
    return { compatible: "unknown", severity: SEVERITY.MEDIUM };
  }

  const reactRange = peerDependencies.react;

  // Check if version range is flexible (*)
  if (reactRange === "*") {
    return { compatible: "needs-verification", severity: SEVERITY.MEDIUM };
  }

  // Check if range includes 19.x
  // Simple heuristic: if it includes >=18 or >=19 or ^18.0.0 or wide range
  if (
    reactRange.includes(">=19") ||
    reactRange.includes("^19") ||
    reactRange.includes("19.x") ||
    reactRange.includes(">=18") ||
    reactRange.includes("^18") ||
    reactRange.includes("18.x")
  ) {
    return { compatible: "yes", severity: SEVERITY.LOW };
  }

  // If restricted to older versions
  return { compatible: "no", severity: SEVERITY.HIGH };
}

/**
 * Compare versions
 */
function isOutdated(current, latest) {
  const cleanCurrent = current.replace(/^[\^~]/, "");
  return cleanCurrent !== latest;
}

/**
 * Check if major version changed
 */
function hasMajorVersionChange(current, latest) {
  const currentMajor = parseInt(current.split(".")[0], 10);
  const latestMajor = parseInt(latest.split(".")[0], 10);
  return latestMajor > currentMajor;
}

/**
 * Scan src/components/ui/ directory
 */
function scanComponentsDirectory() {
  const uiDir = path.join(process.cwd(), "src/components/ui");

  if (!fs.existsSync(uiDir)) {
    return [];
  }

  const files = fs.readdirSync(uiDir);
  const components = [];

  // List of known standard shadcn components
  const standardComponents = [
    "accordion",
    "alert-dialog",
    "alert",
    "aspect-ratio",
    "avatar",
    "badge",
    "breadcrumb",
    "button",
    "calendar",
    "card",
    "carousel",
    "chart",
    "checkbox",
    "collapsible",
    "command",
    "context-menu",
    "dialog",
    "drawer",
    "dropdown-menu",
    "form",
    "hover-card",
    "input-otp",
    "input",
    "label",
    "menubar",
    "navigation-menu",
    "pagination",
    "popover",
    "progress",
    "radio-group",
    "resizable",
    "scroll-area",
    "select",
    "separator",
    "sheet",
    "sidebar",
    "skeleton",
    "slider",
    "sonner",
    "switch",
    "table",
    "tabs",
    "textarea",
    "toast",
    "toaster",
    "toggle-group",
    "toggle",
    "tooltip",
  ];

  for (const file of files) {
    const ext = path.extname(file);
    const basename = path.basename(file, ext);

    if (ext === ".jsx" || ext === ".tsx") {
      const isStandard = standardComponents.includes(basename);
      components.push({
        name: file,
        basename,
        extension: ext,
        isCustom: !isStandard,
        needsTsxMigration: ext === ".jsx",
      });
    }
  }

  return components;
}

/**
 * Audit all packages
 */
async function auditPackages() {
  console.log(
    `${colors.bold}${colors.blue}🔍 Starting Component Version Audit...${colors.reset}\n`,
  );

  const packageJson = readPackageJson();
  const radixPackages = getRadixPackages(packageJson);
  const relatedPackages = getRelatedPackages(packageJson);
  const allPackages = [...radixPackages, ...relatedPackages];

  console.log(
    `Found ${radixPackages.length} Radix UI packages and ${relatedPackages.length} related dependencies.\n`,
  );

  const results = [];
  let highSeverityCount = 0;
  let mediumSeverityCount = 0;
  let outdatedCount = 0;

  for (const pkg of allPackages) {
    console.log(`Checking ${pkg.name}...`);

    const info = await fetchPackageInfo(pkg.name);

    if (!info) {
      results.push({
        ...pkg,
        latestVersion: "unknown",
        isOutdated: false,
        reactCompatibility: "unknown",
        severity: SEVERITY.MEDIUM,
        hasMajorUpdate: false,
      });
      mediumSeverityCount++;
      continue;
    }

    const latestVersion = info.version;
    const outdated = isOutdated(pkg.currentVersion, latestVersion);
    const compat = checkReact19Compatibility(info.peerDependencies);
    const majorUpdate = hasMajorVersionChange(
      pkg.currentVersion,
      latestVersion,
    );

    const severity = compat.severity;

    if (severity === SEVERITY.HIGH) highSeverityCount++;
    if (severity === SEVERITY.MEDIUM) mediumSeverityCount++;
    if (outdated) outdatedCount++;

    results.push({
      ...pkg,
      latestVersion,
      isOutdated: outdated,
      reactCompatibility: compat.compatible,
      severity,
      hasMajorUpdate: majorUpdate,
    });
  }

  // Scan components
  const components = scanComponentsDirectory();

  return {
    results,
    components,
    summary: {
      total: allPackages.length,
      outdated: outdatedCount,
      highSeverity: highSeverityCount,
      mediumSeverity: mediumSeverityCount,
      componentsTotal: components.length,
      customComponents: components.filter((c) => c.isCustom).length,
      jsxComponents: components.filter((c) => c.needsTsxMigration).length,
    },
  };
}

/**
 * Generate JSON report
 */
function generateJsonReport(auditData) {
  const report = {
    timestamp: new Date().toISOString(),
    packages: auditData.results,
    components: auditData.components,
    summary: auditData.summary,
  };

  const outputPath = path.join(process.cwd(), "scripts/audit-results.json");
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(
    `\n${colors.green}✓ JSON report saved to: scripts/audit-results.json${colors.reset}`,
  );
}

/**
 * Generate Markdown report
 */
function generateMarkdownReport(auditData) {
  const { results, components, summary } = auditData;

  // Sort by severity
  const sorted = results.sort((a, b) => {
    const severityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  let md = "# Component Version Audit Report\n\n";
  md += `**Generated**: ${new Date().toLocaleString()}\n\n`;

  // Summary
  md += "## Summary\n\n";
  md += `- **Total packages audited**: ${summary.total}\n`;
  md += `- **Packages needing updates**: ${summary.outdated}\n`;
  md += `- **High severity issues**: ${summary.highSeverity}\n`;
  md += `- **Medium severity issues**: ${summary.mediumSeverity}\n`;
  md += `- **Total components**: ${summary.componentsTotal}\n`;
  md += `- **Custom components**: ${summary.customComponents}\n`;
  md += `- **Components needing .tsx migration**: ${summary.jsxComponents}\n\n`;

  // Package table
  md += "## Package Details\n\n";
  md += "| Package | Current | Latest | Status | React 19 | Severity |\n";
  md += "|---------|---------|--------|--------|----------|----------|\n";

  for (const pkg of sorted) {
    const status = pkg.isOutdated ? "⚠️ Outdated" : "✅ Up-to-date";
    const compat =
      pkg.reactCompatibility === "yes"
        ? "✅ Yes"
        : pkg.reactCompatibility === "no"
          ? "❌ No"
          : "⚠️ Verify";
    const severity =
      pkg.severity === "HIGH"
        ? "🔴 HIGH"
        : pkg.severity === "MEDIUM"
          ? "🟡 MEDIUM"
          : "🟢 LOW";

    md += `| \`${pkg.name}\` | ${pkg.currentVersion} | ${pkg.latestVersion} | ${status} | ${compat} | ${severity} |\n`;
  }

  // Recommendations
  md += "\n## Recommended Actions\n\n";

  const highSeverityPkgs = sorted.filter((p) => p.severity === SEVERITY.HIGH);
  if (highSeverityPkgs.length > 0) {
    md += "### 🔴 High Priority\n\n";
    for (const pkg of highSeverityPkgs) {
      md += `- **${pkg.name}**: Update to ${pkg.latestVersion}`;
      if (pkg.hasMajorUpdate) {
        md += ` (⚠️ Major version change - check [CHANGELOG](https://www.npmjs.com/package/${pkg.name}))`;
      }
      md += "\n";
    }
    md += "\n";
  }

  const outdatedPkgs = sorted.filter(
    (p) => p.isOutdated && p.severity !== SEVERITY.HIGH,
  );
  if (outdatedPkgs.length > 0) {
    md += "### 🟡 Recommended Updates\n\n";
    md += "```bash\n";

    // Group Radix UI updates
    const radixUpdates = outdatedPkgs.filter((p) =>
      p.name.startsWith("@radix-ui/"),
    );
    if (radixUpdates.length > 0) {
      md += 'pnpm update "@radix-ui/*"\n';
    }

    // Individual updates for related packages
    const relatedUpdates = outdatedPkgs.filter(
      (p) => !p.name.startsWith("@radix-ui/"),
    );
    if (relatedUpdates.length > 0) {
      md += `pnpm update ${relatedUpdates.map((p) => p.name).join(" ")}\n`;
    }

    md += "```\n\n";
  }

  // Components
  md += "## Components\n\n";
  md += `Found ${components.length} component files in \`src/components/ui/\`\n\n`;

  const customComps = components.filter((c) => c.isCustom);
  if (customComps.length > 0) {
    md += "### Custom Components (Manual Review Needed)\n\n";
    for (const comp of customComps) {
      md += `- \`${comp.name}\`\n`;
    }
    md += "\n";
  }

  const jsxComps = components.filter((c) => c.needsTsxMigration);
  if (jsxComps.length > 0) {
    md += "### Components Needing .tsx Migration\n\n";
    for (const comp of jsxComps) {
      md += `- \`${comp.name}\` → \`${comp.basename}.tsx\`\n`;
    }
    md += "\n";
  }

  // Links
  md += "## Useful Links\n\n";
  md +=
    "- [Radix UI Documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)\n";
  md += "- [shadcn/ui Changelog](https://ui.shadcn.com/docs/changelog)\n";
  md +=
    "- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)\n";

  const outputPath = path.join(process.cwd(), "scripts/audit-results.md");
  fs.writeFileSync(outputPath, md);
  console.log(
    `${colors.green}✓ Markdown report saved to: scripts/audit-results.md${colors.reset}`,
  );
}

/**
 * Display terminal summary
 */
function displayTerminalSummary(auditData) {
  const { summary } = auditData;

  console.log(
    `\n${colors.bold}═══════════════════════════════════════${colors.reset}`,
  );
  console.log(`${colors.bold}           AUDIT SUMMARY${colors.reset}`);
  console.log(
    `${colors.bold}═══════════════════════════════════════${colors.reset}\n`,
  );

  console.log(`Total packages:          ${summary.total}`);
  console.log(
    `Outdated packages:       ${colors.yellow}${summary.outdated}${colors.reset}`,
  );
  console.log(
    `High severity issues:    ${summary.highSeverity > 0 ? colors.red : colors.green}${summary.highSeverity}${colors.reset}`,
  );
  console.log(
    `Medium severity issues:  ${colors.yellow}${summary.mediumSeverity}${colors.reset}`,
  );
  console.log(`\nComponents found:        ${summary.componentsTotal}`);
  console.log(`Custom components:       ${summary.customComponents}`);
  console.log(`Need .tsx migration:     ${summary.jsxComponents}`);

  console.log(
    `\n${colors.bold}═══════════════════════════════════════${colors.reset}\n`,
  );
}

/**
 * Main execution
 */
async function main() {
  try {
    const auditData = await auditPackages();

    generateJsonReport(auditData);
    generateMarkdownReport(auditData);
    displayTerminalSummary(auditData);

    // Exit code
    const exitCode = auditData.summary.highSeverity > 0 ? 1 : 0;

    if (exitCode === 1) {
      console.log(
        `${colors.red}${colors.bold}⚠ High severity issues found. Please review the report.${colors.reset}\n`,
      );
    } else {
      console.log(
        `${colors.green}${colors.bold}✓ Audit complete. No critical issues found.${colors.reset}\n`,
      );
    }

    process.exit(exitCode);
  } catch (error) {
    console.error(
      `${colors.red}${colors.bold}✗ Audit failed: ${error.message}${colors.reset}`,
    );
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { auditPackages, fetchPackageInfo };
