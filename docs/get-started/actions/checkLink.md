---
title: checkLink
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests,
description: Check if a URL returns an acceptable status code from a GET request.
---

# checkLink

The `checkLink` action checks if a URL returns an acceptable status code from a GET request. This action is useful for verifying that a hyperlink or image URL is valid.

You can specify the target URL directly as a string, or use an object for more options:

- `url`: (Required in object format) The URL to check. Can be a full URL or a path. If a path is provided, an `origin` must be specified either in the step or in the configuration file.
- `origin`: (Optional) Protocol and domain prepended to `url` when `url` is a path. If omitted and `url` is a path, the global `origin` from the configuration file is used.
- `statusCodes`: (Optional) A single integer or an array of integers representing acceptable HTTP status codes. If omitted, defaults to `[200, 301, 302, 307, 308]`.

> For comprehensive options, see the [`checkLink`](/docs/references/schemas/checklink) reference.

## Examples

Here are a few ways you might use the `checkLink` action:

### Check if a link is valid (string shorthand)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check if Google is up.",
          "checkLink": "https://www.google.com"
        }
      ]
    }
  ]
}
```

### Check if a link is valid (object format)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check if Google is up.",
          "checkLink": {
            "url": "https://www.google.com"
          }
        }
      ]
    }
  ]
}
```

### Check for a specific status code response

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check if Google is up, expecting only 200.",
          "checkLink": {
            "url": "https://www.google.com",
            "statusCodes": 200
          }
        }
      ]
    }
  ]
}
```

### Check for one of a set of status code responses

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check if Google is up with extra status codes.",
          "checkLink": {
            "url": "https://www.google.com",
            "statusCodes": [200, 201, 202]
          }
        }
      ]
    }
  ]
}
```

### Check a link with a separate origin and URL path

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check if Google search path is valid using a specific origin.",
          "checkLink": {
            "url": "/search",
            "origin": "https://www.google.com"
          }
        }
      ]
    }
  ]
}
```

### Check a relative link using global origin

Assuming a global `origin` of `https://www.google.com` is set in the configuration:

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check if Google search path is valid using global origin.",
          "checkLink": {
            "url": "/search"
          }
        }
      ]
    }
  ]
}
```

## Troubleshooting

- [`checkLink` fails due to unrecognized certificates](#checklink-fails-due-to-unrecognized-certificates)

### `checkLink` fails due to unrecognized certificates

If the `checkLink` action fails for a valid URL that loads without redirects, it may be due to an internal or custom certificate that the testing machine doesn't recognize.

#### Example

Consider the following test configuration, which checks the validity of `https://self-signed.badssl.com/`—a website using a self-signed certificate:

```json title="bad-certificate.json"
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check site with a self-signed certificate",
          "checkLink": {
            "url": "https://self-signed.badssl.com/",
            "statusCodes": [200, 201, 202, 301]
          }
        }
      ]
    }
  ]
}
```

To run the test, use the following command:

```bash
npx doc-detective -i bad-certificate.json
```

This command executes the test, but it fails, returning the following response:

```json
{
  "result": "FAIL",
  "resultDescription": "Invalid or unresolvable URL: https://self-signed.badssl.com/"
}
```

This occurs because the self-signed certificate isn't recognized by the testing machine. This behavior is expected in `axios`, but you can bypass it in Doc Detective by setting an environment variable.

#### Solution

To fix this issue, follow these steps:

1. Create a `.env` file with the following content:

   ```text title="ignore-certificate-problems.env"
   NODE_TLS_REJECT_UNAUTHORIZED=0
   ```

2. Modify your test configuration to include a `loadVariables` step (Note: `setVariables` is deprecated, use `loadVariables`):

   ```json title="bad-certificate.json" {5-8}
   {
     "tests": [
       {
         "steps": [
           {
             "loadVariables": "ignore-certificate-problems.env"
           },
           {
             "description": "Check self-signed.badssl.com",
             "checkLink": {
               "url": "https://self-signed.badssl.com/",
               "statusCodes": [200, 201, 202, 301]
             }
           }
         ]
       }
     ]
   }
   ```

#### Expected result

After applying these changes, the test should pass:

```json
{
  "result": "PASS",
  "resultDescription": "Returned 200"
}
```
