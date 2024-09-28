# Explore sample tests

Use the sample test files provided to experiment with Doc Detective’s capabilities and see how it handles different scenarios.

## Get sample files

To get a few samples, [view the samples on GitHub](https://github.com/doc-detective/doc-detective/tree/main/samples) or clone the repo and navigate to the `samples` directory:

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

To customize your test, file type, and directory options, create a `.doc-detective.json` [config](/docs/references/schemas/config) file. If a `.doc-detective.json` file exists in the directory when you run the comment, Doc Detective loads the config. Otherwise, you can specify a config path with the `--config` argument.

```bash
npx doc-detective runTests --config .doc-detective.json
```

**Note**: All paths are relative to the current working directory, regardless where the config file is located.

You can override config options with command-line arguments. For example, to run tests in a file named `tests.spec.json`, even if that isn't included in your config, run the following command:

```bash
npx doc-detective runTests --config .doc-detective.json --input tests.spec.json
```

### Run remotely hosted tests

You can run tests hosted remotely by specifying the URL of the test file with the `--input` argument. For example, to run tests from a file hosted at `https://doc-detective.com/sample.spec.json`, run the following command:

```bash
npx doc-detective runTests --input https://doc-detective.com/sample.spec.json
```

These tests run the same way as local tests, but Doc Detective fetches the test file from the specified URL and stores it in a temporary directory. The URL must be accessible to the machine running the tests.

## Check your test coverage

You can check the test coverage of your documentation source files with the `runCoverage` command, specifying the source file or directory of source files with the `--input` argument. Doc Detective identifies potential areas of test coverage with file-format-specific regex, and supports CommonMark syntax natively. If you want to test coverage of a file with different syntax, update your the `fileTypes` object of your [config](/docs/references/schemas/config) file accordingly.

```bash
npx doc-detective runCoverage --config .doc-detective.json --input doc-content.md
```

## Next steps

- [Resources](/docs/get-started/resources.md)
