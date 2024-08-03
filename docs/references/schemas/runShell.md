
# runShell

Perform a native shell command.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. The action to perform. | 
command | string |  Required. Command to perform in the machine's default shell. | 
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

## Examples

```json
{
  "action": "runShell",
  "command": "echo",
  "args": [
    "$USER"
  ]
}
```

```json
{
  "action": "runShell",
  "command": "echo",
  "args": [
    "hello-world"
  ],
  "id": "ddec5e20-2e81-4f38-867c-92c8d9516755",
  "description": "This is a test!"
}
```

```json
{
  "action": "runShell",
  "command": "docker run hello-world",
  "timeout": 20000,
  "exitCodes": [
    0
  ],
  "output": "Hello from Docker!"
}
```

```json
{
  "action": "runShell",
  "command": "false",
  "exitCodes": [
    1
  ]
}
```

```json
{
  "action": "runShell",
  "command": "echo",
  "args": [
    "setup"
  ],
  "exitCodes": [
    0
  ],
  "output": "/.*?/",
  "setVariables": [
    {
      "name": "TEST",
      "regex": ".*"
    }
  ]
}
```

```json
{
  "action": "runShell",
  "command": "docker run hello-world",
  "workingDirectory": ".",
  "exitCodes": [
    0
  ],
  "output": "Hello from Docker!",
  "savePath": "docker-output.txt",
  "saveDirectory": "output",
  "maxVariation": 10,
  "overwrite": "byVariation"
}
```
