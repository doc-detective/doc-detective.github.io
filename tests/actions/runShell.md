---
title: runShell
layout: default
nav_order: 9
parent: Actions
grand_parent: Tests
---

# runShell

The `runShell` action runs a shell command or script on the local machine and evaluates the results. `runShell` is useful for extending the capabilities of Doc Detective to anything you can script.

> For comprehensive options, see the [runShell](/reference/schemas/runShell) reference.

`runShell` uses your device's native shell (`cmd` on Windows, `bash` on macOS and Linux) to execute the command. The command is executed in the context of the current user.

`runShell` can evaluate commands in two ways:

- **Exit code**: The command's exit code is checked against a list of expected exit codes set in the `exitCodes` parameter. If the command's exit code exists in the list of expected codes, the step passes. `exitCodes` defaults to `[0]`. You can specify non-zero exit codes to test for failure conditions.
- **Output**: If the expected output (as set in the `output` parameter) exists in the command's actual output (both stdout and stderr), the step passes. You can specify expected output as a string or a regular expression. To use a regular expression, the string must start and end with a forward slash, like in `/^hello world.*/`.

You can also set variables based on the command's output with the `setVariables` parameter. This is useful for capturing the output of a command and using it in subsequent steps. Each variable is set based on a regular expression match of the command's output.

## Examples

Here are a few ways you might use the `runShell` action:

### Run a simple command

This example prints "hello world" to the output.

```json
{
  "tests": [
    {
      "steps": [
        {
          "action": "runShell",
          "description": "Run a simple command.",
          "command": "echo 'hello world'"
        }
      ]
    }
  ]
}
```

### Run a command with expected output

This example runs a Docker container and checks the output for a specific string.

```json
{
  "tests": [
    {
      "steps": [
        {
          "action": "runShell",
          "description": "Run a Docker container and check the output.",
          "command": "docker run hello-world",
          "output": "Hello from Docker!"
        }
      ]
    }
  ]
}
```

### Test a failure condition

This example runs a failing command and checks the exit code. Because the command is expected to fail with an exit code `1`, the step passes.

```json
{
  "tests": [
    {
      "steps": [
        {
          "action": "runShell",
          "description": "Run a failing command.",
          "command": "false",
          "exitCodes": [1]
        }
      ]
    }
  ]
}
```

### Set a variable based on command output

The first step echoes "setup", validates that it outputs a string or one or more characters, and sets a variable based on the output. The next step echoes the variable, then validates that the command output "setup".

```json
{
  "tests": [
    {
      "steps": [
        {
          "action": "runShell",
          "description": "Set a variable based on command output.",
          "command": "echo setup",
          "output": "/.+/",
          "setVariables": [
            {
              "name": "TEST",
              "regex": ".*"
            }
          ]
        },
        {
          "action": "runShell",
          "description": "Echo and validate the variable.",
          "command": "echo $TEST",
          "output": "setup"
        }
      ]
    }
  ]
}
```
