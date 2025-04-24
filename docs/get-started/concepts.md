---
sidebar_label: Concepts
---

# Concepts

Learn the key concepts that form the foundation of Doc Detective.

## Test specification

A [test specification](/docs/references/schemas/specification) is a group of tests to run in one or more contexts. Conceptually parallel to a document.

## Test

A [test](/docs/get-started/tests/index.md) is a sequence of steps to perform. Conceptually parallel to a procedure.

## Step

A step is a portion of a test that includes a single action. Conceptually parallel to a step in a procedure.

## Action

An action is the task performed in a step. Doc Detective supports a variety of actions:

| Name                                                        | Description                                                                                                                                               |
| :---------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkLink](/docs/get-started/actions/checkLink.md)         | Check if a URL returns an acceptable status code from a GET request.                                                                                      |
| [find](/docs/get-started/actions/find.md)                   | Locate and interact with an element on the page.                                                                                                          |
| [click](/docs/get-started/actions/click.md)                 | Click an element.                                                                                                                                         |
| [goTo](/docs/get-started/actions/goTo.md)                   | Navigate to a specified URL.                                                                                                                              |
| [httpRequest](/docs/get-started/actions/httpRequest.md)     | Perform a generic HTTP request, for example to an API.                                                                                                    |
| [runShell](/docs/get-started/actions/runShell.md)           | Perform a native shell command.                                                                                                                           |
| [screenshot](/docs/get-started/actions/screenshot.md)       | Take a screenshot in PNG format.                                                                                                                          |
| [loadVariables](/docs/get-started/actions/loadVariables.md) | Load environment variables from a `.env` file.                                                                                                            |
| [record](/docs/get-started/actions/record.md)               | Capture a video of test run.                                                                                                                              |
| [stopRecord](/docs/get-started/actions/stopRecord.md)       | Stop capturing a video of test run.                                                                                                                       |
| [type](/docs/get-started/actions/type.md)                   | Type keys. To type special keys, begin and end the string with `$` and use the special key’s enum. For example, to type the Escape key, enter `$ESCAPE$`. |
| [wait](/docs/get-started/actions/wait.md)                   | Pause before performing the next action.                                                                                                                  |

## Context

A [context](/docs/references/schemas/context.md) consists of an application and platforms that support the tests.

## Next steps

- [Create your first test](/docs/get-started/create-your-first-test.md)
