# loadCookie



## Referenced In

- [Markup definition](/docs/references/schemas/markup-definition)
- [test](/docs/references/schemas/test)
- [Resolved context](/docs/references/schemas/resolved-context)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
loadCookie | string or object([Load cookie (detailed)](/docs/references/schemas/load-cookie-detailed)) | Required. Load a specific cookie from a file or environment variable into the browser. | 

## Examples

```json
{
  "loadCookie": "session_token"
}
```

```json
{
  "loadCookie": "./test-data/auth-session.txt"
}
```

```json
{
  "loadCookie": {
    "name": "auth_cookie",
    "variable": "AUTH_COOKIE"
  }
}
```

```json
{
  "loadCookie": {
    "name": "session_token",
    "path": "session-token.txt",
    "directory": "./test-data"
  }
}
```

```json
{
  "loadCookie": {
    "name": "user_session",
    "path": "saved-cookies.txt",
    "domain": "app.example.com"
  }
}
```