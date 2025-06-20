
# config

Configuration options for Doc Detective operations.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
configId | string | Optional. Identifier for the configuration. | 
configPath | string | ReadOnly. Path to the configuration file. | 
input | one of:<br/>- string<br/>- array of string | Optional. Path(s) to test specifications and documentation source files. May be paths to specific files or to directories to scan for files. | `.`
output | string | Optional. Path of the directory in which to store the output of Doc Detective commands. If a file path is specified, Doc Detective attempts to honor the file name specified, but file path behavior is controlled by the configured reporters. | `.`
recursive | boolean | Optional. If `true` searches `input`, `setup`, and `cleanup` paths recursively for test specifications and source files. | `true`
relativePathBase | string | Optional. Whether paths should be interpreted as relative to the current working directory (`cwd`) or to the file in which they're specified (`file`).<br/><br/>Accepted values: `cwd`, `file` | `file`
loadVariables | string | Optional. Load environment variables from the specified `.env` file. | 
origin | string | Optional. Default protocol and domain to use for relative URLs. | 
beforeAny | one of:<br/>- string<br/>- array of string | Optional. Path(s) to test specifications to perform before those specified by `input`. Useful for setting up testing environments. | 
afterAll | one of:<br/>- string<br/>- array of string | Optional. Path(s) to test specifications to perform after those specified by `input`. Useful for cleaning up testing environments. | 
detectSteps | boolean | Optional. Whether or not to detect steps in input files based on defined markup. | `true`
logLevel | string | Optional. Amount of detail to output when performing an operation.<br/><br/>Accepted values: `silent`, `error`, `warning`, `info`, `debug` | `info`
concurrentRunners | number | Optional. Number of concurrent workers to use for parallel test context execution. Set to 1 for sequential execution (default behavior). Higher values can significantly improve performance for test suites with multiple contexts. | `1`
runOn | array of object([context](/docs/references/schemas/context)) | Optional. Contexts to run the test in. Overrides contexts defined at the config and spec levels. | 
fileTypes | array of one of: string, object([File type (custom)](/docs/references/schemas/File%20type%20(custom))), object([File type (executable)](/docs/references/schemas/File%20type%20(executable))) | Optional. Configuration for file types and their markup detection. | ``["markdown","asciidoc","html"]``
integrations | object([Integrations options](/docs/references/schemas/Integrations%20options)) | Optional. Options for connecting to external services. | 
telemetry | object([Telemetry options](/docs/references/schemas/Telemetry%20options)) | Optional. Options around sending telemetry for Doc Detective usage. | ``{"send":true}``
environment | object([Environment details](/docs/references/schemas/Environment%20details)) | ReadOnly. Environment information for the system running Doc Detective. | 

## Examples

```json
{}
```

```json
{
  "input": ".",
  "output": ".",
  "recursive": true,
  "loadVariables": ".env",
  "fileTypes": [
    "markdown"
  ]
}
```

```json
{
  "input": "./tests",
  "concurrentRunners": 4,
  "logLevel": "info"
}
```

```json
{
  "fileTypes": [
    {
      "extends": "markdown",
      "extensions": [
        "md",
        "markdown",
        "mdx"
      ],
      "inlineStatements": {
        "testStart": "<!--\\s*testStart\\s*(.*?)\\s*-->",
        "testEnd": "<!-- testEnd -->",
        "ignoreStart": "<!-- ignoreStart -->",
        "ignoreEnd": "<!-- ignoreEnd -->",
        "step": "<!--\\s*step\\s*(.*?)\\s*-->"
      },
      "markup": [
        {
          "name": "onscreenText",
          "regex": "\\*\\*.+?\\*\\*",
          "actions": "find"
        }
      ]
    }
  ]
}
```

```json
{
  "fileTypes": [
    {
      "name": "Jupyter Notebooks",
      "extensions": "ipynb",
      "runShell": {
        "command": "jupyter",
        "args": [
          "nbconvert",
          "--to",
          "script",
          "--execute",
          "$1",
          "--stdout"
        ]
      }
    },
    {
      "name": "JavaScript",
      "extensions": "js",
      "runShell": {
        "command": "node $1"
      }
    },
    {
      "name": "Python",
      "extensions": "py",
      "runShell": {
        "command": "python $1"
      }
    }
  ]
}
```

```json
{
  "environment": {
    "platform": "windows",
    "arch": "x64"
  }
}
```
