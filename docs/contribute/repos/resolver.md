---
sidebar_position: 4
---

# `doc-detective-resolver`

[`doc-detective-resolver`](https://github.com/doc-detective/resolver) is an NPM package that detects and resolves documentation into Doc Detective tests. It's installable via NPM (`npm i doc-detective-resolver`).

This repo depends on [`doc-detective-common`](doc-detective-common) for JSON schema definitions, schema validation logic, and path resolution logic.

## Contributing code

Code contributions to `doc-detective-resolver` need tests that maintain code coverage. This keeps the resolver stable across the Doc Detective ecosystem.

### Test requirements

Your contribution needs:

- **Unit tests**: Each source file in `src/` needs a corresponding test file (also in `src/`)
- **Minimum coverage**: All metrics must meet or exceed baseline thresholds
- **Coverage ratchet**: Coverage can't decrease from current baselines

Test file locations:

| Source file | Test file |
|-------------|-----------|
| `src/openapi.js` | `src/openapi.test.js` |
| `src/arazzo.js` | `src/arazzo.test.js` |
| `src/resolve.js` | `src/resolve.test.js` |
| `src/sanitize.js` | `src/sanitize.test.js` |
| `src/utils.js` | `src/utils.test.js` |
| `src/config.js` | `src/config.test.js` |
| `src/heretto.js` | `src/heretto.test.js` |
| `src/telem.js` | `src/telem.test.js` |

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
npm run coverage:ratchet
```

Run all tests including integration tests:

```bash
npm run test:all
```

Run all tests with coverage:

```bash
npm run test:all:coverage
```

### How coverage is enforced

The coverage ratchet check runs automatically in CI. It compares your coverage against baseline thresholds in `coverage-thresholds.json`. If coverage decreases, the build fails.

Current thresholds:

| Metric | Threshold |
|--------|-----------|
| Lines | 87% |
| Statements | 87% |
| Functions | 97% |
| Branches | 84% |

To pass the ratchet check:

1. Write tests for all new code
2. Run `npm run coverage:ratchet` locally
3. If the check fails, add tests until coverage is restored
4. Commit your tests with your code changes

### Test-driven development

TDD works well here. It helps you catch edge cases early and maintain coverage naturally:

1. Write tests that describe expected behavior (tests should fail)
2. Implement the code to make tests pass
3. Refactor while keeping tests passing
4. Verify coverage with `npm run coverage:ratchet`
