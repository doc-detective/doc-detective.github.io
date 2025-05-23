
# config

Configuration options for Doc Detective operations.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
configId | string | Optional. Identifier for the configuration. | 
input | string | Optional. Path(s) to test specifications and documentation source files. May be paths to specific files or to directories to scan for files. | 
input | array of string | Optional. Path(s) to test specifications and documentation source files. May be paths to specific files or to directories to scan for files. | 
output | string | Optional. Path of the directory in which to store the output of Doc Detective commands. If a file path is specified, Doc Detective attempts to honor the file name specified, but file path behavior is controlled by the configured reporters. | `.`
recursive | boolean | Optional. If `true` searches `input`, `setup`, and `cleanup` paths recursively for test specifications and source files. | `true`
relativePathBase | string | Optional. Whether paths should be interpreted as relative to the current working directory (`cwd`) or to the file in which they're specified (`file`).<br/><br/>Accepted values: `cwd`, `file` | `file`
loadVariables | string | Optional. Load environment variables from the specified `.env` file. | 
origin | string | Optional. Default protocol and domain to use for relative URLs. | 
beforeAny | string | Optional. Path(s) to test specifications to perform before those specified by `input`. Useful for setting up testing environments. | 
beforeAny | array of string | Optional. Path(s) to test specifications to perform before those specified by `input`. Useful for setting up testing environments. | 
afterAll | string | Optional. Path(s) to test specifications to perform after those specified by `input`. Useful for cleaning up testing environments. | 
afterAll | array of string | Optional. Path(s) to test specifications to perform after those specified by `input`. Useful for cleaning up testing environments. | 
detectSteps | boolean | Optional. Whether or not to detect steps in input files based on defined markup. | `true`
logLevel | string | Optional. Amount of detail to output when performing an operation.<br/><br/>Accepted values: `silent`, `error`, `warning`, `info`, `debug` | `info`
runOn | array of object | Optional. Contexts to run the test in. Overrides contexts defined at the config and spec levels. | 
fileTypes | array of string, object, object | Optional. Configuration for file types and their markup detection. | 
integrations | object | Optional. Options for connecting to external services. | 
integrations.openApi | array of unknown | Optional. No description provided. | 
telemetry | object | Optional. Options around sending telemetry for Doc Detective usage. | ``{"send":true}``
telemetry.send | boolean | Required. If `true`, sends Doc Detective telemetry. | `true`
telemetry.userId | string | Optional. Identifier for the organization, group, or individual running Doc Detective. | 

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
