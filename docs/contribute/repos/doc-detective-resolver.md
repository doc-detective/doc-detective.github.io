---
sidebar_position: 4
---

# `doc-detective-resolver`

[`doc-detective-resolver`](https://github.com/doc-detective/resolver) is an NPM package that scans documentation for test markup and converts it into executable Doc Detective tests. It's installable via NPM (`npm i doc-detective-resolver`).

This repo depends on [`doc-detective-common`](doc-detective-common) for JSON schema definitions, schema validation logic, and path resolution logic.

## TypeScript codebase

Source code is in TypeScript (`src/`) and compiles to JavaScript for distribution. Tests run against the compiled output in `dist/`.

### Building

```bash
npm run build
```

This compiles TypeScript to JavaScript and creates an ESM wrapper for dual module support. Build output goes to `dist/` and includes CommonJS modules (`*.js`), an ESM wrapper (`index.mjs`), and TypeScript declarations (`*.d.ts`).

### Development workflow

1. Edit TypeScript files in `src/`
2. Build with `npm run build`
3. Run tests with `npm test`

Tests run against the compiled output to ensure the published package works correctly.
