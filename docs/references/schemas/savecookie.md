# saveCookie



## Referenced In

- [Markup definition](/docs/references/schemas/markup-definition)
- [test](/docs/references/schemas/test)
- [Resolved context](/docs/references/schemas/resolved-context)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
saveCookie | string or object([Save cookie (detailed)](/docs/references/schemas/save-cookie-detailed)) | Required. Save a specific browser cookie to a file or environment variable for later reuse. | 

## Examples

```json
{
  "saveCookie": "session_token"
}
```

```json
{
  "saveCookie": {
    "name": "auth_cookie",
    "path": "auth-cookie.txt"
  }
}
```

```json
{
  "saveCookie": {
    "name": "session_token",
    "variable": "SESSION_TOKEN"
  }
}
```

```json
{
  "saveCookie": {
    "name": "user_session",
    "path": "user-session.txt",
    "directory": "./test-data",
    "overwrite": "true"
  }
}
```

```json
{
  "saveCookie": {
    "name": "login_token",
    "path": "login-token.txt",
    "domain": "app.example.com"
  }
}
```