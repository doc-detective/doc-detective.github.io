---
sidebar_position: 5
---

# Cookie Management

Learn how to use `saveCookie` and `loadCookie` actions to persist authentication across test sessions.

## Overview

Cookie management actions allow you to save browser cookies to files and load them back later. This is particularly useful for:

- Maintaining authentication sessions across multiple test runs
- Sharing authentication state between different test specifications
- Avoiding repeated login procedures in test suites

## Basic Cookie Workflow

### 1. Save Authentication Cookie

First, authenticate and save the session cookie:

```json
{
  "tests": [
    {
      "steps": [
        {
          "goTo": "https://example.com/login"
        },
        {
          "find": "input[name='username']"
        },
        {
          "type": "testuser"
        },
        {
          "find": "input[name='password']"
        },
        {
          "type": "testpassword"
        },
        {
          "click": "button[type='submit']"
        },
        {
          "saveCookie": {
            "name": "session_token",
            "path": "auth-session.txt",
            "overwrite": true
          }
        }
      ]
    }
  ]
}
```

### 2. Load Authentication Cookie

In subsequent tests, load the saved cookie:

```json
{
  "tests": [
    {
      "steps": [
        {
          "goTo": "https://example.com"
        },
        {
          "loadCookie": {
            "name": "session_token",
            "path": "auth-session.txt"
          }
        },
        {
          "goTo": "https://example.com/dashboard"
        },
        {
          "find": "Welcome back!"
        }
      ]
    }
  ]
}
```

## Best Practices

### Security Considerations

- **Store cookie files securely**: Cookie files may contain sensitive authentication tokens
- **Use temporary directories**: Consider storing cookie files in temporary locations that are cleaned up after tests
- **Avoid version control**: Add cookie files to your `.gitignore` to prevent committing sensitive data

### File Management

- **Use descriptive names**: Name cookie files clearly to indicate their purpose
- **Organize by environment**: Use different cookie files for different test environments
- **Clean up regularly**: Remove old cookie files to prevent accumulation

### Error Handling

- **Check cookie existence**: Ensure cookies exist before trying to save them
- **Verify file paths**: Make sure the directory structure exists for cookie file paths
- **Handle missing files**: Plan for scenarios where cookie files might not exist when loading

## Example: Multi-Test Authentication

Here's a complete example showing authentication setup and usage across multiple tests:

**setup-auth.spec.json**
```json
{
  "tests": [
    {
      "steps": [
        {
          "goTo": "https://app.example.com/login"
        },
        {
          "type": {
            "keys": "admin@example.com",
            "selector": "#email"
          }
        },
        {
          "type": {
            "keys": "securepassword",
            "selector": "#password"
          }
        },
        {
          "click": "#login-button"
        },
        {
          "wait": 2000
        },
        {
          "saveCookie": {
            "name": "auth_token",
            "path": "test-auth.txt",
            "overwrite": true
          }
        }
      ]
    }
  ]
}
```

**dashboard-test.spec.json**
```json
{
  "tests": [
    {
      "steps": [
        {
          "goTo": "https://app.example.com"
        },
        {
          "loadCookie": {
            "name": "auth_token",
            "path": "test-auth.txt"
          }
        },
        {
          "goTo": "https://app.example.com/dashboard"
        },
        {
          "find": "h1",
          "elementText": "Dashboard"
        },
        {
          "screenshot": "authenticated-dashboard.png"
        }
      ]
    }
  ]
}
```

## Troubleshooting

### Cookie Not Found
If you get an error that a cookie doesn't exist:
- Verify the cookie name matches exactly
- Check that the website actually sets the cookie
- Ensure you're on the correct domain when saving the cookie

### File Path Issues
If cookie files can't be saved or loaded:
- Check that the directory exists
- Verify file permissions
- Use absolute paths if relative paths cause issues

### Domain Restrictions
Cookies are domain-specific:
- Load cookies only after navigating to the appropriate domain
- Different subdomains may require separate cookie handling
- HTTPS/HTTP protocol differences can affect cookie availability

## Related Actions

- [goTo](/docs/get-started/actions/goTo) - Navigate to pages before cookie operations
- [find](/docs/get-started/actions/find) - Locate login form elements
- [type](/docs/get-started/actions/type) - Enter credentials
- [click](/docs/get-started/actions/click) - Submit forms
- [wait](/docs/get-started/actions/wait) - Allow time for authentication to complete