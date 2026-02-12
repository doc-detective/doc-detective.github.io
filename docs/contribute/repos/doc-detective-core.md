---
sidebar_position: 2
---

# `doc-detective-core`

:::note

As of v4.0.0, core functionality is bundled into the main [`doc-detective`](doc-detective) package. `doc-detective-core` is no longer published as a separate NPM package.

:::

[`doc-detective-core`](https://github.com/doc-detective/doc-detective-core) was an NPM package that contained config and the logic for performing each test action.

This repo depended on [`doc-detective-common`](doc-detective-common) for JSON schema definitions, schema validation logic, and path resolution logic.