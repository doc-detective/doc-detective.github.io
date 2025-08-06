---
sidebar_position: 6
---

# Context Management

Contexts define the execution environment for your tests, including platform, browser, and configuration settings. The context management API allows you to create, manage, and reuse execution contexts across multiple test runs.

## Context Object

A context object contains the following properties:

```json
{
  "id": "context_123456789",
  "account_id": "account_123456789",
  "name": "Chrome Linux Desktop",
  "description": "Standard desktop testing environment",
  "platform": "linux",
  "browser": {
    "name": "chrome",
    "headless": true,
    "viewport": {
      "width": 1920,
      "height": 1080
    },
    "window": {
      "width": 1920,
      "height": 1080
    }
  },
  "variables": {
    "BASE_URL": "https://staging.example.com",
    "TIMEOUT": "5000"
  },
  "is_default": false,
  "created_at": "2025-08-06T10:30:00Z",
  "updated_at": "2025-08-06T10:30:00Z"
}
```

### Properties

- `id` (string): Unique identifier for the context
- `account_id` (string): ID of the account that owns this context
- `name` (string): Human-readable name for the context
- `description` (string, optional): Description of the context's purpose
- `platform` (string): Target platform (`linux`, `mac`, `windows`)
- `browser` (object): Browser configuration
- `variables` (object, optional): Environment variables for test execution
- `is_default` (boolean): Whether this is the default context for the account
- `created_at` (string): ISO 8601 timestamp of context creation
- `updated_at` (string): ISO 8601 timestamp of last update

## Create Context

Create a new execution context.

```http
POST /contexts
```

### Request Body

```json
{
  "name": "Chrome Linux Desktop",
  "description": "Standard desktop testing environment",
  "platform": "linux",
  "browser": {
    "name": "chrome",
    "headless": true,
    "viewport": {
      "width": 1920,
      "height": 1080
    },
    "window": {
      "width": 1920,
      "height": 1080
    }
  },
  "variables": {
    "BASE_URL": "https://staging.example.com",
    "TIMEOUT": "5000"
  },
  "is_default": false
}
```

### Parameters

- `name` (string): Human-readable name for the context
- `description` (string, optional): Description of the context's purpose
- `platform` (string): Target platform (`linux`, `mac`, `windows`)
- `browser` (object): Browser configuration
  - `name` (string): Browser name (`chrome`, `firefox`, `safari`, `webkit`)
  - `headless` (boolean, optional): Run in headless mode (default: true)
  - `viewport` (object, optional): Browser viewport dimensions
  - `window` (object, optional): Browser window dimensions
- `variables` (object, optional): Environment variables for test execution
- `is_default` (boolean, optional): Set as default context (default: false)

### Response

```json
{
  "success": true,
  "data": {
    "id": "context_123456789",
    "account_id": "account_123456789",
    "name": "Chrome Linux Desktop",
    "description": "Standard desktop testing environment",
    "platform": "linux",
    "browser": {
      "name": "chrome",
      "headless": true,
      "viewport": {
        "width": 1920,
        "height": 1080
      },
      "window": {
        "width": 1920,
        "height": 1080
      }
    },
    "variables": {
      "BASE_URL": "https://staging.example.com",
      "TIMEOUT": "5000"
    },
    "is_default": false,
    "created_at": "2025-08-06T10:30:00Z",
    "updated_at": "2025-08-06T10:30:00Z"
  }
}
```

## Get Context

Retrieve information about a specific context.

```http
GET /contexts/{context_id}
```

### Parameters

- `context_id` (string): The context ID

### Response

```json
{
  "success": true,
  "data": {
    "id": "context_123456789",
    "account_id": "account_123456789",
    "name": "Chrome Linux Desktop",
    "description": "Standard desktop testing environment",
    "platform": "linux",
    "browser": {
      "name": "chrome",
      "headless": true,
      "viewport": {
        "width": 1920,
        "height": 1080
      },
      "window": {
        "width": 1920,
        "height": 1080
      }
    },
    "variables": {
      "BASE_URL": "https://staging.example.com",
      "TIMEOUT": "5000"
    },
    "is_default": false,
    "created_at": "2025-08-06T10:30:00Z",
    "updated_at": "2025-08-06T10:30:00Z"
  }
}
```

## List Contexts

List all contexts for your account.

```http
GET /contexts
```

### Query Parameters

- `limit` (integer, optional): Number of contexts to return (default: 50, max: 100)
- `offset` (integer, optional): Number of contexts to skip (default: 0)
- `platform` (string, optional): Filter by platform
- `browser` (string, optional): Filter by browser name

### Response

```json
{
  "success": true,
  "data": {
    "contexts": [
      {
        "id": "context_123456789",
        "account_id": "account_123456789",
        "name": "Chrome Linux Desktop",
        "description": "Standard desktop testing environment",
        "platform": "linux",
        "browser": {
          "name": "chrome",
          "headless": true,
          "viewport": {
            "width": 1920,
            "height": 1080
          },
          "window": {
            "width": 1920,
            "height": 1080
          }
        },
        "variables": {
          "BASE_URL": "https://staging.example.com",
          "TIMEOUT": "5000"
        },
        "is_default": false,
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

## Update Context

Update an existing context.

```http
PUT /contexts/{context_id}
```

### Parameters

- `context_id` (string): The context ID

### Request Body

```json
{
  "name": "Updated Chrome Linux Desktop",
  "description": "Updated desktop testing environment",
  "browser": {
    "name": "chrome",
    "headless": false,
    "viewport": {
      "width": 1366,
      "height": 768
    }
  },
  "variables": {
    "BASE_URL": "https://production.example.com",
    "TIMEOUT": "10000"
  }
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "context_123456789",
    "account_id": "account_123456789",
    "name": "Updated Chrome Linux Desktop",
    "description": "Updated desktop testing environment",
    "platform": "linux",
    "browser": {
      "name": "chrome",
      "headless": false,
      "viewport": {
        "width": 1366,
        "height": 768
      },
      "window": {
        "width": 1920,
        "height": 1080
      }
    },
    "variables": {
      "BASE_URL": "https://production.example.com",
      "TIMEOUT": "10000"
    },
    "is_default": false,
    "created_at": "2025-08-06T10:30:00Z",
    "updated_at": "2025-08-06T11:45:00Z"
  }
}
```

## Delete Context

Delete a context.

```http
DELETE /contexts/{context_id}
```

### Parameters

- `context_id` (string): The context ID

### Response

```json
{
  "success": true,
  "data": {
    "message": "Context deleted successfully"
  }
}
```

:::warning
You cannot delete a context that is set as the default context. Set another context as default first.
:::

## Set Default Context

Set a context as the default for your account.

```http
POST /contexts/{context_id}/set-default
```

### Parameters

- `context_id` (string): The context ID

### Response

```json
{
  "success": true,
  "data": {
    "message": "Context set as default successfully"
  }
}
```

## Platform Options

### linux
- Ubuntu 22.04 LTS environment
- Supports Chrome, Firefox, and WebKit browsers
- Default platform for most testing scenarios

### mac
- macOS environment
- Supports Chrome, Firefox, Safari, and WebKit browsers
- Required for Safari browser testing

### windows
- Windows 11 environment
- Supports Chrome and Firefox browsers
- Useful for Windows-specific testing scenarios

## Browser Configuration

### Chrome
```json
{
  "name": "chrome",
  "headless": true,
  "viewport": {
    "width": 1920,
    "height": 1080
  },
  "window": {
    "width": 1920,
    "height": 1080
  }
}
```

### Firefox
```json
{
  "name": "firefox",
  "headless": true,
  "viewport": {
    "width": 1920,
    "height": 1080
  },
  "window": {
    "width": 1920,
    "height": 1080
  }
}
```

### Safari (macOS only)
```json
{
  "name": "safari",
  "headless": false,
  "viewport": {
    "width": 1920,
    "height": 1080
  },
  "window": {
    "width": 1920,
    "height": 1080
  }
}
```

### WebKit
```json
{
  "name": "webkit",
  "headless": true,
  "viewport": {
    "width": 1920,
    "height": 1080
  },
  "window": {
    "width": 1920,
    "height": 1080
  }
}
```

## Environment Variables

Context variables are available during test execution and can be referenced in test specifications:

```json
{
  "variables": {
    "BASE_URL": "https://staging.example.com",
    "API_KEY": "test_key_123",
    "TIMEOUT": "5000",
    "USER_EMAIL": "test@example.com"
  }
}
```

In test specifications, reference variables using the `$VARIABLE_NAME` syntax:

```json
{
  "action": "goTo",
  "url": "$BASE_URL/login"
}
```

## Common Context Configurations

### Desktop Testing
```json
{
  "name": "Desktop Chrome",
  "platform": "linux",
  "browser": {
    "name": "chrome",
    "headless": true,
    "viewport": {
      "width": 1920,
      "height": 1080
    }
  }
}
```

### Mobile Testing
```json
{
  "name": "Mobile Chrome",
  "platform": "linux",
  "browser": {
    "name": "chrome",
    "headless": true,
    "viewport": {
      "width": 375,
      "height": 667
    }
  }
}
```

### Cross-Browser Testing
Create multiple contexts for different browsers:

```json
[
  {
    "name": "Chrome Desktop",
    "platform": "linux",
    "browser": { "name": "chrome" }
  },
  {
    "name": "Firefox Desktop",
    "platform": "linux",
    "browser": { "name": "firefox" }
  },
  {
    "name": "Safari Desktop",
    "platform": "mac",
    "browser": { "name": "safari" }
  }
]
```

## Using Contexts in Test Runs

Reference a context when creating a test run:

```json
{
  "test_spec": {
    "tests": [...]
  },
  "context_id": "context_123456789"
}
```

Or use inline context configuration:

```json
{
  "test_spec": {
    "tests": [...]
  },
  "context": {
    "platform": "linux",
    "browser": {
      "name": "chrome",
      "headless": true
    }
  }
}
```

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "INVALID_BROWSER_PLATFORM",
    "message": "Safari browser is only available on macOS platform"
  }
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "CONTEXT_NOT_FOUND",
    "message": "Context not found"
  }
}
```

### 409 Conflict

```json
{
  "success": false,
  "error": {
    "code": "CANNOT_DELETE_DEFAULT",
    "message": "Cannot delete the default context"
  }
}
```