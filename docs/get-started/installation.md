---
sidebar_label: Installation
---

# Installation

Downloading and running Doc Detective is straightforward. Follow these steps to install Doc Detective and run your first test:

1. Install prerequisites:

   - [Node.js](https://nodejs.org/) v18 or later

2. In a terminal, install Doc Detective globally:

   ```bash
   npm i -g doc-detective
   ```

   **Note:** If you're working in a local copy of the `doc-detective` repository, you need to run `npm i` to install local dependencies.

3. Save this file to your current directory as _sample.spec.json_:

   ```json
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

4. Run a test, pointing to the file you just created:

   ```bash
   npx doc-detective --input sample.spec.json
   ```

Congratulations! You've run your first test with Doc Detective.

## Next steps

- [Concepts](/docs/get-started/concepts)
