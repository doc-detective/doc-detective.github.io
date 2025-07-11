---
title: stopRecord
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
description: Stop capturing a video of test execution.
---

# stopRecord

The `stopRecord` action stops a video recording previously started by a [`record`](record) action and saves the video file.

This action takes a simple boolean value:

- `stopRecord: true`: Stops the current recording.

>Note: You must include a `stopRecord: true` step to finalize and save any recording started with the `record` action.
>
> For comprehensive options, see the [`stopRecord`](/docs/references/schemas/stoprecord) reference.

## Example

This example starts recording, performs an action, and then stops the recording.

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Start recording.",
          "record": "./output/session_video.mp4"
        },
        {
          "description": "Navigate to the site.",
          "goTo": "https://example.com"
        },
        {
          "description": "Stop the recording.",
          "stopRecord": true
        }
      ]
    }
  ]
}
```
