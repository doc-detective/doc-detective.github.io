# Doc Detective Resolver

![Current version](https://img.shields.io/github/package-json/v/doc-detective/resolver?color=orange)
[![NPM Shield](https://img.shields.io/npm/v/doc-detective-resolver)](https://www.npmjs.com/package/doc-detective-resolver)
[![Discord Shield](https://img.shields.io/badge/chat-on%20discord-purple)](https://discord.gg/2M7wXEThfF)
[![Docs Shield](https://img.shields.io/badge/docs-doc--detective.com-blue)](https://doc-detective.com)

Detect and resolve documentation into Doc Detective tests. This package helps you find and process tests embedded in your documentation.

This package is part of the [Doc Detective](https://github.com/doc-detective/doc-detective) ecosystem.

## Install

```bash
npm i doc-detective-resolver
```

## Init

```javascript
const { detectTests, resolveTests, detectAndResolveTests } = require("doc-detective-resolver");
```

## Functions

### `detectAndResolveTests({ config })`

Detects and resolves tests based on the provided configuration. This function performs the complete workflow:
1. Sets and validates the configuration
2. Detects tests according to the configuration
3. Resolves the detected tests

Returns a promise that resolves to an object of resolved tests, or null if no tests are detected.

```javascript
const { detectAndResolveTests } = require("doc-detective-resolver");
const resolvedTests = await detectAndResolveTests({ config });
```

### `detectTests({ config })`

Detects and processes test specifications based on provided configuration without resolving them. This function:
1. Resolves configuration if not already done
2. Qualifies files based on configuration
3. Parses test specifications from the qualified files

Returns a promise resolving to an array of test specifications.

```javascript
const { detectTests } = require("doc-detective-resolver");
const detectedTests = await detectTests({ config });
```

### `resolveTests({ config, detectedTests })`

Resolves previously detected test configurations according to the provided configuration.

```javascript
const { detectTests, resolveTests } = require("doc-detective-resolver");
const detectedTests = await detectTests({ config });
const resolvedTests = await resolveTests({ config, detectedTests });
```

## Development with Workspaces

This package supports npm workspaces for developing `doc-detective-common` alongside the resolver. This allows you to modify both packages simultaneously and test changes together.

### Setting up Workspaces

The workspace setup happens automatically during `npm install`, but you can also set it up manually:

```bash
npm run workspace:install
```

This will:
- Clone the `doc-detective/common` repository into `workspaces/doc-detective-common`
- Install dependencies for the workspace package
- Set up the workspace configuration

### Working with Workspaces

Once set up, you can use standard npm workspace commands:

```bash
# Run tests across all workspaces
npm run workspace:test

# Build all workspace packages
npm run workspace:build

# Install a dependency in the common workspace
npm install <package> -w doc-detective-common

# Run commands in specific workspaces
npm run test -w doc-detective-common
npm run build -w doc-detective-common
```

### Environment Variables

- `NO_WORKSPACE_SETUP` - Skip workspace setup during postinstall
- `FORCE_WORKSPACE_SETUP` - Force workspace setup even in CI environments

## Contributions

Looking to help out? See our [contributions guide](https://github.com/doc-detective/doc-detective-resolver/blob/main/CONTRIBUTIONS.md) for more info. If you can't contribute code, you can still help by reporting issues, suggesting new features, improving the documentation, or sponsoring the project.
