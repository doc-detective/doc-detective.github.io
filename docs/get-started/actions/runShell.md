---
title: runShell
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
description: Perform a native shell command.
---

# runShell

The `runShell` action runs a shell command or script on the local machine and evaluates the results, extending Doc Detective's testing capabilities to anything you can script.

`runShell` uses your device's native shell (`cmd` on Windows, `bash` or other default shell on macOS/Linux) to execute the command in the context of the current user.

You can specify the command directly as a string or use an object for more options:

- **String Shorthand:** Provide the command string directly as the value for the `runShell` key.
- **Object Format:** Use an object with the following properties:
  - `command`: (Required) The command or script to execute.
  - `args`: (Optional) An array of arguments to pass to the command.
  - `workingDirectory`: (Optional) The directory in which to run the command.
  - `timeout`: (Optional) Maximum duration in milliseconds to wait for the command to complete.
  - `exitCodes`: (Optional) An array of acceptable exit codes. If the command's exit code is not in this list, the step fails (default: `[0]`).
  - `stdio`: (Optional) A string or regular expression to validate against the command's combined stdout and stderr. If the output doesn't match, the step fails. Regex must start and end with `/` (e.g., `/^hello world.*/`).
  - *Output Saving:* You can also save the command's output using `path`, `directory`, `maxVariation`, and `overwrite` properties. See the [`runShell`](/docs/references/schemas/runshell) reference for details.
  
**Setting Variables:** To capture output into variables for later steps, use the step-level `variables` object. You can assign values based on the code's output using expressions like `$$stdio.stdout`, `$$stdio.stderr`, or `$$exitCode`.

> For comprehensive options, see the [`runShell`](/docs/references/schemas/runshell) reference.

## Examples

Here are a few ways you might use the `runShell` action:

### Run a simple command (string shorthand)

This example prints "hello world" to the output.

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Run a simple command.",
          "runShell": "echo 'hello world'"
        }
      ]
    }
  ]
}
```

### Run a command with arguments (object format)

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Run echo with arguments.",
          "runShell": {
            "command": "echo",
            "args": ["hello", "world"]
          }
        }
      ]
    }
  ]
}
```

### Run a command with expected output validation

This example runs a Docker container and checks the output for a specific string.

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Run a Docker container and check the output.",
          "runShell": {
            "command": "docker run hello-world",
            "stdio": "Hello from Docker!"
          }
        }
      ]
    }
  ]
}
```

### Test a failure condition using exit codes

This example runs a failing command (`false`) and checks that the exit code is `1`. Because the command is expected to fail with exit code 1, the step passes.

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Run a failing command and expect exit code 1.",
          "runShell": {
            "command": "false",
            "exitCodes": [1]
          }
        }
      ]
    }
  ]
}
```

### Set a variable based on command output

The first step echoes "setup", validates the output using a regex, and captures the full stdout into a variable named `TEST`. The second step echoes the content of the `TEST` variable and validates that the output is indeed "setup".

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Set a variable based on command output.",
          "runShell": {
            "command": "echo setup",
            "stdio": "/.+/"
          },
          "variables": {
            "TEST": "$$stdio.stdout" 
          }
        },
        {
          "description": "Echo and validate the variable.",
          "runShell": {
            "command": "echo $TEST",
            "stdio": "setup"
          }
        }
      ]
    }
  ]
}
```
