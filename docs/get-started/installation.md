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

3. Run a test:

   ```bash
   npx doc-detective runTests --input https://doc-detective.com/sample.spec.json
   ```

Congratulations! You've run your first test with Doc Detective.

## Next steps

- [Concepts](/docs/get-started/concepts)
