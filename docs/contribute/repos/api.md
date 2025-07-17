---
sidebar_position: 7
---

# `api`

[`api`](https://github.com/doc-detective/api) is the REST API service for Doc Detective that provides endpoints for managing accounts, API keys, and test runs. It serves as the backend service for Doc Detective's cloud-based testing infrastructure.

This repository provides a comprehensive HTTP API built with Express.js and OpenAPI specifications, enabling programmatic access to Doc Detective's core functionality through RESTful endpoints.

## Key Features

- **Account Management**: Create, read, update, and delete user accounts
- **API Key Management**: Generate, manage, and revoke API keys for authentication
- **Test Run Management**: Execute and manage Doc Detective test runs
- **OpenAPI Integration**: Full OpenAPI 3.0 specification with automated validation
- **Security**: Secure password hashing, API key authentication, and input validation
- **Database Integration**: Persistent storage for accounts, API keys, and test results

## Dependencies

This repository depends on:
- [`doc-detective-core`](doc-detective-core) for test execution logic
- [`doc-detective-common`](doc-detective-common) for shared schemas and validation

## Architecture

The API follows a modular handler-based architecture:

- **Handlers**: Individual endpoint handlers organized by resource type (accounts, apiKeys, runs)
- **Services**: Shared database and utility services
- **Types**: TypeScript type definitions and Zod schemas for validation
- **OpenAPI**: Complete API specification for documentation and validation

## Authentication

The API uses API key-based authentication via the `x-api-key` header. API keys are securely hashed and stored, with only the key ID returned in responses for security.

## Account Management Endpoints

### Create Account
```bash
POST /accounts
Content-Type: application/json
x-api-key: your-api-key

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Get Account
```bash
GET /accounts/{accountId}
x-api-key: your-api-key
```

### Update Account
```bash
PUT /accounts/{accountId}
Content-Type: application/json
x-api-key: your-api-key

{
  "email": "newemail@example.com",
  "password": "newpassword"
}
```

### Delete Account
```bash
DELETE /accounts/{accountId}
x-api-key: your-api-key
```

### List Accounts
```bash
GET /accounts
x-api-key: your-api-key
```

## API Key Management Endpoints

### Create API Key
```bash
POST /accounts/{accountId}/keys
x-api-key: your-api-key
```

### Get API Key
```bash
GET /accounts/{accountId}/keys/{keyId}
x-api-key: your-api-key
```

### Update API Key
```bash
PUT /accounts/{accountId}/keys/{keyId}
Content-Type: application/json
x-api-key: your-api-key

{
  "newApiKey": "new-api-key-value"
}
```

### Delete API Key
```bash
DELETE /accounts/{accountId}/keys/{keyId}
x-api-key: your-api-key
```

### List API Keys
```bash
GET /accounts/{accountId}/keys
x-api-key: your-api-key
```

## Security Features

- **Password Hashing**: Passwords are hashed using HMAC-SHA256 with salt
- **API Key Hashing**: API keys are securely hashed before storage
- **Input Validation**: Comprehensive validation using Zod schemas
- **Response Security**: Sensitive data (passwords, raw API keys) never returned in responses
- **Authentication**: All endpoints require valid API key authentication

## Database Schema

The API expects these database tables:

### Accounts Table
- `accountId` (string, primary key)
- `email` (string, unique)
- `password` (string, hashed)
- `createdAt` (datetime)
- `updatedAt` (datetime)

### API Keys Table
- `keyId` (string, primary key)
- `accountId` (string, foreign key)
- `apiKey` (string, hashed)
- `createdAt` (datetime)
- `updatedAt` (datetime)

## Error Handling

The API returns consistent error responses with appropriate HTTP status codes:

- `400 Bad Request`: Invalid input data or missing required fields
- `401 Unauthorized`: Missing or invalid API key
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side errors

## Development

To contribute to the API repository:

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up environment variables (API_KEY_SALT, database configuration)
4. Run tests with `npm test`
5. Start development server with `npm run dev`

The API follows the same contribution guidelines as other Doc Detective repositories, including the CLA requirement and pull request workflow targeting the release candidate (rc) branch.