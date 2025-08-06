---
sidebar_position: 1
---

# API Overview

The Doc Detective API provides programmatic access to test execution, account management, and file handling capabilities. This RESTful API allows you to integrate Doc Detective testing into your applications, CI/CD pipelines, and automated workflows.

## Key Features

- **Account Management**: Create and manage user accounts with full CRUD operations
- **API Key Management**: Generate, rotate, and manage API keys for secure access
- **Test Run Management**: Execute tests, retrieve results, and manage test runs
- **File Handling**: Upload, manage, and organize test files and assets
- **Context Management**: Configure and manage test execution contexts
- **Billing Integration**: Access billing information and usage metrics

## Getting Started

To get started with the Doc Detective API:

1. [Create an account](/api/accounts) or sign in to your existing account
2. [Generate an API key](/api/api-keys) for authentication
3. [Run your first test](/api/runs) via the API
4. Explore the [file management](/api/files) and [context management](/api/contexts) features

## Authentication

All API requests require authentication using an API key. Include your API key in the `Authorization` header:

```http
Authorization: Bearer your-api-key-here
```

## Base URL

The Doc Detective API is available at:

```
https://api.doc-detective.com
```

## Rate Limits

API requests are subject to rate limiting to ensure fair usage. Rate limits vary by endpoint and account type. Check the response headers for current rate limit information:

- `X-RateLimit-Limit`: Maximum requests per time window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit resets

## Response Format

All API responses are returned in JSON format. Successful responses include the requested data, while error responses include an error message and relevant details:

```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

## Support

For API support and questions:

- Check the [API documentation](/api) for detailed endpoint information
- Visit our [Discord community](https://discord.gg/doc-detective) for community support
- Report issues on [GitHub](https://github.com/doc-detective/api/issues)