---
sidebar_label: Concepts
description: Core concepts and terminology for Doc Detective test framework
---

# Concepts

Learn the key concepts that form the foundation of Doc Detective. These concepts map to JSON structures in test specifications.

## Test specification

A [test specification](/docs/references/schemas/specification) is a group of tests to run in one or more contexts. Conceptually parallel to a document.

**Structure:**
```json
{
  "tests": [ /* array of test objects */ ],
  "contexts": [ /* optional array of context objects */ ]
}
```

**Key properties:**
- `tests`: Array of test objects (required)
- `contexts`: Array defining browser/app configurations (optional)

---

## Test

A [test](/docs/get-started/tests) is a sequence of steps to perform. Conceptually parallel to a procedure.

**Structure:**
```json
{
  "id": "unique-test-id",
  "description": "Test description",
  "steps": [ /* array of step objects */ ]
}
```

**Key properties:**
- `id`: Unique identifier (optional but recommended)
- `description`: Human-readable description (optional)
- `steps`: Array of step objects (required)

---

## Step

A step is a portion of a test that includes a single action. Conceptually parallel to a step in a procedure.

**Structure:**
```json
{
  "action": "actionName",
  "description": "Step description",
  /* action-specific parameters */
}
```

**Key properties:**
- `action`: Action identifier (required)
- `description`: Human-readable description (optional)
- Action-specific parameters vary by action type

---

## Action

An action performs a task in a step. Doc Detective supports a variety of actions:

| Name                                                        | Description                                                                                                                                               |
| :---------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkLink](/docs/get-started/actions/checkLink)         | Check if a URL returns an acceptable status code from a GET request.                                                                                      |
| [find](/docs/get-started/actions/find)                   | Locate and interact with an element on the page.                                                                                                          |
| [click](/docs/get-started/actions/click)                 | Click an element.                                                                                                                                         |
| [goTo](/docs/get-started/actions/goTo)                   | Navigate to a specified URL.                                                                                                                              |
| [httpRequest](/docs/get-started/actions/httpRequest)     | Perform a generic HTTP request, for example to an API.                                                                                                    |
| [runShell](/docs/get-started/actions/runShell)           | Perform a native shell command.                                                                                                                           |
| [screenshot](/docs/get-started/actions/screenshot)       | Take a screenshot in PNG format.                                                                                                                          |
| [loadVariables](/docs/get-started/actions/loadVariables) | Load environment variables from a `.env` file.                                                                                                            |
| [saveCookie](/docs/get-started/actions/saveCookie)       | Save a specific browser cookie to a file or environment variable for later reuse.                                                                         |
| [loadCookie](/docs/get-started/actions/loadCookie)       | Load a specific cookie from a file or environment variable into the browser.                                                                              |
| [record](/docs/get-started/actions/record)               | Capture a video of the test run.                                                                                                                              |
| [stopRecord](/docs/get-started/actions/stopRecord)       | Stop capturing a video of the test run.                                                                                                                       |
| [type](/docs/get-started/actions/type)                   | Type keys. To type special keys, begin and end the string with `$` and use the special key’s enum. For example, to type the Escape key, enter `$ESCAPE$`. |
| [wait](/docs/get-started/actions/wait)                   | Pause before performing the next action.                                                                                                                  |

## Context

A [context](/docs/references/schemas/context) consists of an application and platforms that support the tests.

## Next steps

- [Create your first test](/docs/get-started/create-your-first-test)

**Action categories:**
- **Navigation:** goTo
- **Element interaction:** find, click, type, dragAndDrop
- **Capture:** screenshot, record, stopRecord
- **Validation:** checkLink, httpRequest
- **Environment:** runShell, runCode, loadVariables, saveCookie, loadCookie
- **Timing:** wait

---

## Variables

Variables allow dynamic content in tests. Use the format `$VARIABLE_NAME$` to reference variables.

**Sources:**
- Environment variables
- Variables loaded from `.env` file via `loadVariables`
- Variables captured in steps using the `variables` property

**Example:**
```json
{
  "steps": [
    {"action": "loadVariables", "path": ".env"},
    {"action": "goTo", "url": "$BASE_URL$/login"}
  ]
}
```

---

## Result types

Each step returns a result status:

- **PASS:** Step completed successfully
- **FAIL:** Step failed to complete
- **WARNING:** Non-critical issue detected
- **SKIPPED:** Step was not executed

---
