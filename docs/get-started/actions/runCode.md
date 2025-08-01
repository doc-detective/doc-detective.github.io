---
title: runCode
layout: default
nav_order: 1 # Adjust nav_order as needed
parent: Actions
grand_parent: Tests
description: Assemble and run code snippets in various languages.
---

# runCode

The `runCode` action executes a code snippet in a specified language (like JavaScript, Python, Bash, etc.) on the local machine and evaluates the results. This allows embedding executable code directly within your tests.

`runCode` executes the code using the appropriate interpreter available on the machine.

You must specify the `runCode` action using an object format with the following properties:

- **Object Format:**
  - `language`: (Required) The programming language of the code snippet (`javascript`, `python`, `bash`).

    > Note: `bash` isn't currently supported on Windows.

  - `code`: (Required) The code snippet to execute as a string.
  - `workingDirectory`: (Optional) The directory in which to run the code.
  - `timeout`: (Optional) Maximum duration in milliseconds to wait for the code execution to complete.
  - `exitCodes`: (Optional) An array of acceptable exit codes. If the code execution's exit code is not in this list, the step fails (default: `[0]`).
  - `stdio`: (Optional) A string or regular expression to validate against the code's combined stdout and stderr. If the output doesn't match, the step fails. Regex must start and end with `/` (e.g., `/^hello world.*/`).
  - *Output Saving:* You can also save the code's output using `path`, `directory`, `maxVariation`, and `overwrite` properties. See the [`runCode`](/docs/references/schemas/runcode) reference for details.

**Setting Variables:** To capture output into variables for later steps, use the step-level `variables` object. You can assign values based on the code's output using expressions like `$$stdio.stdout`, `$$stdio.stderr`, or `$$exitCode`.

> For comprehensive options, see the [`runCode`](/docs/references/schemas/runcode) reference.

## Examples

Here are a few ways you might use the `runCode` action:

### Run a simple Python script

This example prints "hello world" using Python.

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Run a simple Python script.",
          "runCode": {
            "language": "python",
            "code": "print('hello world')"
          }
        }
      ]
    }
  ]
}
```

### Run JavaScript code with expected output validation

This example runs a simple Node.js script and checks the output.

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Run JS code and check the output.",
          "runCode": {
            "language": "javascript",
            "code": "console.log('Hello from Node!');",
            "stdio": "Hello from Node!"
          }
        }
      ]
    }
  ]
}
```

### Test a failure condition using exit codes (Bash)

This example runs a Bash command (`false`) via `runCode` and checks that the exit code is `1`. Because the command is expected to fail with exit code 1, the step passes.

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Run a failing Bash command and expect exit code 1.",
          "runCode": {
            "language": "bash",
            "code": "false",
            "exitCodes": [1]
          }
        }
      ]
    }
  ]
}
```

### Set a variable based on code output (Python)

The first step runs Python code to print "setup", validates the output using a regex, and captures the full stdout into a variable named `SETUP_VAL`. The second step uses Bash via `runCode` to echo the content of the `SETUP_VAL` variable and validates that the output is indeed "setup".

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Set a variable based on Python output.",
          "runCode": {
            "language": "python",
            "code": "import sys; sys.stdout.write('setup')",
            "stdio": "/.+/"
          },
          "variables": {
            "SETUP_VAL": "$$stdio.stdout" 
          }
        },
        {
          "description": "Echo and validate the variable using Bash.",
          "runCode": {
            "language": "bash",
            "code": "echo $SETUP_VAL",
            "stdio": "setup"
          }
        }
      ]
    }
  ]
}
```
