---
title: saveCookie
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
description: Save a specific browser cookie to a file or environment variable for later reuse.
---

# saveCookie

The `saveCookie` action saves a specific browser cookie to a file or environment variable for later reuse. This action is useful for preserving authentication sessions, user preferences, or other stateful information between test runs or across different tests.

> For comprehensive options, see the [`saveCookie`](/docs/references/schemas/saveCookie) reference.

## Formats

The `saveCookie` action supports multiple formats:

### String format

Save a cookie by name to a default location:

```json
{
  "saveCookie": "session_token"
}
```

### Object format

Save a cookie with detailed configuration:

```json
{
  "saveCookie": {
    "name": "auth_cookie",
    "path": "auth-session.txt",
    "directory": "./test-data",
    "overwrite": "true"
  }
}
```

## Configuration options

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `name` | string | **Required.** Name of the specific cookie to save. | |
| `variable` | string | Environment variable name to store the cookie as JSON string. Cannot be used with `path`. | |
| `path` | string | File path to save the cookie, relative to directory. Uses Netscape cookie format. Cannot be used with `variable`. | |
| `directory` | string | Directory to save the cookie file. If not specified, uses output directory. | |
| `overwrite` | string | Whether to overwrite existing cookie file. Options: `"true"`, `"false"`. | `"false"` |
| `domain` | string | Specific domain to filter the cookie by (optional). | |

## Examples

### Save to default location

```json
{
  "steps": [
    {
      "description": "Navigate to login page and authenticate",
      "goTo": "https://example.com/login"
    },
    {
      "description": "Fill in login credentials",
      "find": {
        "elementText": "Username",
        "type": "testuser"
      }
    },
    {
      "description": "Save the session cookie after login",
      "saveCookie": "session_token"
    }
  ]
}
```

### Save to specific file

```json
{
  "steps": [
    {
      "description": "Save authentication cookie to specific file",
      "saveCookie": {
        "name": "auth_cookie",
        "path": "auth-session.txt",
        "directory": "./test-data",
        "overwrite": "true"
      }
    }
  ]
}
```

### Save to environment variable

```json
{
  "steps": [
    {
      "description": "Save session cookie to environment variable",
      "saveCookie": {
        "name": "session_token",
        "variable": "SESSION_TOKEN"
      }
    }
  ]
}
```

### Save with domain filtering

```json
{
  "steps": [
    {
      "description": "Save cookie for specific domain",
      "saveCookie": {
        "name": "login_token",
        "path": "login-token.txt",
        "domain": "app.example.com"
    }
  ]
}
```

## Use cases

- **Session persistence**: Save authentication cookies to maintain login state across test runs
- **Multi-step workflows**: Preserve cookies between different test specifications
- **Cross-browser testing**: Transfer cookies between different browser contexts
- **CI/CD integration**: Store authentication state as environment variables for automated testing
- **Test data management**: Save cookies to files for debugging and test data inspection

## Related actions

- [`loadCookie`](/docs/get-started/actions/loadCookie): Load a saved cookie back into the browser
- [`loadVariables`](/docs/get-started/actions/loadVariables): Load environment variables from .env files