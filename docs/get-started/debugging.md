---
sidebar_position: 6
---

# Debugging Tests

Doc Detective provides comprehensive debugging capabilities to help you troubleshoot and step through your tests. The debug mode system operates on a hierarchical structure, allowing you to control debugging behavior at multiple levels.

## Debug Mode Hierarchy

Debug settings follow a hierarchical override system:

1. **Config level** - Global default (`config.debug`)
2. **Spec level** - Overrides config (`spec.debug`) 
3. **Test level** - Overrides spec/config (`test.debug`)
4. **Step level** - Individual breakpoints (`step.breakpoint`)

Each level can override the settings from higher levels, giving you fine-grained control over debugging behavior.

## Debug Mode Values

All debug properties support three values:

- `false` - Disable debugging (default)
- `true` - Enable debugging with breakpoint support  
- `"stepThrough"` - Pause at every step waiting for user input

## Configuration Level

Set global debug defaults in your `.doc-detective.json` configuration file:

```json
{
  "debug": true,
  "input": "tests/",
  "output": "results/"
}
```

## Specification Level

Override global debug settings for an entire test specification:

```json
{
  "specId": "api-tests",
  "debug": "stepThrough",
  "tests": [
    {
      "steps": [
        {
          "checkLink": "https://api.example.com"
        }
      ]
    }
  ]
}
```

## Test Level

Control debugging for individual tests, overriding both config and spec settings:

```json
{
  "tests": [
    {
      "testId": "critical-test",
      "debug": true,
      "steps": [
        {
          "goTo": "https://example.com"
        },
        {
          "find": {
            "selector": "[name='q']"
          }
        }
      ]
    }
  ]
}
```

## Step Level Breakpoints

Set breakpoints on individual steps regardless of higher-level debug settings:

```json
{
  "tests": [
    {
      "testId": "detailed-test",
      "debug": "stepThrough",
      "steps": [
        {
          "goTo": "https://example.com"
        },
        {
          "checkLink": "https://api.example.com",
          "breakpoint": true
        },
        {
          "screenshot": true
        }
      ]
    }
  ]
}
```

## Debugging Workflows

### Step-Through Debugging

Use `"stepThrough"` mode to pause at every step:

```json
{
  "testId": "step-by-step-test",
  "debug": "stepThrough",
  "steps": [
    {
      "goTo": "https://example.com"
    },
    {
      "find": {
        "selector": "input[type='search']"
      }
    },
    {
      "type": "search query"
    }
  ]
}
```

### Selective Debugging

Enable debugging globally but disable it for specific tests:

```json
{
  "debug": true,
  "tests": [
    {
      "testId": "fast-test",
      "debug": false,
      "steps": [
        {
          "checkLink": "https://example.com"
        }
      ]
    },
    {
      "testId": "debug-test",
      "steps": [
        {
          "goTo": "https://example.com",
          "breakpoint": true
        }
      ]
    }
  ]
}
```

### Critical Step Breakpoints

Set breakpoints only on critical steps:

```json
{
  "tests": [
    {
      "testId": "api-validation",
      "steps": [
        {
          "loadVariables": ".env"
        },
        {
          "httpRequest": {
            "url": "https://api.example.com/users",
            "method": "POST"
          },
          "breakpoint": true
        },
        {
          "screenshot": true
        }
      ]
    }
  ]
}
```

## Best Practices

### Development vs Production

Use different configurations for development and production:

**Development (.doc-detective.dev.json):**
```json
{
  "debug": "stepThrough",
  "input": "tests/",
  "logLevel": "debug"
}
```

**Production (.doc-detective.json):**
```json
{
  "debug": false,
  "input": "tests/",
  "logLevel": "info"
}
```

### Debugging Complex Tests

For complex tests, use a combination of approaches:

```json
{
  "specId": "complex-workflow",
  "debug": true,
  "tests": [
    {
      "testId": "setup-test",
      "debug": false,
      "steps": [
        {
          "loadVariables": ".env"
        }
      ]
    },
    {
      "testId": "main-test",
      "debug": "stepThrough",
      "steps": [
        {
          "goTo": "https://app.example.com"
        },
        {
          "find": {
            "selector": "#login-form"
          },
          "breakpoint": true
        },
        {
          "type": {
            "keys": ["$USERNAME$"]
          }
        }
      ]
    }
  ]
}
```

### Debugging Failed Tests

When tests fail, add breakpoints around the failing step:

```json
{
  "steps": [
    {
      "goTo": "https://example.com"
    },
    {
      "find": {
        "selector": "#problematic-element"
      },
      "breakpoint": true
    },
    {
      "click": {
        "selector": "#problematic-element"
      },
      "breakpoint": true
    }
  ]
}
```

## Running Tests with Debug Mode

Execute tests with debug configuration:

```bash
# Use specific config with debug enabled
npx doc-detective --config .doc-detective.dev.json

# Override debug setting via command line
npx doc-detective --debug true

# Step through all tests
npx doc-detective --debug stepThrough
```

## Next Steps

- Learn about [test configuration](/docs/get-started/config/contexts)
- Explore [action reference](/docs/get-started/actions)
- See [troubleshooting guide](/docs/get-started/resources)