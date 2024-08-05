# How to contribute

Doc Detective welcomes contributions of all sorts. If you can't contribute code, you can still help by reporting issues, suggesting new features, improving the documentation, or [sponsoring](/support) the project. Please follow the guidelines below.

## Project architecture

Doc Detective is split into a variety of components (and repos) that interact with each other. This structure helps limit the specific scope of each repo, but it can make it a little troublesome to know where to start sometimes. We use [GitHub Projects](https://github.com/orgs/doc-detective/projects) to organize cross-repo dependencies and releases.

Some of the most common repos follow.

### `doc-detective`

[`doc-detective`](https://github.com/doc-detective/doc-detective) is the tool that performs tests and is the most common entrypoint for users. It's installable as an NPM package (`npm i -g doc-detective`) or immediately runnable via NPX (`npx doc-detective`).

This repo depends on
- [`doc-detective-core`](#doc-detective-core) for performing test logic.
- [`doc-detective-common`](#doc-detective-common) for config JSON schema and validation.

### `doc-detective-core` 

[`doc-detective-core`](https://github.com/doc-detective/doc-detective-core) performs the tests for Doc Detective. It's installable as an NPM package (`npm i doc-detective-core`). This is where all the config, test, and action logic is defined.

This repo depends on [`doc-detective-common`](#doc-detective-common) for config, test, and action JSON schemas and validation.

### `doc-detective-common`

[`doc-detective-common`](https://github.com/doc-detective/doc-detective-common) contains JSON schemas and shared functionaly (such as schema validation and relative path resolution logic) for all Doc Detective projects. This is where all the config, test, and action objects are defined.

This repo doesn't depend on any other Doc Detective projects.

## Reporting issues

If you find a bug, report it on the [GitHub issue tracker](https://github.com/doc-detective/doc-detective-core/issues).

## Contributing code or docs

1. Fork the project.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request to the `rc` (release candidate) branch.
5. Wait for your pull request to be reviewed. All discussions regarding the pull request will be conducted on GitHub.
6. Make any necessary changes to your pull request.
7. Your pull request will be merged if it is reviewed and approved.

## Contributor license agreement

Before any contributions are accepted, you must sign the [contributor license agreement](https://cla-assistant.io/doc-detective/doc-detective.github.io). This agreement ensures that your contributions are properly licensed and maintains the project's open-source status and ongoing health.
