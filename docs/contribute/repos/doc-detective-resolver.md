---
sidebar_position: 6
---

# `doc-detective-resolver`

[`doc-detective-resolver`](https://github.com/doc-detective/doc-detective-resolver) is an NPM package that detects and resolves documentation into Doc Detective tests. It's installable via NPM (`npm i doc-detective-resolver`). This package provides the logic for parsing documentation files and converting them into executable test specifications.

This repo depends on [`doc-detective-common`](doc-detective-common) for JSON schema definitions, schema validation logic, and shared utilities.

## Development with Workspaces

The resolver supports npm workspaces for developing `doc-detective-common` alongside the resolver. This allows you to modify both packages simultaneously and test changes together without waiting for formal releases.

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

### Benefits

The workspace setup provides several advantages for development:

- **Simultaneous Development**: Modify both resolver and common packages together
- **Immediate Testing**: Test changes across packages without publishing
- **Simplified Workflow**: Single repository setup for related development work
- **Automatic Synchronization**: Workspace packages stay in sync with latest changes

This is particularly useful when working on features that require changes to both the resolver logic and the shared schemas or utilities in doc-detective-common.