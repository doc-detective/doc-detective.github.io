---
sidebar_position: 1
---

# `doc-detective`

[`doc-detective`](https://github.com/doc-detective/doc-detective) is an NPM-based CLI tool that performs tests. It's installable via NPM (`npm i -g doc-detective`) and directly runnable without installation via NPX (`npx doc-detective`).

As of v4.0.0, `doc-detective` bundles the core testing logic directly (previously provided by the separate `doc-detective-core` package). The codebase is written in TypeScript and supports both ESM and CommonJS module systems.

This repo depends on [`doc-detective-common`](doc-detective-common) for JSON schema definitions, schema validation logic, and path resolution logic.