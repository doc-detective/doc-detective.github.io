---
sidebar_position: 12
---

# loadCookie

Load a previously saved cookie from a file into the browser session.

## Syntax

### String shorthand

```json
"loadCookie": "cookie-name"
```

### Object

```json
{
  "loadCookie": {
    "name": "cookie-name",
    "path": "path/to/cookie-file.txt"
  }
}
```

## Fields

| Field | Type | Description | Default |
| :-- | :-- | :-- | :-- |
| `name` | string | **Required.** Name of the cookie to load. | |
| `path` | string | Path to the cookie file to load. | `{cookie-name}.txt` |

## Examples

### Load a specific cookie

```json
{
  "steps": [
    {
      "goTo": "https://example.com"
    },
    {
      "loadCookie": {
        "name": "session_id",
        "path": "session-cookie.txt"
      }
    }
  ]
}
```

### Load cookie with default filename

```json
{
  "steps": [
    {
      "goTo": "https://example.com"
    },
    {
      "loadCookie": "auth_token"
    }
  ]
}
```

## Notes

- The cookie file must exist and be readable before it can be loaded
- Use this action in combination with [saveCookie](/docs/get-started/actions/saveCookie) to persist authentication across test sessions
- Cookies are loaded into the current browser session and will be sent with subsequent requests to the appropriate domain
- The target website must be loaded (via [goTo](/docs/get-started/actions/goTo)) before loading cookies to ensure proper domain context