#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const semver = require("semver");

function execCommand(command, options = {}) {
  try {
    return execSync(command, {
      encoding: "utf8",
      stdio: "inherit",
      ...options,
    });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
}

function main() {
  // Clean git state
    execCommand("git checkout -- .");
    execCommand("git clean -fd");

  // Get current project version
  const packageJsonPath = path.join(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.error("Error: package.json not found");
    process.exit(1);
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const projVersion = semver.minVersion(packageJson.version);

  // Get doc-detective-common version
  const commonVersion = semver.minVersion(
    packageJson.dependencies?.["doc-detective-common"] ||
      packageJson.devDependencies?.["doc-detective-common"] ||
      ""
  );

  if (!commonVersion) {
    console.error("Error: doc-detective-common dependency not found");
    process.exit(1);
  }

  if (!semver.valid(projVersion)) {
    console.error(`Error: Invalid project version format: ${projVersion}`);
    process.exit(1);
  }

  // Extract major and minor versions using semver
  const projMajor = semver.major(projVersion);
  const projMinor = semver.minor(projVersion);
  const commonMajor = semver.major(commonVersion);
  const commonMinor = semver.minor(commonVersion);

  console.log(`Project version: ${projMajor}.${projMinor}.x`);
  console.log(`Common version: ${commonMajor}.${commonMinor}.x`);

  let newVersion;

  if (projMajor !== commonMajor || projMinor !== commonMinor) {
    // Major or minor mismatch: set version to match doc-detective-common major.minor.0
    newVersion = `${commonMajor}.${commonMinor}.0`;

    // Validate the new version before setting it
    if (!semver.valid(newVersion)) {
      console.error(`Error: Generated invalid version: ${newVersion}`);
      process.exit(1);
    }

    console.log(`Version mismatch detected. Setting version to: ${newVersion}`);
    execCommand(`npm version --no-git-tag-version ${newVersion}`);
  } else {
    // Project version is already equal or greater than common version, just bump patch
    console.log("Project version is current or ahead. Bumping patch version.");
    execCommand("npm version patch --no-git-tag-version");
    // Get the new version after bumping
    const updatedPackageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, "utf8")
    );
    newVersion = updatedPackageJson.version;
  }

  // Commit changes
  execCommand("git add package.json package-lock.json");
  execCommand(
    `git commit -m "Update doc-detective-common [skip ci]"`
  );

  // Create tag
  execCommand(`git tag "v${newVersion}"`);

  // Push changes and tags
  execCommand("git push");
  execCommand("git push --tags");

  // Output version (equivalent to echo in bash script)
  console.log(`version=${newVersion}`);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main };
