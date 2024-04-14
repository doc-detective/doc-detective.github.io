---
title: Get started
layout: default
nav_order: 2
---

# Get started

Downloading and running Doc Detective is simple, but lets walk through it and run tests on a few sample files.

1. Install prerequisites:

   - [Node.js](https://nodejs.org/) (tested on v18 and v20)

1. In a terminal, install Doc Detective globally:

    ```bash
    npm i -g doc-detective
    ```

    If you don't install Doc Detective globally, you'll be prompted to install the first time you run an `npx` command.

## Get sample files

To test a few samples, clone the repo and navigate to the `samples` directory:

```bash
git clone https://github.com/doc-detective/doc-detective.git
cd doc-detective/samples
npm i
```

## Run tests

To run your tests, use the `runTests` command:

```bash
npx doc-detective runTests
```

By default, Doc Detective scans the current directory for valid tests, but you can specify your test file with the `--input` argument. For example, to run tests in a file named `doc-content-inline-tests.md`, run the following command:

```bash
npx doc-detective runTests --input doc-content-inline-tests.md
```

To customize your test, file type, and directory options, create a `.doc-detective.json` [config](/reference/schemas/config.html) file. If a `.doc-detective.json` file exists in the directory when you run the comment, Doc Detective loads the config. Otherwise, you can specify a config path with the `--config` argument.

```bash
npx doc-detective runTests --config .doc-detective.json
```

**Note**: All paths are relative to the current working directory, regardless where the config file is located.

You can override config options with command-line arguments. For example, to run tests in a file named `tests.spec.json`, even if that isn't included in your config, run the following command:

```bash
npx doc-detective runTests --config .doc-detective.json --input tests.spec.json
```

## Check your test coverage

You can check the test coverage of your documentation source files with the `runCoverage` command, specifying the source file or directory of source files with the `--input` argument. Doc Detective identifies potential areas of test coverage with file-format-specific regex, and supports CommonMark syntax natively. If you want to test coverage of a file with different syntax, update your the `fileTypes` object of your [config](/reference/schemas/config.html) file accordingly.

```bash
npx doc-detective runCoverage --config .doc-detective.json --input doc-content.md
```

## Concepts

For new users, here are some key concepts to understand:

- [**Test specification**](/reference/schemas/specification.html): A group of tests to run in one or more contexts. Conceptually parallel to a document.
- [**Test**](/reference/schemas/test.html): A sequence of steps to perform. Conceptually parallel to a procedure.
- **Step**: A portion of a test that includes a single action. Conceptually parallel to a step in a procedure.
- **Action**: The task performed in a step. Doc Detective supports a variety of actions:
  - [**goTo**](/reference/schemas/goTo.html): Navigate to a specified URL.
  - [**find**](/reference/schemas/find.html): Locate and interact with an element on the page.
  - [**typeKeys**](/reference/schemas/typeKeys.html): Type keys. To type special keys, begin and end the string with `$` and use the special key’s enum. For example, to type the Escape key, enter `$ESCAPE$`.
  - [**wait**](/reference/schemas/wait.html): Pause before performing the next action.
  - [**saveScreenshot**](/reference/schemas/saveScreenshot.html): Take a screenshot in PNG format.
  - [**setVariables**](/reference/schemas/setVariables.html): Load environment variables from a `.env` file.
  - [**startRecording**](/reference/schemas/startRecording.html) and [**stopRecording**](/reference/schemas/stopRecording.html): Capture a video of test execution.
  - [**checkLink**](/reference/schemas/checkLink.html): Check if a URL returns an acceptable status code from a GET request.
  - [**httpRequest**](/reference/schemas/httpRequest.html): Perform a generic HTTP request, for example to an API.
  - [**runShell**](/reference/schemas/runShell.html): Perform a native shell command.
- [**Context**](/reference/schemas/context.html): An application and platforms that support the tests.

## Resources

There are a handful of resources to help you write and run tests:

- The [Action Builder](/app) prototype is an interactive tool to help you build test actions, using the same action definitions and validations as Doc Detective itself.
- The [Reference](/reference/) includes detailed information about the schemas and actions available in Doc Detective.
- The [Discord](https://discord.gg/7Qb3bJ6) community is a great place to ask questions and get help from other users and the maintainers.
- The [Issue tracker](https://github.com/doc-detective/doc-detective/issues) is the best place to report bugs and request new features.
- The [Contribution guide](https://github.com/doc-detective/doc-detective/blob/main/CONTRIBUTIONS.md) includes information about how to contribute to the project.
