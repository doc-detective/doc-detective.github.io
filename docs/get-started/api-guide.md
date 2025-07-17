---
sidebar_position: 8
---

# API Guide

The Doc Detective API provides RESTful endpoints for managing accounts, API keys, and test runs programmatically. This guide covers authentication, available endpoints, and usage examples.

## Base URL

The API is available at: `https://api.doc-detective.com` (replace with actual URL when deployed)

## Authentication

All API endpoints require authentication using an API key passed in the `x-api-key` header:

```bash
curl -H "x-api-key: your-api-key-here" https://api.doc-detective.com/accounts
```

## Account Management

### Create Account

Create a new user account with email and password.

**Endpoint:** `POST /accounts`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "accountId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Example:**
```bash
curl -X POST https://api.doc-detective.com/accounts \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

### Get Account

Retrieve account information by account ID.

**Endpoint:** `GET /accounts/{accountId}`

**Response (200 OK):**
```json
{
  "accountId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Example:**
```bash
curl https://api.doc-detective.com/accounts/550e8400-e29b-41d4-a716-446655440000 \
  -H "x-api-key: your-api-key"
```

### Update Account

Update account email or password.

**Endpoint:** `PUT /accounts/{accountId}`

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "accountId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Example:**
```bash
curl -X PUT https://api.doc-detective.com/accounts/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "email": "newemail@example.com"
  }'
```

### Delete Account

Delete an account permanently.

**Endpoint:** `DELETE /accounts/{accountId}`

**Response (204 No Content)**

**Example:**
```bash
curl -X DELETE https://api.doc-detective.com/accounts/550e8400-e29b-41d4-a716-446655440000 \
  -H "x-api-key: your-api-key"
```

### List Accounts

Retrieve all accounts.

**Endpoint:** `GET /accounts`

**Response (200 OK):**
```json
{
  "accounts": [
    {
      "accountId": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user1@example.com",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "accountId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "email": "user2@example.com",
      "createdAt": "2024-01-16T14:20:00Z",
      "updatedAt": "2024-01-16T14:20:00Z"
    }
  ]
}
```

**Example:**
```bash
curl https://api.doc-detective.com/accounts \
  -H "x-api-key: your-api-key"
```

## API Key Management

### Create API Key

Generate a new API key for an account.

**Endpoint:** `POST /accounts/{accountId}/keys`

**Response (201 Created):**
```json
{
  "apiKey": "dd_1234567890abcdef1234567890abcdef12345678"
}
```

:::warning
The API key is only returned once during creation. Store it securely as it cannot be retrieved again.
:::

**Example:**
```bash
curl -X POST https://api.doc-detective.com/accounts/550e8400-e29b-41d4-a716-446655440000/keys \
  -H "x-api-key: your-api-key"
```

### Get API Key

Retrieve API key information (returns key ID, not the actual key).

**Endpoint:** `GET /accounts/{accountId}/keys/{keyId}`

**Response (200 OK):**
```json
{
  "apiKey": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Example:**
```bash
curl https://api.doc-detective.com/accounts/550e8400-e29b-41d4-a716-446655440000/keys/550e8400-e29b-41d4-a716-446655440001 \
  -H "x-api-key: your-api-key"
```

### Update API Key

Generate a new API key value for an existing key ID.

**Endpoint:** `PUT /accounts/{accountId}/keys/{keyId}`

**Request Body:**
```json
{
  "newApiKey": "dd_newkey1234567890abcdef1234567890abcdef"
}
```

**Response (200 OK):**
```json
{
  "keyId": "550e8400-e29b-41d4-a716-446655440001",
  "accountId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Example:**
```bash
curl -X PUT https://api.doc-detective.com/accounts/550e8400-e29b-41d4-a716-446655440000/keys/550e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "newApiKey": "dd_newkey1234567890abcdef1234567890abcdef"
  }'
```

### Delete API Key

Revoke an API key permanently.

**Endpoint:** `DELETE /accounts/{accountId}/keys/{keyId}`

**Response (204 No Content)**

**Example:**
```bash
curl -X DELETE https://api.doc-detective.com/accounts/550e8400-e29b-41d4-a716-446655440000/keys/550e8400-e29b-41d4-a716-446655440001 \
  -H "x-api-key: your-api-key"
```

### List API Keys

Retrieve all API keys for an account (returns key IDs only).

**Endpoint:** `GET /accounts/{accountId}/keys`

**Response (200 OK):**
```json
{
  "apiKeys": [
    "550e8400-e29b-41d4-a716-446655440001",
    "6ba7b810-9dad-11d1-80b4-00c04fd430c9"
  ]
}
```

**Example:**
```bash
curl https://api.doc-detective.com/accounts/550e8400-e29b-41d4-a716-446655440000/keys \
  -H "x-api-key: your-api-key"
```

## Error Responses

The API returns consistent error responses with appropriate HTTP status codes:

### 400 Bad Request
```json
{
  "code": 400,
  "message": "Couldn't create the account. 'email' or 'password' is invalid."
}
```

### 401 Unauthorized
```json
{
  "code": 401,
  "message": "Unauthorized. Valid API key required."
}
```

### 404 Not Found
```json
{
  "code": 404,
  "message": "Couldn't find the account."
}
```

### 500 Internal Server Error
```json
{
  "code": 500,
  "message": "Couldn't create the account. Try again later."
}
```

## Security Best Practices

### API Key Management
- Store API keys securely and never commit them to version control
- Use environment variables or secure key management systems
- Rotate API keys regularly
- Revoke unused or compromised keys immediately

### Password Security
- Use strong, unique passwords for accounts
- Consider implementing password policies in your application
- Hash passwords client-side when possible for additional security

### Request Security
- Always use HTTPS when making API requests
- Validate and sanitize all input data
- Implement rate limiting to prevent abuse
- Monitor API usage for suspicious activity

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **GET endpoints**: 100 requests per minute
- **POST endpoints**: 50 requests per minute
- **PUT/DELETE endpoints**: 30 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## SDK and Libraries

While the API can be used directly with HTTP clients, consider using official SDKs when available:

- **JavaScript/Node.js**: `npm install @doc-detective/api-client` (coming soon)
- **Python**: `pip install doc-detective-api` (coming soon)
- **Go**: `go get github.com/doc-detective/go-client` (coming soon)

## Support

For API support and questions:

- 📖 [API Documentation](https://api.doc-detective.com/docs) (OpenAPI/Swagger)
- 💬 [Discord Community](https://discord.gg/doc-detective)
- 🐛 [GitHub Issues](https://github.com/doc-detective/api/issues)
- 📧 Email: api-support@doc-detective.com