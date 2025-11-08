---
sidebar_position: 7
---

# `resolver`

[`resolver`](https://github.com/doc-detective/resolver) detects and resolves documentation into Doc Detective tests. It's installable via NPM (`npm i doc-detective-resolver`). This package parses documentation files to extract embedded test specifications and uses AI to automatically extract Doc Detective action steps from plain documentation text.

The analyzer supports multiple LLM providers (Anthropic, Google, OpenAI) and includes a local testing solution using llama.cpp, so you can generate tests without paid API keys.

This repo depends on [`doc-detective-common`](doc-detective-common) for JSON schema definitions and validation logic.
