---
sidebar_position: 2
---

# `doc-detective-core`

[`doc-detective-core`](https://github.com/doc-detective/doc-detective-core) is an NPM package that contains config and test logic and actually runs tests. It's installable via NPM (`npm i doc-detective-core`). This package contains the logic for performing each test action.

This package includes the parallel execution engine with configurable worker pool pattern for improved performance when running multiple test contexts simultaneously.

This repo depends on [`doc-detective-common`](doc-detective-common) for JSON schema definitions, schema validation logic, and path resolution logic.