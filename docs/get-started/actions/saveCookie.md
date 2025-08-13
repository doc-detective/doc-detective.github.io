---
sidebar_position: 11
---

# saveCookie

Save a browser cookie to a file for later use.

## Syntax

### String shorthand

```json
"saveCookie": "cookie-name"
```

### Object

```json
{
  "saveCookie": {
    "name": "cookie-name",
    "path": "path/to/cookie-file.txt",
    "overwrite": true
  }
}
```

## Fields

| Field | Type | Description | Default |
| :-- | :-- | :-- | :-- |
| `name` | string | **Required.** Name of the cookie to save. | |
| `path` | string | Path where the cookie file should be saved. | `{cookie-name}.txt` |
| `overwrite` | boolean | Whether to overwrite an existing cookie file. | `false` |

## Examples

### Save a specific cookie

```json
{
  "steps": [
    {
      "goTo": "https://example.com"
    },
    {
      "saveCookie": {
        "name": "session_id",
        "path": "session-cookie.txt",
        "overwrite": true
      }
    }
  ]
}
```

### Save cookie with default filename

```json
{
  "steps": [
    {
      "goTo": "https://example.com"
    },
    {
      "saveCookie": "auth_token"
    }
  ]
}
```

## Notes

- The cookie must exist in the current browser session before it can be saved
- Cookie files are saved in plain text format
- Use this action in combination with [loadCookie](/docs/get-started/actions/loadCookie) to persist authentication across test sessions
- Cookie files contain sensitive information and should be handled securely