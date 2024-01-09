---
title: Get started
layout: default
nav_order: 2
---

# Get started

Doc Detective is versatile, and you can deploy it in many ways to suit the requirements of your development environment. This guide covers the most common deployment methods: as a CLI tool.

You can run Doc Detective as a standalone CLI tool. When running as a CLI tool, you can specify default configuration options in [config.json](https://github.com/doc-detective/doc-detective/blob/main/sample/config.json) and override those defaults with command-line arguments. (For a list of arguments, complete the following steps and run `npm run test -- -h`.)

## Install

1.  Install prerequisites:

    - [Node.js](https://nodejs.org/) (tested on 18.16.0)

1.  In a terminal, clone the repo and install dependencies:

    ```bash
    git clone https://github.com/doc-detective/doc-detective.git
    cd doc-detective
    npm install
    ```

## Run tests

To run your tests, use the `runTests` command and specify your test file with the `--input` argument. For example, to run tests in a file named `doc-content.md` in the `samples` directory (like in this repo!), run the following command:

```bash
npm run runTests -- --input ./samples/doc-content.md
```

To customize your test, file type, and directory options, create a [`config.json`](https://doc-detective.com/reference/schemas/config.html) file and reference it with the `--config` argument.

```bash
npm run runTests -- --config ./samples/config.json
```

You can override `config.json` options with command-line arguments. For example, to run tests in a file named `tests.spec.json` in the `samples` directory, run the following command:

```bash
npm run runTests -- --config ./samples/config.json --input ./samples/tests.spec.json
```

To see all available options, use the `--help` argument:

```bash
npm run runTests -- --help
```

## Check your test coverage

You can check the test coverage of your documentation source files with the `runCoverage` command, specifying the source file or directory of source files with the `--input` argument. Doc Detective identifies potential areas of test coverage with file-format-specific regex, and supports CommonMark syntax natively. If you want to test coverage of a file with different syntax, update your the `fileTypes` object of your [`config.json`](https://doc-detective.com/reference/schemas/config.html) file accordingly.


```bash
npm run runCoverage -- --config ./samples/config.json --input ./samples/doc-content.md
```

To see all available options, use the `--help` argument:

```bash
npm run runCoverage -- --help
```