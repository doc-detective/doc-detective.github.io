---
title: checkLink
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
---

# checkLink

The `checkLink` action checks if a URL returns an acceptable status code from a GET request. This action is useful for verifying that a hyperlink or image URL is valid.

You can also specify

- an `origin` to navigate to a URL relative to a specific path.
- `statusCodes` to set acceptable HTTP status codes.

> For comprehensive options, see the [checkLink](/docs/references/schemas/checkLink) reference.

## Examples

Here are a few ways you might use the `checkLink` action:

### Check if a link is valid

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check if Google is up.",
          "action": "checkLink",
          "url": "https://www.google.com"
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
          "action": "checkLink",
          "url": "https://www.google.com",
          "statusCodes": [200, 201, 202]
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
          "description": "Check if Google is up with an origin.",
          "action": "checkLink",
          "url": "/search",
          "origin": "https://www.google.com"
        }
      ]
    }
  ]
}
```

## Troubleshooting

- [`checkLink` fails due to unrecognized certificates](#checklink-fails-due-to-unrecognized-certificates)

### `checkLink` fails due to unrecognized certificates

If the `checkLink` action fails for a valid URL that loads without redirects, it may be due to an internal or custom certificate that the testing machine does not recognize.

#### Example

Consider the following test configuration, which checks the validity of `https://self-signed.badssl.com/`—a website using a self-signed certificate:

```json title="bad-certificate.json"
{
  "tests": [
    {
      "steps": [
        {
          "description": "Check site with a self-signed certificate",
          "action": "checkLink",
          "url": "https://self-signed.badssl.com/",
          "statusCodes": [200, 201, 202, 301]
        }
      ]
    }
  ]
}
```

To run the test, use the following command:

```bash
npx doc-detective runTests -i bad-certificate.json
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

2. Modify your test configuration to include a `setVariables` action:

   ```json title="bad-certificate.json"
   {
     "tests": [
       {
         "steps": [
           <!-- highlight-start -->
           {
             "action": "setVariables",
             "path": "ignore-certificate-problems.env"
           },
           <!-- highlight-end -->
           {
             "description": "Check self-signed.badssl.com",
             "action": "checkLink",
             "url": "https://self-signed.badssl.com/",
             "statusCodes": [200, 201, 202, 301]
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
