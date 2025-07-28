---
sidebar_label: Fill in Fields
description: Run a short test that fills in the first and last name fields in a form.
---

# Fill in Fields

A basic test is to fill in the fields of a form. This short script opens a sample input form for the Watson and Holmes Forensic Consulting agency and fills in just the first and last name.

To run the test:

1. Download the TestExamples Zip file and expand it to your local drive.
2. In a terminal window, navigate to the TestExamples directory.
3. Start your local server, if it isn't currently running. For example, enter the command `live-server`.
4. Enter the command `npx doc-detective@dev -i form-filler1.json -l

![First and Last Names fields completed.](./img/form-filled-1-first-and-last-name.png)

## Code Walkthrough

```json
{
    "tests": [
        {
```

The first part of the test specification describes the execution environment (what platform and browser the test should run on). You can specify your own platform, but it doesn't hurt to make the script compatible with other platforms, as well.

```json
            "runOn": [
                {
                    "platforms": [
                        "windows",
                        "mac",
                        "linux"
                    ],
```

The Chrome browser is the only browser that currently supports the record feature, which we'll use in later examples.

```json
                    "browsers": {
                        "name": "chrome",
```

When you run the test in the _headless_ state, the test runs without displaying the actions in a browser window. Setting this to false lets you watch the actions in your test.

```json
                        "headless": false,
```

The form in this example is too large to fit on the screen. We can set the window and viewport to the full size, even if it isn't displayed at this time. This is important for taking screenshots, which are covered in a later tutorial.

```json
                        "window": {
                            "width": 1200,
                            "height": 1500
                        },
                        "viewport": {
                            "width": 1180,
                            "height": 1480
                        }
                    }
                }
            ],
```

Having set up the run environment, you can define the action steps for the test. First, open the form in a web browser.

```json
            "steps": [
                {
                    "description": "Go to the specified URL",
                    "goTo": "http://localhost:8080/watson_and_holmes_intake_form.html"
                },
```

Locate an element with the label "First Name:" and type in the value _Alphie_.

```json
                {
                    "description": "Type in the First Name",
                    "find": {
                        "elementText": "First Name:",
                        "click": true,
                        "type": "Alphie"
                    }
                },
```

Locate an element with the label "Last Name:" and type in the value _Betaux_.

```json
                {
                    "description": "Type in the Last Name",
                    "find": {
                        "elementText": "Last Name:",
                        "click": true,
                        "type": "Betaux"
                    }
                },
```

Pause 10 seconds, allowing you to see the results, then end the test.

```json
                {
                    "description:": "Pause long enough to show the changes.",
                    "wait": 10000
                }
            ]
        }
    ]
}
```

## Complete Code Sample

```json
{
    "tests": [
        {
            "runOn": [
                {
                    "platforms": [
                        "windows",
                        "mac",
                        "linux"
                    ],
                    "browsers": {
                        "name": "chrome",
                        "headless": false,
                        "window": {
                            "width": 1200,
                            "height": 1500
                        },
                        "viewport": {
                            "width": 1180,
                            "height": 1480
                        }
                    }
                }
            ],
            "steps": [
                {
                    "description": "Go to the specified URL",
                    "goTo": "http://localhost:8080/watson_and_holmes_intake_form.html"
                },
                {
                    "description": "Type in the First Name",
                    "find": {
                        "elementText": "First Name:",
                        "click": true,
                        "type": "Alphie"
                    }
                },
                {
                    "description": "Type in the Last Name",
                    "find": {
                        "elementText": "Last Name:",
                        "click": true,
                        "type": "Betaux"
                    }
                },
                {
                    "description": "Capture a screenshot of the completed form.",
                    "screenshot": "./output/form-filled-1-first-and-last-name.png"
                },
                {
                    "description:": "Pause long enough to show the changes.",
                    "wait": 10000
                }
            ]
        }
    ]
}
```
Next Step: [Capturing a Screenshot](./capture-screenshot).
