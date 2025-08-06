---
sidebar_position: 9
---

# API Reference

Complete reference for all Doc Detective API endpoints.

## Base URL

```
https://api.doc-detective.com
```

## Authentication

All API requests require authentication using an API key in the Authorization header:

```http
Authorization: Bearer your-api-key-here
```

## Endpoints Overview

### Accounts
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/accounts` | Create a new account |
| `GET` | `/accounts/{account_id}` | Get account information |
| `PUT` | `/accounts/{account_id}` | Update account information |
| `DELETE` | `/accounts/{account_id}` | Delete an account |
| `GET` | `/accounts` | List accounts (admin only) |

### API Keys
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api-keys` | Create a new API key |
| `GET` | `/api-keys/{key_id}` | Get API key information |
| `PUT` | `/api-keys/{key_id}` | Update API key |
| `DELETE` | `/api-keys/{key_id}` | Revoke API key |
| `GET` | `/api-keys` | List API keys |

### Test Runs
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/runs` | Create and execute a test run |
| `GET` | `/runs/{run_id}` | Get test run information |
| `DELETE` | `/runs/{run_id}` | Cancel a test run |
| `GET` | `/runs` | List test runs |

### Files
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/files` | Upload a file |
| `GET` | `/files/{file_id}` | Get file information |
| `GET` | `/files/{file_id}/download` | Download file content |
| `PUT` | `/files/{file_id}` | Update file metadata |
| `DELETE` | `/files/{file_id}` | Delete a file |
| `GET` | `/files` | List files |

### Contexts
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/contexts` | Create a new context |
| `GET` | `/contexts/{context_id}` | Get context information |
| `PUT` | `/contexts/{context_id}` | Update context |
| `DELETE` | `/contexts/{context_id}` | Delete context |
| `POST` | `/contexts/{context_id}/set-default` | Set as default context |
| `GET` | `/contexts` | List contexts |

### Billing
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/billing/subscription` | Get subscription information |
| `GET` | `/billing/usage` | Get usage information |
| `GET` | `/billing/invoices` | List invoices |
| `GET` | `/billing/invoices/{invoice_id}` | Get specific invoice |

## HTTP Status Codes

The API uses standard HTTP status codes:

| Code | Description |
|------|-------------|
| `200` | OK - Request successful |
| `201` | Created - Resource created successfully |
| `400` | Bad Request - Invalid request parameters |
| `401` | Unauthorized - Invalid or missing API key |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource not found |
| `409` | Conflict - Resource conflict (e.g., duplicate email) |
| `413` | Payload Too Large - File too large |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error - Server error |
| `507` | Insufficient Storage - Storage quota exceeded |

## Rate Limits

API requests are rate limited per API key:

| Plan | Rate Limit |
|------|------------|
| Free | 60 requests/minute |
| Pro | 300 requests/minute |
| Enterprise | 1000 requests/minute |

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1691318400
```

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional error details"
    }
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `INVALID_REQUEST` | Request validation failed |
| `UNAUTHORIZED` | Invalid or missing API key |
| `INSUFFICIENT_PERMISSIONS` | API key lacks required permissions |
| `RESOURCE_NOT_FOUND` | Requested resource not found |
| `RESOURCE_CONFLICT` | Resource already exists |
| `USAGE_LIMIT_EXCEEDED` | Account usage limit exceeded |
| `RATE_LIMIT_EXCEEDED` | API rate limit exceeded |
| `INVALID_FILE_TYPE` | Unsupported file type |
| `FILE_TOO_LARGE` | File exceeds size limit |
| `STORAGE_QUOTA_EXCEEDED` | Account storage quota exceeded |

## Pagination

List endpoints support pagination using `limit` and `offset` parameters:

```http
GET /runs?limit=50&offset=100
```

Response includes pagination metadata:

```json
{
  "success": true,
  "data": {
    "runs": [...],
    "total": 250,
    "limit": 50,
    "offset": 100
  }
}
```

## Filtering

Many list endpoints support filtering:

```http
GET /runs?status=completed&created_after=2025-08-01T00:00:00Z
GET /files?category=screenshot&type=image/png
GET /contexts?platform=linux&browser=chrome
```

## Sorting

Some endpoints support sorting with the `sort` parameter:

```http
GET /runs?sort=created_at:desc
GET /files?sort=size:asc
```

## Field Selection

Reduce response size by selecting specific fields:

```http
GET /runs?fields=id,status,created_at
```

## Webhooks

Configure webhooks to receive notifications about events:

### Supported Events

- `run.created` - Test run created
- `run.started` - Test run started
- `run.completed` - Test run completed
- `run.failed` - Test run failed
- `file.uploaded` - File uploaded
- `subscription.updated` - Subscription changed
- `invoice.paid` - Invoice paid

### Webhook Payload

```json
{
  "event": "run.completed",
  "data": {
    "id": "run_123456789",
    "status": "completed",
    "results": {
      "summary": {
        "total_tests": 1,
        "passed": 1,
        "failed": 0
      }
    }
  },
  "timestamp": "2025-08-06T10:30:00Z",
  "account_id": "account_123456789"
}
```

## SDKs and Libraries

Official SDKs are available for popular programming languages:

### Node.js
```bash
npm install @doc-detective/api-client
```

```javascript
import { DocDetectiveAPI } from '@doc-detective/api-client';

const client = new DocDetectiveAPI('your-api-key');
const run = await client.runs.create({
  test_spec: { /* test specification */ }
});
```

### Python
```bash
pip install doc-detective-api
```

```python
from doc_detective import DocDetectiveAPI

client = DocDetectiveAPI('your-api-key')
run = client.runs.create({
    'test_spec': { # test specification }
})
```

### Go
```bash
go get github.com/doc-detective/go-client
```

```go
import "github.com/doc-detective/go-client"

client := docdetective.NewClient("your-api-key")
run, err := client.Runs.Create(ctx, &docdetective.CreateRunRequest{
    TestSpec: &docdetective.TestSpec{ /* test specification */ },
})
```

## OpenAPI Specification

The complete OpenAPI 3.0 specification is available at:

```
https://api.doc-detective.com/openapi.json
```

Use this specification to:
- Generate client libraries
- Import into API testing tools
- Validate requests and responses
- Generate documentation

## Examples

### cURL Examples

Create and run a test:
```bash
curl -X POST https://api.doc-detective.com/runs \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "test_spec": {
      "tests": [{
        "description": "Homepage test",
        "steps": [{
          "action": "goTo",
          "url": "https://example.com"
        }]
      }]
    }
  }'
```

Upload a file:
```bash
curl -X POST https://api.doc-detective.com/files \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@test-spec.json" \
  -F "category=test_spec"
```

### JavaScript Examples

Using fetch API:
```javascript
// Create a test run
const response = await fetch('https://api.doc-detective.com/runs', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    test_spec: {
      tests: [{
        description: 'Homepage test',
        steps: [{
          action: 'goTo',
          url: 'https://example.com'
        }]
      }]
    }
  })
});

const result = await response.json();
console.log('Test run created:', result.data.id);
```

### Python Examples

Using requests library:
```python
import requests

# Create a test run
response = requests.post(
    'https://api.doc-detective.com/runs',
    headers={'Authorization': 'Bearer your-api-key'},
    json={
        'test_spec': {
            'tests': [{
                'description': 'Homepage test',
                'steps': [{
                    'action': 'goTo',
                    'url': 'https://example.com'
                }]
            }]
        }
    }
)

result = response.json()
print(f"Test run created: {result['data']['id']}")
```

## Support

For API support:

- **Documentation**: [https://doc-detective.com/api](/api)
- **Discord**: [https://discord.gg/uAfSjVH7yr](https://discord.gg/uAfSjVH7yr)
- **GitHub Issues**: [https://github.com/doc-detective/api/issues](https://github.com/doc-detective/api/issues)
- **Email**: support@doc-detective.com