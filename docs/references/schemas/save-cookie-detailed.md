# Save cookie (detailed)

Save a specific browser cookie to a file or environment variable for later reuse.

## Referenced In

- [saveCookie](/docs/references/schemas/savecookie)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
name | string | **Required.** Name of the specific cookie to save. | 
variable | string | Environment variable name to store the cookie as JSON string. Cannot be used with `path`. | 
path | string | File path to save the cookie, relative to directory. Uses Netscape cookie format. Cannot be used with `variable`. | 
directory | string | Directory to save the cookie file. If not specified, uses output directory. | 
overwrite | string | Whether to overwrite existing cookie file. Options: `"true"`, `"false"`. | `"false"`
domain | string | Specific domain to filter the cookie by (optional). | 

## Examples

```json
{
  "name": "auth_cookie",
  "path": "auth-cookie.txt"
}
```

```json
{
  "name": "session_token",
  "variable": "SESSION_TOKEN"
}
```

```json
{
  "name": "user_session",
  "path": "user-session.txt",
  "directory": "./test-data",
  "overwrite": "true"
}
```

```json
{
  "name": "login_token",
  "path": "login-token.txt",
  "domain": "app.example.com"
}
```