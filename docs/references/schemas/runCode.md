
# runCode

Assemble and run code.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. The action to perform. | 
language | string |  Required. Language of the code to run. If not specified, the code is run in the shell.<br/><br/>Accepted values: `python`, `bash`, `javascript` | 
code | string |  Required. Code to run. | 
args | array of strings |  Optional. Arguments for the command. | ``[]``
workingDirectory | string |  Optional. Working directory for the command. | `.`
exitCodes | array of integers |  Optional. Expected exit codes of the command. If the command's actual exit code isn't in this list, the step fails. | ``[0]``
output | string |  Optional. Content expected in the command's output. If the expected content can't be found in the command's output (either stdout or stderr), the step fails. Supports strings and regular expressions. To use a regular expression, the string must start and end with a forward slash, like in `/^hello-world.*/`. | 
savePath | string |  Optional. File path to save the command's output, relative to `saveDirectory`. | 
saveDirectory | string |  Optional. Directory to save the command's output. If the directory doesn't exist, creates the directory. If not specified, the directory is your media directory. | 
maxVariation | integer |  Optional. Allowed variation in percentage of text different between the current output and previously saved output. If the difference between the current output and the previous output is greater than `maxVariation`, the step fails. If output doesn't exist at `savePath`, this value is ignored. | `0`
overwrite | string |  Optional. If `true`, overwrites the existing output at `savePath` if it exists.
If `byVariation`, overwrites the existing output at `savePath` if the difference between the new output and the existing output is greater than `maxVariation`.<br/><br/>Accepted values: `true`, `false`, `byVariation` | `false`
timeout | integer |  Optional. Max time in milliseconds the command is allowed to run. If the command runs longer than this, the step fails. | `60000`
setVariables | array of objects |  Optional. Extract environment variables from the command's output. | ``[]``
setVariables.name | string |  Required. Name of the environment variable to set. | 
setVariables.regex | string |  Required. Regex to extract the environment variable from the command's output. | 
outputs | object |  Optional. Outputs from step processes and user-defined expressions. Use the `outputs` object to reference outputs in subsequent steps. If a user-defined output matches the key for a step-defined output, the user-defined output takes precedence. | 
outputs.stdout | string |  Optional. Standard output of the command. | 
outputs.stderr | string |  Optional. Standard error of the command. | 
outputs.exitCode | integer |  Optional. Exit code of the command. | 

## Examples

```json
{
  "action": "runCode",
  "language": "javascript",
  "code": "console.log('Hello, ${process.env.USER}!');"
}
```

```json
{
  "action": "runCode",
  "language": "bash",
  "code": "docker run hello-world",
  "timeout": 20000,
  "exitCodes": [
    0
  ],
  "output": "Hello from Docker!"
}
```

```json
{
  "action": "runCode",
  "language": "javascript",
  "code": "return false",
  "exitCodes": [
    1
  ]
}
```

```json
{
  "action": "runCode",
  "language": "python",
  "code": "print('Hello from Python')",
  "workingDirectory": ".",
  "exitCodes": [
    0
  ],
  "output": "Hello from Python!",
  "savePath": "python-output.txt",
  "saveDirectory": "output",
  "maxVariation": 10,
  "overwrite": "byVariation"
}
```
