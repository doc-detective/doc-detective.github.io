# Load cookie (detailed)

Load a specific cookie from a file or environment variable into the browser.

## Referenced In

- [loadCookie](/docs/references/schemas/loadcookie)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
name | string | **Required.** Name of the specific cookie to load. | 
variable | string | Environment variable name containing the cookie as JSON string. Cannot be used with `path`. | 
path | string | File path to cookie file, relative to directory. Supports Netscape cookie format. Cannot be used with `variable`. | 
directory | string | Directory containing the cookie file. | 
domain | string | Specific domain to filter the cookie by when loading from multi-cookie file (optional). | 

## Examples

```json
{
  "name": "auth_cookie",
  "variable": "AUTH_COOKIE"
}
```

```json
{
  "name": "session_token",
  "path": "session-token.txt",
  "directory": "./test-data"
}
```

```json
{
  "name": "user_session",
  "path": "saved-cookies.txt",
  "domain": "app.example.com"
}
```