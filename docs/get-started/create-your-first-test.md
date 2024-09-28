---
sidebar_label: Create your first test
---

# Create your first test

In this tutorial, you will create a basic test that navigates to a webpage, validates the presence of specific elements, and captures a screenshot. This will introduce you to fundamental Doc Detective actions that are essential for creating more advanced tests in the future.

## What is a test?

A [test](/docs/get-started/tests/index.md) in Doc Detective is a series of steps, where each step performs a single [action](/docs/category/actions). An action can be navigating to a URL, finding an element, or taking a screenshot, for example.

## What does this test do?

This test navigates to `https://example.com`, checks for the presence of the `<h1>` heading with the text `Example Domain`, and verifies that the `More information...` link is present. It then clicks the link and captures a screenshot of the resulting page.

## Prerequisites

Before you begin, ensure you have the following:

- [Doc Detective installed](/docs/get-started/installation.md).
- A text editor.

## Steps

To create your first test, follow these steps:

1. In a terminal, navigate to the folder where you plan to create your test:

   ```bash
   cd /path/to/your/project
   ```

2. Create a new test file named `homepage-check.spec.json`:

   ```bash
   touch homepage-check.spec.json
   ```

3. Open the file in your text editor and paste the following code:

   ```json title="homepage-check.spec.json"
   {
     "tests": [
       {
         "steps": [
           {
             "action": "goTo",
             "description": "Go to the specified URL",
             "url": "https://example.com"
           },
           {
             "action": "find",
             "description": "Verify the presence of the main heading",
             "selector": "h1",
             "matchText": "Example Domain"
           },
           {
             "action": "find",
             "description": "Verify that the 'More information...' link is present and working",
             "selector": "a",
             "matchText": "More information...",
             "click": true
           },
           {
             "action": "saveScreenshot",
             "description": "Capture a screenshot of the resulting page",
             "path": "example.png"
           }
         ]
       }
     ]
   }
   ```

   This test uses the following actions:

   - [`goTo`](/docs/get-started/actions/goTo.md): Navigates to the specified URL (`https://example.com`) to start the test flow.
   - [`find`](/docs/get-started/actions/find.md): Locates elements on the page using CSS selectors (for example, HTML tags like `h1` or `a`) and validates their presence and text content.
   - [`saveScreenshot`](/docs/get-started/actions/saveScreenshot.md): Captures a screenshot of the current page and saves it to the specified file path.

4. Save the file.

5. In your terminal, enter the following command to run the test:

   ```bash
   npx doc-detective runTests --input homepage-check.spec.json
   ```

   By default, Doc Detective scans the current directory for valid tests, but you can specify your test file using the `--input` argument. For more information, see [Run tests](/docs/get-started/sample-tests.md#run-tests).

## Outcome

After running the test, you should see the results in your terminal, which Doc Detective saves to a new file named `testResults-UNIQUE_ID.json`:

```text title="testResults-UNIQUE_ID.json"
{
  "summary": {
    "specs": {
      "pass": 1,  // Number of test specifications that passed
      "fail": 0,  // Number of test specifications that failed
      "warning": 0,
      "skipped": 0
    },
    "tests": {
      "pass": 1,  // Number of tests that passed
      "fail": 0,  // Number of tests that failed
      "warning": 0,
      "skipped": 0
    },
    "contexts": {
      "pass": 1,  // Number of contexts that passed
      "fail": 0,  // Number of contexts that failed
      "warning": 0,
      "skipped": 0
    },
    "steps": {
      "pass": 4,  // Number of individual steps that passed
      "fail": 0,  // Number of individual steps that failed
      "warning": 0,
      "skipped": 0
    }
  },
  "specs": [
    {
      "result": "PASS",
      "tests": [
        {
          "result": "PASS",
          "contexts": [
            {
              "result": "PASS",
              "app": "chrome",
              "path": "/opt/homebrew/lib/node_modules/doc-detective/node_modules/doc-detective-core/browser-snapshots/chrome/mac_arm-128.0.6613.119/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
              "platform": "mac",
              "steps": [
                {
                  "result": "PASS",
                  "resultDescription": "Opened URL.",
                  "action": "goTo",
                  "url": "https://example.com",
                  "id": "89889930-25b1-460b-a57f-68188c7be3d7"
                },
                {
                  "result": "PASS",
                  "resultDescription": "Found an element matching selector. Matched text.",
                  "action": "find",
                  "description": "Verify the presence of the main heading",
                  "selector": "h1",
                  "matchText": "Example Domain",
                  "timeout": 5000,
                  "moveTo": false,
                  "click": false,
                  "setVariables": [],
                  "id": "f5bc70a7-82cf-4b60-adac-b51a77c1d0c2"
                },
                {
                  "result": "PASS",
                  "resultDescription": "Found an element matching selector. Matched text. Clicked element.",
                  "action": "find",
                  "description": "Verify that the 'More information...' link is present and is working",
                  "selector": "a",
                  "matchText": "More information...",
                  "click": true,
                  "timeout": 5000,
                  "moveTo": false,
                  "setVariables": [],
                  "id": "1c9b165b-416f-4c66-b7f5-81e44f5590f4"
                },
                {
                  "result": "PASS",
                  "resultDescription": "Saved screenshot.",
                  "action": "saveScreenshot",
                  "path": "/Users/doc-detective-user/path/to/your/project/example.png",
                  "maxVariation": 5,
                  "overwrite": "false",
                  "id": "c2bb9f2f-f9d7-4e8c-bc53-4a1b557c2a3c"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

This output confirms that all the test steps passed successfully, and the screenshot was saved to the specified path.

Additionally, you should see a new image file named `example.png` saved in your project folder. Open this file to view the captured screenshot of the page:

![Example file](/img/create-your-first-test/example.png)

## Next steps

- [Explore sample tests](/docs/get-started/sample-tests) to see more examples.
- [Learn more about available actions](/docs/category/actions) to expand your test capabilities.
- Try modifying this test to check for different elements or add more steps.
