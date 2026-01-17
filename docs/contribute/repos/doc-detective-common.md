---
sidebar_position: 3
---

# `doc-detective-common`

[`doc-detective-common`](https://github.com/doc-detective/doc-detective-common) is an NPM package that contains shared schemas and logic used across Doc Detective repos. It's installable via NPM (`npm i doc-detective-common`). This package contains the JSON schemas that define each test action.

This repo doesn't depend on any other Doc Detective repos.

## TypeScript codebase

Source code is in TypeScript (`.ts` files in `src/`) and compiles to JavaScript for distribution. Tests run against the compiled output in `dist/`.

### Building

```bash
npm run build
```

This command:

- Processes JSON schemas
- Generates TypeScript type definitions from schemas
- Compiles TypeScript to JavaScript
- Creates both CommonJS and ESM outputs

Build output in `dist/`:

- `dist/*.js` - CommonJS modules
- `dist/*.mjs` - ESM modules
- `dist/*.d.ts` - TypeScript declarations

### Development workflow

1. Edit TypeScript files in `src/`
2. Build with `npm run build`
3. Run tests with `npm test`
4. Verify coverage with `npm run test:coverage:ratchet`

Tests are written in JavaScript and run against the compiled output to ensure the published package works correctly.

## Contributing code

`doc-detective-common` is shared across all Doc Detective repos, so keeping it stable and reliable is critical. That's why all code changes need tests that maintain 100% code coverage—it helps catch bugs before they affect multiple projects.

### What you need

When you contribute code, you'll need:

- **Unit tests**: Each source file in `src/` needs a corresponding test file in `test/`
- **100% coverage**: All metrics (lines, statements, functions, branches) stay at 100%
- **Coverage ratchet**: Coverage can't decrease from current baselines

Test file locations:

| Source file | Test file |
|-------------|-----------|
| `src/validate.ts` | `test/validate.test.js` |
| `src/resolvePaths.ts` | `test/resolvePaths.test.js` |
| `src/files.ts` | `test/files.test.js` |

### Running tests

Run the full test suite:

```bash
npm test
```

Run tests with coverage reporting:

```bash
npm run test:coverage
```

Verify coverage hasn't decreased:

```bash
npm run test:coverage:ratchet
```

Generate HTML coverage report:

```bash
npm run test:coverage:html
```

### How coverage is enforced

The coverage ratchet check runs automatically in CI. It compares your coverage against baseline thresholds in `coverage-thresholds.json`. If coverage decreases, the build fails.

Current thresholds:

| Metric | Threshold |
|--------|-----------|
| Lines | 100% |
| Statements | 100% |
| Functions | 100% |
| Branches | 100% |

To pass the ratchet check:

1. Write tests for all new code
2. Run `npm run test:coverage:ratchet` locally
3. If the check fails, add tests until coverage is restored
4. Commit your tests with your code changes

### Test-driven development

Test-driven development (TDD) works well for this repo. It helps you catch edge cases early and ensures you hit 100% coverage naturally:

1. Write tests that describe expected behavior (tests should fail)
2. Implement the code to make tests pass
3. Refactor while keeping tests passing
4. Verify coverage with `npm run test:coverage:ratchet`