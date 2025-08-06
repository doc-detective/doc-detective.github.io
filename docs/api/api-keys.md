---
sidebar_position: 3
---

# API Key Management

API keys provide secure access to the Doc Detective API. Each account can have multiple API keys with different permissions and expiration dates.

## API Key Object

An API key object contains the following properties:

```json
{
  "id": "key_123456789",
  "name": "Production API Key",
  "key": "dd_live_1234567890abcdef...",
  "account_id": "account_123456789",
  "permissions": ["read", "write"],
  "status": "active",
  "expires_at": "2026-08-06T10:30:00Z",
  "created_at": "2025-08-06T10:30:00Z",
  "last_used_at": "2025-08-06T15:45:00Z"
}
```

### Properties

- `id` (string): Unique identifier for the API key
- `name` (string): Human-readable name for the API key
- `key` (string): The actual API key (only shown when created)
- `account_id` (string): ID of the account that owns this key
- `permissions` (array): Array of permissions (`read`, `write`, `admin`)
- `status` (string): Key status (`active`, `revoked`)
- `expires_at` (string, nullable): ISO 8601 timestamp when the key expires
- `created_at` (string): ISO 8601 timestamp of key creation
- `last_used_at` (string, nullable): ISO 8601 timestamp of last usage

## Create API Key

Generate a new API key for your account.

```http
POST /api-keys
```

### Request Body

```json
{
  "name": "Production API Key",
  "permissions": ["read", "write"],
  "expires_at": "2026-08-06T10:30:00Z"
}
```

### Parameters

- `name` (string): Human-readable name for the API key
- `permissions` (array): Array of permissions (`read`, `write`, `admin`)
- `expires_at` (string, optional): ISO 8601 timestamp when the key should expire

### Response

```json
{
  "success": true,
  "data": {
    "id": "key_123456789",
    "name": "Production API Key",
    "key": "dd_live_1234567890abcdef1234567890abcdef12345678",
    "account_id": "account_123456789",
    "permissions": ["read", "write"],
    "status": "active",
    "expires_at": "2026-08-06T10:30:00Z",
    "created_at": "2025-08-06T10:30:00Z",
    "last_used_at": null
  }
}
```

:::warning
The API key value is only shown once when created. Store it securely as you won't be able to retrieve it again.
:::

## Get API Key

Retrieve information about a specific API key.

```http
GET /api-keys/{key_id}
```

### Parameters

- `key_id` (string): The API key ID

### Response

```json
{
  "success": true,
  "data": {
    "id": "key_123456789",
    "name": "Production API Key",
    "account_id": "account_123456789",
    "permissions": ["read", "write"],
    "status": "active",
    "expires_at": "2026-08-06T10:30:00Z",
    "created_at": "2025-08-06T10:30:00Z",
    "last_used_at": "2025-08-06T15:45:00Z"
  }
}
```

:::note
The actual API key value is never returned in GET requests for security reasons.
:::

## List API Keys

List all API keys for your account.

```http
GET /api-keys
```

### Query Parameters

- `limit` (integer, optional): Number of keys to return (default: 50, max: 100)
- `offset` (integer, optional): Number of keys to skip (default: 0)
- `status` (string, optional): Filter by key status (`active`, `revoked`)

### Response

```json
{
  "success": true,
  "data": {
    "api_keys": [
      {
        "id": "key_123456789",
        "name": "Production API Key",
        "account_id": "account_123456789",
        "permissions": ["read", "write"],
        "status": "active",
        "expires_at": "2026-08-06T10:30:00Z",
        "created_at": "2025-08-06T10:30:00Z",
        "last_used_at": "2025-08-06T15:45:00Z"
      },
      {
        "id": "key_987654321",
        "name": "Development API Key",
        "account_id": "account_123456789",
        "permissions": ["read"],
        "status": "active",
        "expires_at": null,
        "created_at": "2025-08-05T09:15:00Z",
        "last_used_at": "2025-08-06T12:30:00Z"
      }
    ],
    "total": 2,
    "limit": 50,
    "offset": 0
  }
}
```

## Update API Key

Update an API key's name or permissions.

```http
PUT /api-keys/{key_id}
```

### Parameters

- `key_id` (string): The API key ID

### Request Body

```json
{
  "name": "Updated Production Key",
  "permissions": ["read", "write", "admin"]
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "key_123456789",
    "name": "Updated Production Key",
    "account_id": "account_123456789",
    "permissions": ["read", "write", "admin"],
    "status": "active",
    "expires_at": "2026-08-06T10:30:00Z",
    "created_at": "2025-08-06T10:30:00Z",
    "last_used_at": "2025-08-06T15:45:00Z"
  }
}
```

## Revoke API Key

Revoke an API key, making it unusable for future requests.

```http
DELETE /api-keys/{key_id}
```

### Parameters

- `key_id` (string): The API key ID

### Response

```json
{
  "success": true,
  "data": {
    "message": "API key successfully revoked"
  }
}
```

## Permissions

API keys can have the following permissions:

### read
- View account information
- List and retrieve test runs
- Download files and results
- View contexts and configurations

### write
- Create and execute test runs
- Upload and manage files
- Create and update contexts
- Modify account settings (own account only)

### admin
- All `read` and `write` permissions
- Manage other users' accounts (enterprise accounts only)
- Access billing and usage information
- Manage organization settings

## Security Best Practices

### Key Rotation
Regularly rotate your API keys, especially for production environments:

1. Create a new API key with the same permissions
2. Update your applications to use the new key
3. Revoke the old key once the transition is complete

### Environment-Specific Keys
Use different API keys for different environments:

- **Development**: Limited permissions, shorter expiration
- **Staging**: Similar to production but separate key
- **Production**: Full permissions, longer expiration, closely monitored

### Storage
- Never commit API keys to version control
- Use environment variables or secure key management systems
- Restrict access to API keys within your organization

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PERMISSIONS",
    "message": "Invalid permission specified"
  }
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key"
  }
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "API_KEY_NOT_FOUND",
    "message": "API key not found"
  }
}
```

### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "API key does not have required permissions"
  }
}
```