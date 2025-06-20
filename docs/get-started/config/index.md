---
title: Configuration
layout: default
nav_order: 1
description: Configure Doc Detective for your testing needs with options for parallel execution, file types, and more.
---

# Configuration

Doc Detective provides extensive configuration options to customize how tests are executed. You can configure Doc Detective using a `.doc-detective.json` file in your project root, or by passing configuration options directly via the command line.

## Configuration File

Create a `.doc-detective.json` file in your project root to define your configuration:

```json
{
  "input": "docs/",
  "output": "test-results/",
  "logLevel": "info",
  "concurrentRunners": true,
  "recursive": true
}
```

## Key Configuration Options

### Parallel Execution

Control how many tests run simultaneously using the `concurrentRunners` option:

- **`concurrentRunners: true`** - Automatically detects your CPU count and uses up to 4 concurrent runners
- **`concurrentRunners: 8`** - Uses exactly 8 concurrent runners (no cap on explicit values)
- **`concurrentRunners: 1`** - Runs tests sequentially (default)

```json
{
  "concurrentRunners": true
}
```

**Examples:**
- On a 2-core system: `concurrentRunners: true` → 2 runners
- On an 8-core system: `concurrentRunners: true` → 4 runners (capped)
- On a 16-core system: `concurrentRunners: true` → 4 runners (capped)
- Explicit value: `concurrentRunners: 8` → 8 runners (no cap)

### Input and Output

- **`input`** - Path(s) to test specifications and documentation files
- **`output`** - Directory for test results and generated files
- **`recursive`** - Whether to search directories recursively (default: `true`)

```json
{
  "input": ["tests/", "docs/"],
  "output": "test-results/",
  "recursive": true
}
```

### Logging

Control the amount of detail in test output:

```json
{
  "logLevel": "info"
}
```

Available levels: `silent`, `error`, `warning`, `info`, `debug`

### Environment Variables

Load environment variables from a `.env` file:

```json
{
  "loadVariables": ".env"
}
```

### File Types

Configure which file types Doc Detective should process:

```json
{
  "fileTypes": ["markdown", "asciidoc", "html"]
}
```

## Complete Example

```json
{
  "input": "docs/",
  "output": "test-results/",
  "recursive": true,
  "concurrentRunners": true,
  "logLevel": "info",
  "loadVariables": ".env",
  "origin": "https://example.com",
  "fileTypes": ["markdown"],
  "runOn": [
    {
      "platforms": ["windows", "mac", "linux"],
      "browsers": "chrome"
    }
  ]
}
```

## Command Line Overrides

You can override configuration file settings using command line arguments:

```bash
npx doc-detective --input tests/ --config custom-config.json
```

For a complete list of configuration options, see the [config schema reference](/docs/references/schemas/config).