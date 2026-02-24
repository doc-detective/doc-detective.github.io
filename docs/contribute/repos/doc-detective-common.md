---
sidebar_position: 3
---

# `doc-detective-common`

[`doc-detective-common`](https://github.com/doc-detective/doc-detective-common) is an NPM package that contains shared schemas, validation logic, and test detection utilities used across Doc Detective repos. It's installable via NPM (`npm i doc-detective-common`). As of v4.0.0, the package is written in TypeScript, supports both ESM and CommonJS, and is browser-compatible.

## What's included

The package exports:

- **Schemas**: JSON schemas that define test specifications and actions
- **Validation**: Logic for validating test specifications against schemas
- **Test detection**: Utilities for detecting and parsing inline tests from documentation

This repo doesn't depend on any other Doc Detective repos.