---
sidebar_position: 8
---

# Quick Start Guide

Get up and running with the Doc Detective API in minutes. This guide walks you through creating an account, generating an API key, and running your first test.

## Step 1: Create an Account

First, create a Doc Detective account if you don't already have one:

```bash
curl -X POST https://api.doc-detective.com/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "name": "Your Name",
    "password": "secure_password_123"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "account_123456789",
    "email": "your-email@example.com",
    "name": "Your Name",
    "plan": "free",
    "status": "active"
  }
}
```

## Step 2: Generate an API Key

Create an API key for authentication:

```bash
curl -X POST https://api.doc-detective.com/api-keys \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-temporary-auth-token" \
  -d '{
    "name": "My First API Key",
    "permissions": ["read", "write"]
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "key_123456789",
    "name": "My First API Key",
    "key": "dd_live_1234567890abcdef1234567890abcdef12345678",
    "permissions": ["read", "write"]
  }
}
```

:::warning
Save your API key securely! It's only shown once and cannot be retrieved again.
:::

## Step 3: Run Your First Test

Now let's run a simple test that navigates to a website and takes a screenshot:

```bash
curl -X POST https://api.doc-detective.com/runs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer dd_live_1234567890abcdef1234567890abcdef12345678" \
  -d '{
    "test_spec": {
      "tests": [
        {
          "description": "Test homepage and take screenshot",
          "steps": [
            {
              "action": "goTo",
              "url": "https://doc-detective.com"
            },
            {
              "action": "find",
              "selector": "h1"
            },
            {
              "action": "screenshot",
              "path": "homepage.png"
            }
          ]
        }
      ]
    },
    "context": {
      "platform": "linux",
      "browser": {
        "name": "chrome",
        "headless": true
      }
    }
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "run_123456789",
    "status": "queued",
    "created_at": "2025-08-06T10:30:00Z"
  }
}
```

## Step 4: Check Test Results

Check the status and results of your test run:

```bash
curl -X GET https://api.doc-detective.com/runs/run_123456789 \
  -H "Authorization: Bearer dd_live_1234567890abcdef1234567890abcdef12345678"
```

Response (when completed):
```json
{
  "success": true,
  "data": {
    "id": "run_123456789",
    "status": "completed",
    "results": {
      "summary": {
        "total_tests": 1,
        "passed": 1,
        "failed": 0,
        "duration": 3.2
      },
      "tests": [
        {
          "description": "Test homepage and take screenshot",
          "status": "passed",
          "duration": 3.2,
          "steps": [
            {
              "action": "goTo",
              "status": "passed",
              "duration": 1.5
            },
            {
              "action": "find",
              "status": "passed",
              "duration": 0.8
            },
            {
              "action": "screenshot",
              "status": "passed",
              "duration": 0.9,
              "file_id": "file_987654321"
            }
          ]
        }
      ]
    }
  }
}
```

## Step 5: Download Generated Files

If your test generated files (like screenshots), you can download them:

```bash
curl -X GET https://api.doc-detective.com/files/file_987654321/download \
  -H "Authorization: Bearer dd_live_1234567890abcdef1234567890abcdef12345678" \
  -o homepage.png
```

## Common Use Cases

### API Testing

Test API endpoints directly:

```json
{
  "test_spec": {
    "tests": [
      {
        "description": "Test API endpoint",
        "steps": [
          {
            "action": "httpRequest",
            "url": "https://api.example.com/users",
            "method": "GET",
            "response": {
              "statusCodes": [200]
            }
          }
        ]
      }
    ]
  }
}
```

### Form Testing

Test form interactions:

```json
{
  "test_spec": {
    "tests": [
      {
        "description": "Test contact form",
        "steps": [
          {
            "action": "goTo",
            "url": "https://example.com/contact"
          },
          {
            "action": "find",
            "selector": "input[name='email']"
          },
          {
            "action": "type",
            "keys": "test@example.com"
          },
          {
            "action": "find",
            "selector": "textarea[name='message']"
          },
          {
            "action": "type",
            "keys": "This is a test message"
          },
          {
            "action": "click",
            "selector": "button[type='submit']"
          }
        ]
      }
    ]
  }
}
```

### Multi-Step Workflow

Test complex user workflows:

```json
{
  "test_spec": {
    "tests": [
      {
        "description": "User registration and login flow",
        "steps": [
          {
            "action": "goTo",
            "url": "https://example.com/register"
          },
          {
            "action": "type",
            "selector": "input[name='email']",
            "keys": "newuser@example.com"
          },
          {
            "action": "type",
            "selector": "input[name='password']",
            "keys": "securepassword123"
          },
          {
            "action": "click",
            "selector": "button[type='submit']"
          },
          {
            "action": "find",
            "elementText": "Registration successful"
          },
          {
            "action": "goTo",
            "url": "https://example.com/login"
          },
          {
            "action": "type",
            "selector": "input[name='email']",
            "keys": "newuser@example.com"
          },
          {
            "action": "type",
            "selector": "input[name='password']",
            "keys": "securepassword123"
          },
          {
            "action": "click",
            "selector": "button[type='submit']"
          },
          {
            "action": "find",
            "elementText": "Welcome"
          }
        ]
      }
    ]
  }
}
```

## Using Contexts

Create reusable execution contexts:

```bash
# Create a context
curl -X POST https://api.doc-detective.com/contexts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "name": "Desktop Chrome",
    "platform": "linux",
    "browser": {
      "name": "chrome",
      "headless": true,
      "viewport": {
        "width": 1920,
        "height": 1080
      }
    },
    "variables": {
      "BASE_URL": "https://staging.example.com"
    }
  }'

# Use the context in a test run
curl -X POST https://api.doc-detective.com/runs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "test_spec": {
      "tests": [
        {
          "description": "Test with context variables",
          "steps": [
            {
              "action": "goTo",
              "url": "$BASE_URL/login"
            }
          ]
        }
      ]
    },
    "context_id": "context_123456789"
  }'
```

## Error Handling

Always check for errors in API responses:

```javascript
const response = await fetch('https://api.doc-detective.com/runs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify(testSpec)
});

const result = await response.json();

if (!result.success) {
  console.error('API Error:', result.error.message);
  // Handle error appropriately
} else {
  console.log('Test run created:', result.data.id);
}
```

## Rate Limiting

Be aware of rate limits and implement appropriate retry logic:

```javascript
async function makeAPIRequest(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      // Rate limited, wait and retry
      const retryAfter = response.headers.get('Retry-After') || 60;
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      continue;
    }
    
    return response;
  }
  
  throw new Error('Max retries exceeded');
}
```

## Next Steps

Now that you've run your first test, explore more advanced features:

1. **[Account Management](/api/accounts)** - Manage your account settings
2. **[API Keys](/api/api-keys)** - Create and manage multiple API keys
3. **[File Management](/api/files)** - Upload and organize test files
4. **[Context Management](/api/contexts)** - Create reusable execution environments
5. **[Billing & Usage](/api/billing)** - Monitor your usage and billing

## SDK and Libraries

Consider using official SDKs for easier integration:

- **Node.js**: `npm install @doc-detective/api-client`
- **Python**: `pip install doc-detective-api`
- **Go**: `go get github.com/doc-detective/go-client`

## Support

Need help? Here are your options:

- **Documentation**: Check the [API reference](/api) for detailed information
- **Community**: Join our [Discord server](https://discord.gg/doc-detective)
- **Issues**: Report bugs on [GitHub](https://github.com/doc-detective/api/issues)
- **Email**: Contact support at support@doc-detective.com