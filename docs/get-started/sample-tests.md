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

```bash
npx doc-detective
```

By default, Doc Detective scans the current directory for valid tests, but you can specify your test file with the `--input` argument. For example, to run tests in a file named `doc-content-inline-tests.md`, run the following command:

```bash
npx doc-detective --input doc-content-inline-tests.md
```

To customize your test, file type, and directory options, create a `.doc-detective.json` [config](/docs/references/schemas/config) file. If a `.doc-detective.json` file exists in the directory when you run the comment, Doc Detective loads the config. Otherwise, you can specify a config path with the `--config` argument.

```bash
npx doc-detective --config .doc-detective.json
```

**Note**: All paths are relative to the current working directory, regardless of the config file's location.

You can override config options with command-line arguments. For example, to run tests in a file named `tests.spec.json`, even if that isn't included in your config, run the following command:

```bash
npx doc-detective --config .doc-detective.json --input tests.spec.json
```

## Performance optimization

For test suites with multiple contexts, you can improve performance using parallel execution:

```bash
npx doc-detective --concurrentRunners 4
```

This runs up to 4 test contexts simultaneously instead of sequentially. See the [parallel execution guide](/docs/get-started/config/parallel-execution) for detailed configuration options and best practices.

<!-- ### Run remotely hosted tests

You can run tests hosted remotely by specifying the URL of the test file with the `--input` argument. For example, to run tests from a file hosted at `https://doc-detective.com/sample.spec.json`, run the following command:

```bash
npx doc-detective --input https://doc-detective.com/sample.spec.json
```

These tests run the same way as local tests, but Doc Detective fetches the test file from the specified URL and stores it in a temporary directory. The URL must be accessible to the machine running the tests.
 -->

## Next steps

- [Resources](/docs/get-started/resources.md)
