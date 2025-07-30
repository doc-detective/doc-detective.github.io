---
description: Run a test that fills all fields in a form, capturing a video of the changes.
---

# Record video

This example fills in all the fields on the Watson and Holmes Intake Form, while capturing a video record.

To run the test:

1. Download the [TestExamples.zip](./TestExamples.zip) file and expand it on your local drive.
2. In a terminal window, navigate to the `TestExamples` directory:

    ```shell
    cd TestExamples
    ```

3. Run the _form-filler3.json_ test spec with Doc Detective:

   ```shell
   npx doc-detective@dev -i form-filler3.json
   ```

To record, you must run the test with _headless_ mode turned off. The display window of the browser constrains the view area of the screenshot and video functions.

## Code walkthrough

These are the notable additions to the script used in the [Capture screenshot](capture-screenshot) tutorial.

For this example, the _headless_ setting must be false, so that the test actions are visible in the browser.

```json
                    "browsers": {
                        "name": "chrome",
                        "headless": false,
                        "viewport": {
                            "width": 1180,
                            "height": 1480
                        }
                    }
```

Start the recording with the [`record`](/docs/get-started/actions/record) action and an optional output path.

```json
                {
                    "description": "Start recording.",
                    "record": "./output/form-filler3-recording.mp4"
                },
```

After the actions are complete, stop the recording with the [`stopRecord`](/docs/get-started/actions/stopRecord) action.

```json
                {
                    "description": "Stop recording.",
                    "stopRecord": true
                }
```


## Complete code sample

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
                    "description": "Start recording.",
                    "record": "./output/form-filler3-recording.mp4"
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
                    "description": "Type in the Street Address",
                    "find": {
                        "elementText": "Street Address:",
                        "click": true,
                        "type": "123 Broadberry Lane"
                    }
                },
                {
                    "description": "Type in the City",
                    "find": {
                        "elementText": "City:",
                        "click": true,
                        "type": "London"
                    }
                },
                {
                    "description": "Type in the State/Province",
                    "find": {
                        "elementText": "State/Province:",
                        "click": true,
                        "type": "Greater London"
                    }
                },
                {
                    "description": "Type in the Postal Code",
                    "find": {
                        "elementText": "Postal Code:",
                        "click": true,
                        "type": "E1 6AN"
                    }
                },
                {
                    "description": "Type in the Country",
                    "find": {
                        "elementText": "Country:",
                        "click": true,
                        "type": "United Kingdom"
                    }
                },
                {
                    "description": "Type in the Email Address",
                    "find": {
                        "elementText": "Email Address:",
                        "click": true,
                        "type": "alphie.betaux@worcestershire.com"
                    }
                },
                {
                    "description": "Type in the Phone Number",
                    "find": {
                        "elementText": "Phone Number:",
                        "click": true,
                        "type": "020 7123 4567"
                    }
                },
                {
                    "description": "Select the Type of Case",
                    "find": {
                        "elementText": "Type of Case:",
                        "click": true,
                        "type": "Blackmail"
                    }
                },
                {
                    "description": "Type in the Case Description",
                    "find": {
                        "elementText": "Brief Description of Case:",
                        "click": true,
                        "type": "A mysterious case that needs solving."
                    }
                },
                {
                    "description": "Click the Postal Mail button",
                    "click": "Postal Mail"
                },
                {
                    "description": "Type in the Date of Inquiry",
                    "find": {
                        "elementText": "Date of Inquiry:",
                        "click": true,
                        "type": "02/18/1901"
                    }
                },
                {
                    "description": "Stop recording.",
                    "stopRecord": true
                }
            ]
        }
    ]
}
```