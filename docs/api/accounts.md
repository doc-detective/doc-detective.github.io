---
sidebar_position: 2
---

# Account Management

The Doc Detective API provides comprehensive account management capabilities, allowing you to create, read, update, and delete user accounts programmatically.

## Account Object

An account object contains the following properties:

```json
{
  "id": "account_123456789",
  "email": "user@example.com",
  "name": "John Doe",
  "plan": "pro",
  "status": "active",
  "created_at": "2025-08-06T10:30:00Z",
  "updated_at": "2025-08-06T10:30:00Z",
  "billing": {
    "subscription_id": "sub_123456789",
    "current_period_start": "2025-08-01T00:00:00Z",
    "current_period_end": "2025-09-01T00:00:00Z"
  }
}
```

### Properties

- `id` (string): Unique identifier for the account
- `email` (string): Account email address
- `name` (string): Account holder's name
- `plan` (string): Subscription plan (`free`, `pro`, `enterprise`)
- `status` (string): Account status (`active`, `suspended`, `deleted`)
- `created_at` (string): ISO 8601 timestamp of account creation
- `updated_at` (string): ISO 8601 timestamp of last update
- `billing` (object): Billing information (for paid plans)

## Create Account

Create a new user account.

```http
POST /accounts
```

### Request Body

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "secure_password_123"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "account_123456789",
    "email": "user@example.com",
    "name": "John Doe",
    "plan": "free",
    "status": "active",
    "created_at": "2025-08-06T10:30:00Z",
    "updated_at": "2025-08-06T10:30:00Z"
  }
}
```

## Get Account

Retrieve account information.

```http
GET /accounts/{account_id}
```

### Parameters

- `account_id` (string): The account ID

### Response

```json
{
  "success": true,
  "data": {
    "id": "account_123456789",
    "email": "user@example.com",
    "name": "John Doe",
    "plan": "pro",
    "status": "active",
    "created_at": "2025-08-06T10:30:00Z",
    "updated_at": "2025-08-06T10:30:00Z",
    "billing": {
      "subscription_id": "sub_123456789",
      "current_period_start": "2025-08-01T00:00:00Z",
      "current_period_end": "2025-09-01T00:00:00Z"
    }
  }
}
```

## Update Account

Update account information.

```http
PUT /accounts/{account_id}
```

### Parameters

- `account_id` (string): The account ID

### Request Body

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "account_123456789",
    "email": "jane@example.com",
    "name": "Jane Doe",
    "plan": "pro",
    "status": "active",
    "created_at": "2025-08-06T10:30:00Z",
    "updated_at": "2025-08-06T11:45:00Z",
    "billing": {
      "subscription_id": "sub_123456789",
      "current_period_start": "2025-08-01T00:00:00Z",
      "current_period_end": "2025-09-01T00:00:00Z"
    }
  }
}
```

## Delete Account

Delete an account. This action is irreversible and will permanently remove all associated data.

```http
DELETE /accounts/{account_id}
```

### Parameters

- `account_id` (string): The account ID

### Response

```json
{
  "success": true,
  "data": {
    "message": "Account successfully deleted"
  }
}
```

## List Accounts

List all accounts (admin only).

```http
GET /accounts
```

### Query Parameters

- `limit` (integer, optional): Number of accounts to return (default: 50, max: 100)
- `offset` (integer, optional): Number of accounts to skip (default: 0)
- `status` (string, optional): Filter by account status (`active`, `suspended`, `deleted`)
- `plan` (string, optional): Filter by subscription plan (`free`, `pro`, `enterprise`)

### Response

```json
{
  "success": true,
  "data": {
    "accounts": [
      {
        "id": "account_123456789",
        "email": "user@example.com",
        "name": "John Doe",
        "plan": "pro",
        "status": "active",
        "created_at": "2025-08-06T10:30:00Z",
        "updated_at": "2025-08-06T10:30:00Z"
      }
    ],
    "total": 1,
    "limit": 50,
    "offset": 0
  }
}
```

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid email format"
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
    "code": "ACCOUNT_NOT_FOUND",
    "message": "Account not found"
  }
}
```

### 409 Conflict

```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "An account with this email already exists"
  }
}
```