---
sidebar_position: 4
---

# Test Runs

The test runs API allows you to execute Doc Detective tests programmatically and retrieve results. This is the core functionality for integrating Doc Detective testing into your CI/CD pipelines and automated workflows.

## Run Object

A test run object contains the following properties:

```json
{
  "id": "run_123456789",
  "account_id": "account_123456789",
  "status": "completed",
  "test_spec": {
    "tests": [
      {
        "description": "Test homepage navigation",
        "steps": [
          {
            "action": "goTo",
            "url": "https://example.com"
          },
          {
            "action": "find",
            "selector": "h1"
          }
        ]
      }
    ]
  },
  "context": {
    "platform": "linux",
    "browser": "chrome",
    "headless": true
  },
  "results": {
    "summary": {
      "total_tests": 1,
      "passed": 1,
      "failed": 0,
      "duration": 2.5
    },
    "tests": [
      {
        "description": "Test homepage navigation",
        "status": "passed",
        "duration": 2.5,
        "steps": [
          {
            "action": "goTo",
            "status": "passed",
            "duration": 1.2
          },
          {
            "action": "find",
            "status": "passed",
            "duration": 1.3
          }
        ]
      }
    ]
  },
  "created_at": "2025-08-06T10:30:00Z",
  "started_at": "2025-08-06T10:30:05Z",
  "completed_at": "2025-08-06T10:30:07Z"
}
```

### Properties

- `id` (string): Unique identifier for the test run
- `account_id` (string): ID of the account that owns this run
- `status` (string): Run status (`queued`, `running`, `completed`, `failed`, `cancelled`)
- `test_spec` (object): The test specification that was executed
- `context` (object): Execution context (browser, platform, etc.)
- `results` (object, nullable): Test results (available when status is `completed`)
- `created_at` (string): ISO 8601 timestamp when the run was created
- `started_at` (string, nullable): ISO 8601 timestamp when execution started
- `completed_at` (string, nullable): ISO 8601 timestamp when execution completed

## Create Test Run

Execute a new test run.

```http
POST /runs
```

### Request Body

```json
{
  "test_spec": {
    "tests": [
      {
        "description": "Test homepage navigation",
        "steps": [
          {
            "action": "goTo",
            "url": "https://example.com"
          },
          {
            "action": "find",
            "selector": "h1",
            "elementText": "Welcome"
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
    "browser": "chrome",
    "headless": true,
    "viewport": {
      "width": 1920,
      "height": 1080
    }
  }
}
```

### Parameters

- `test_spec` (object): Doc Detective test specification
- `context` (object, optional): Execution context configuration
  - `platform` (string): Target platform (`linux`, `mac`, `windows`)
  - `browser` (string): Browser to use (`chrome`, `firefox`, `safari`, `webkit`)
  - `headless` (boolean): Run in headless mode
  - `viewport` (object): Browser viewport dimensions
  - `window` (object): Browser window dimensions

### Response

```json
{
  "success": true,
  "data": {
    "id": "run_123456789",
    "account_id": "account_123456789",
    "status": "queued",
    "test_spec": {
      "tests": [
        {
          "description": "Test homepage navigation",
          "steps": [
            {
              "action": "goTo",
              "url": "https://example.com"
            },
            {
              "action": "find",
              "selector": "h1",
              "elementText": "Welcome"
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
      "browser": "chrome",
      "headless": true,
      "viewport": {
        "width": 1920,
        "height": 1080
      }
    },
    "created_at": "2025-08-06T10:30:00Z",
    "started_at": null,
    "completed_at": null
  }
}
```

## Get Test Run

Retrieve information about a specific test run.

```http
GET /runs/{run_id}
```

### Parameters

- `run_id` (string): The test run ID

### Response

```json
{
  "success": true,
  "data": {
    "id": "run_123456789",
    "account_id": "account_123456789",
    "status": "completed",
    "test_spec": {
      "tests": [
        {
          "description": "Test homepage navigation",
          "steps": [
            {
              "action": "goTo",
              "url": "https://example.com"
            },
            {
              "action": "find",
              "selector": "h1",
              "elementText": "Welcome"
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
      "browser": "chrome",
      "headless": true,
      "viewport": {
        "width": 1920,
        "height": 1080
      }
    },
    "results": {
      "summary": {
        "total_tests": 1,
        "passed": 1,
        "failed": 0,
        "duration": 3.2
      },
      "tests": [
        {
          "description": "Test homepage navigation",
          "status": "passed",
          "duration": 3.2,
          "steps": [
            {
              "action": "goTo",
              "status": "passed",
              "duration": 1.5,
              "url": "https://example.com"
            },
            {
              "action": "find",
              "status": "passed",
              "duration": 0.8,
              "selector": "h1",
              "elementText": "Welcome"
            },
            {
              "action": "screenshot",
              "status": "passed",
              "duration": 0.9,
              "path": "homepage.png",
              "file_id": "file_987654321"
            }
          ]
        }
      ]
    },
    "created_at": "2025-08-06T10:30:00Z",
    "started_at": "2025-08-06T10:30:05Z",
    "completed_at": "2025-08-06T10:33:17Z"
  }
}
```

## List Test Runs

List test runs for your account.

```http
GET /runs
```

### Query Parameters

- `limit` (integer, optional): Number of runs to return (default: 50, max: 100)
- `offset` (integer, optional): Number of runs to skip (default: 0)
- `status` (string, optional): Filter by run status
- `created_after` (string, optional): ISO 8601 timestamp to filter runs created after
- `created_before` (string, optional): ISO 8601 timestamp to filter runs created before

### Response

```json
{
  "success": true,
  "data": {
    "runs": [
      {
        "id": "run_123456789",
        "account_id": "account_123456789",
        "status": "completed",
        "results": {
          "summary": {
            "total_tests": 1,
            "passed": 1,
            "failed": 0,
            "duration": 3.2
          }
        },
        "created_at": "2025-08-06T10:30:00Z",
        "started_at": "2025-08-06T10:30:05Z",
        "completed_at": "2025-08-06T10:33:17Z"
      }
    ],
    "total": 1,
    "limit": 50,
    "offset": 0
  }
}
```

## Cancel Test Run

Cancel a queued or running test.

```http
DELETE /runs/{run_id}
```

### Parameters

- `run_id` (string): The test run ID

### Response

```json
{
  "success": true,
  "data": {
    "message": "Test run cancelled successfully"
  }
}
```

:::note
Only runs with status `queued` or `running` can be cancelled.
:::

## Run Status

Test runs progress through the following statuses:

- **queued**: Run is waiting to be executed
- **running**: Test is currently executing
- **completed**: Test execution finished successfully
- **failed**: Test execution failed due to an error
- **cancelled**: Run was cancelled before completion

## Execution Context

The execution context defines the environment where tests run:

### Platform Options
- `linux`: Ubuntu Linux environment
- `mac`: macOS environment  
- `windows`: Windows environment

### Browser Options
- `chrome`: Google Chrome
- `firefox`: Mozilla Firefox
- `safari`: Safari (macOS only)
- `webkit`: WebKit engine

### Context Configuration

```json
{
  "platform": "linux",
  "browser": "chrome",
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

## Test Results

Results are available once a test run completes:

### Summary
- `total_tests`: Total number of tests executed
- `passed`: Number of tests that passed
- `failed`: Number of tests that failed
- `duration`: Total execution time in seconds

### Test Details
Each test includes:
- `description`: Test description
- `status`: Test result (`passed`, `failed`)
- `duration`: Test execution time in seconds
- `steps`: Array of step results

### Step Details
Each step includes:
- `action`: The action that was executed
- `status`: Step result (`passed`, `failed`)
- `duration`: Step execution time in seconds
- Additional properties specific to the action

## File Outputs

Tests that generate files (screenshots, recordings, etc.) will include file references in the results:

```json
{
  "action": "screenshot",
  "status": "passed",
  "duration": 0.9,
  "path": "homepage.png",
  "file_id": "file_987654321"
}
```

Use the [Files API](/api/files) to download generated files.

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "INVALID_TEST_SPEC",
    "message": "Test specification is invalid"
  }
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "RUN_NOT_FOUND",
    "message": "Test run not found"
  }
}
```

### 409 Conflict

```json
{
  "success": false,
  "error": {
    "code": "CANNOT_CANCEL",
    "message": "Cannot cancel completed test run"
  }
}
```