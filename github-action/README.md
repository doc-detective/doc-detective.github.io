# Doc Detective as a GitHub Action

:octocat: The official GitHub Action for [Doc Detective](https://github.com/doc-detective/doc-detective). Keep your docs accurate with ease.

## Usage

Create a YAML file in your `.github/workflows` directory with the following content:

```yaml
name: doc-detective
on: [pull_request]

jobs:
  runTests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: doc-detective/github-action@v1
```

The action outputs the results of the command as a JSON-formatted string that you can use this in subsequent steps in the same job. See [`results`](#results).

**Note:** On Ubuntu, this action only supports headless mode. Firefox and Chrome contexts automatically fall back to headless mode when necessary. If your tests doesn't work in headless mode (like if you need the 'startRecording' action), use macOS or Windows.

## Inputs

You can customize the action with the following optional inputs.

To add an input, edit your workflow file to include the `with` key to the `uses` block. For example:

```yaml
- uses: doc-detective/github-action@v1
  with:
    version: latest
```

### `version` (default: latest)

Specify the version of Doc Detective to use. This can be a specific version number or an NPM tag (like `latest`).

```yaml
- uses: doc-detective/github-action@v1
  with:
    version: 2.15.0
```

### `working_directory` (default: Repository root)

The working directory for the action, relative to the root of the repository. This is where the action looks for the configuration file and where it runs the command.

```yaml
- uses: doc-detective/github-action@v1
  with:
    working_directory: path/to/your/directory
```

### `command` (default: `runTests`)

The command to run. Valid values are "runTests" and "runCoverage".

```yaml
- uses: doc-detective/github-action@v1
  with:
    command: runCoverage
```

### `config`

The path to the configuration file.

```yaml
- uses: doc-detective/github-action@v1
  with:
    config: path/to/your/config.json
```

### `input`

Path to the input file or directory. Overrides the "input" field in the config file.

```yaml
- uses: doc-detective/github-action@v1
  with:
    input: path/to/your/tests
```

### `create_pr_on_change` (default: `false`)

Create a pull request if any files in the repo change, such as if screenshots or command results get updated. Only valid if `command` is `runTests`. Commits, branches, and pull requests are created with the credentials of the workflow run that triggered the action.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_pr_on_change: true
```

You need to manually allow GitHub Actions to create pull requests for your repo. From your repository, go to **Settings** > **Actions** > **General** and select **Allow GitHub Actions to create and approve pull requests**. Despite the setting name, Doc Detective will never approve pull requests. If your repo belongs to an organization, an organization owner must allow this setting.

This input also requires the workflow or job to have `write` access for the`contents` scope to create a branch and `write` access for the `pull-requests` scope to create a pull request. You can set the necessary permissions in the workflow file like this:

```yaml
name: doc-detective
on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  runTests:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write

    steps:
      - uses: actions/checkout@v4
      - uses: doc-detective/github-action@v1
        with:
          create_pr_on_change: true
```

### `pr_branch` (default: `doc-detective-{DATE}`)

The name of the branch to create for the pull request. Only valid if `create_pr_on_change` is `true`.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_pr_on_change: true
    pr_branch: doc-detective-changes
```

### `pr_title` (default: `Doc Detective Changes`)

The title of the created pull request. Only valid if `create_pr_on_change` is `true`.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_pr_on_change: true
    pr_title: Doc Detective found changes
```

### `pr_body` (default: See example)

The body of the created pull request. `$RUN_URL` inserts the URL of the workflow run that created the pull request. Only valid if `create_pr_on_change` is `true`.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_pr_on_change: true
    pr_body: |
      A Doc Detective run ($RUN_URL) updated files.
~~~~
      DISCLAIMER: This pull request doesn't reflect whether Doc Detective tests passed for failed, only that files in the repository changed. Review the changes to make sure they're accurate.
```

### `pr_labels` (default: `doc-detective`)

Comma-separated list of labels to apply to the pull request. Only valid if `create_pr_on_change` is `true`.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_pr_on_change: true
    pr_labels: doc-detective,for-review
```

### `pr_assignees`

Comma-separated list of GitHub usernames to assign to the pull request. Only valid if `create_pr_on_change` is `true`.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_pr_on_change: true
    pr_assignees: octocat,monalisa
```

### `pr_reviewers`

Comma-separated list of GitHub usernames to request a review from. Only valid if `create_pr_on_change` is `true`.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_pr_on_change: true
    pr_reviewers: octocat,monalisa
```

### `exit_on_fail` (default: `false`)

Exit with a non-zero code if one or more tests fails. Only valid if `command` is `runTests`.

```yaml
- uses: doc-detective/github-action@v1
  with:
    exit_on_fail: true
```

### `create_issue_on_fail` (default: `false`)

Create a GitHub issue if one or more tests fails. Only valid if `command` is `runTests`.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_issue_on_fail: true
```

This input requires the workflow or job to have `write` access for the `issues` scope. You can set the necessary permissions in the workflow file like this:

```yaml
name: doc-detective
on: [pull_request]

jobs:
  runTests:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: write
    steps:
      - uses: actions/checkout@v4
      - uses: doc-detective/github-action@v1
        with:
          create_issue_on_fail: true
```

### `issue_title` (default: `Doc Detective Failure`)

The title of the created GitHub issue. Only valid if `create_issue_on_fail` is set to `true`.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_issue_on_fail: true
    issue_title: Doc Detective found issues in the documentation
```

### `issue_body` (default: `Doc Detective run failed with the following results:$RESULTS`)

he body of the created GitHub issue. Use the `$RESULTS` variable to insert the results object. Only valid if `create_issue_on_fail` is set to `true`.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_issue_on_fail: true
    issue_body: |
      Doc Detective found issues in the documentation. Review and fix the issues.

      Results:
      $RESULTS
```

### `issue_labels` (default: `doc-detective`)

Comma-separated list of labels to apply to the GitHub issue. Only valid if `create_issue_on_fail` is set to `true`.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_issue_on_fail: true
    issue_labels: doc-detective,documentation
```

### `issue_assignees`

Comma-separated list of GitHub usernames to assign to the GitHub issue. Only valid if `create_issue_on_fail` is set to `true`.
  
```yaml
- uses: doc-detective/github-action@v1
  with:
    create_issue_on_fail: true
    issue_assignees: octocat,monalisa
```

### `token` (default: `${{ github.token }}`)

The GitHub token to use for creating issues. Defaults to the token already available to the GitHub Action workflow. Only set this if you want to override the default token.

```yaml
- uses: doc-detective/github-action@v1
  with:
    create_issue_on_fail: true
    token: ${{ secrets.MY_GITHUB_TOKEN }}
```

## Outputs

The action sets the following outputs:

### `results`

JSON-formatted results of the command. This can be used in subsequent steps in the same job.

```yaml
- uses: doc-detective/github-action@v1
  id: doc-detective
- run: echo "${{ steps.doc-detective.outputs.results }}"
```

### `pull_request_url`

URL of the created pull request. Only set if `create_pr_on_change` is `true`.

```yaml
- uses: doc-detective/github-action@v1
  id: doc-detective
  with:
    create_pr_on_change: true
- run: echo "${{ steps.doc-detective.outputs.pull_request_url }}"
```

### `issue_url`

URL of the created GitHub issue. Only set if `create_issue_on_fail` is `true`.

```yaml
- uses: doc-detective/github-action@v1
  id: doc-detective
  with:
    create_issue_on_fail: true
- run: echo "${{ steps.doc-detective.outputs.issue_url }}"
```