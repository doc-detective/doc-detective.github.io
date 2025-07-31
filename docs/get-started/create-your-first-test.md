---
sidebar_label: Create your first test
---

# Create your first test

In this tutorial, you will create a basic test that navigates to a webpage, validates the presence of specific elements, and captures a screenshot. This will introduce you to fundamental Doc Detective actions that are essential for creating more advanced tests in the future.

## What is a test?

A [test](/docs/get-started/tests) in Doc Detective is a series of steps, where each step performs a single [action](/docs/category/actions). An action can be navigating to a URL, finding an element, or taking a screenshot, for example.

## What does this test do?

This test navigates to `https://example.com`, checks for the presence of the `<h1>` heading with the text `Example Domain`, and verifies that the `More information...` link is present. It then clicks the link and captures a screenshot of the resulting page.

## Prerequisites

Before you begin, ensure you have the following:

- [Doc Detective installed](/docs/get-started/installation).
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
             "description": "Go to the specified URL",
             "goTo": "https://example.com"
           },
           {
             "description": "Verify the presence of the main heading",
             "find": "Example Domain"
           },
           {
             "description": "Verify that the 'More information...' link is present and working",
             "click": "More information..."
           },
           {
             "description": "Capture a screenshot of the resulting page",
             "screenshot": "example.png"
           }
         ]
       }
     ]
   }
   ```

   This test uses the following actions:

   - [`goTo`](/docs/get-started/actions/goTo): Navigates to the specified URL, https://example.com, to start the test flow.
   - [`find`](/docs/get-started/actions/find): Locates elements on the page using CSS selectors such as HTML tags like `h1` or `a`, and validates their presence and text content.
   - [`click`](/docs/get-started/actions/click): Clicks on the specified element, in this case, the `More information...` link.
   - [`screenshot`](/docs/get-started/actions/screenshot): Captures a screenshot of the current page and saves it to the specified path.

4. Save the file.

5. In your terminal, enter the following command to run the test:

   ```bash
   npx doc-detective --input homepage-check.spec.json
   ```

   By default, Doc Detective scans the current directory for valid tests, but you can specify your test file using the `--input` argument. For more information, see [Run tests](/docs/get-started/sample-tests.md#run-tests).

## Outcome

After running the test, you should see the results in your terminal, which Doc Detective saves to a new file named `testResults-UNIQUE_ID.json`:

```json title="testResults-UNIQUE_ID.json"
{
  "summary": {
    "specs": {
      "pass": 1, // Number of test specifications that passed
      "fail": 0, // Number of test specifications that failed
      "warning": 0,
      "skipped": 0
    },
    "tests": {
      "pass": 1, // Number of tests that passed
      "fail": 0, // Number of tests that failed
      "warning": 0,
      "skipped": 0
    },
    "contexts": {
      "pass": 1, // Number of contexts that passed
      "fail": 0, // Number of contexts that failed
      "warning": 0,
      "skipped": 0
    },
    "steps": {
      "pass": 4, // Number of individual steps that passed
      "fail": 0, // Number of individual steps that failed
      "warning": 0,
      "skipped": 0
    }
  },
  "specs": [
    {
      "tests": [
        {
          "result": "PASS",
          "contexts": [
            {
              "result": "PASS",
              "platform": "linux",
              "browser": {
                "name": "firefox",
                "version": "nightly_136.0a1",
                "path": "/home/hawkeyexl/Workspaces/doc-detective-core/browser-snapshots/firefox/linux-nightly_136.0a1/firefox/firefox"
              },
              "steps": [
                {
                  "result": "PASS",
                  "resultDescription": "Opened URL.",
                  "description": "Go to the specified URL",
                  "goTo": {
                    "url": "https://example.com"
                  },
                  "stepId": "b09d9c07-2fb0-4fc9-92a4-b4cabdb5c3cd"
                },
                {
                  "result": "PASS",
                  "resultDescription": "Found an element matching selector. Found element by text.",
                  "description": "Verify the presence of the main heading",
                  "find": "Example Domain",
                  "stepId": "94dd9246-e612-43be-829e-607a191550e8"
                },
                {
                  "result": "PASS",
                  "resultDescription": "Clicked element. Found element by text. Clicked element.",
                  "description": "Verify that the 'More information...' link is present and working",
                  "click": "More information...",
                  "stepId": "d5851502-807f-4cb9-981c-338201278f29"
                },
                {
                  "result": "PASS",
                  "resultDescription": "Saved screenshot.",
                  "description": "Capture a screenshot of the resulting page",
                  "screenshot": "example.png",
                  "stepId": "5698d891-e220-4e88-8b96-8c5eb8c1ce5f"
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
