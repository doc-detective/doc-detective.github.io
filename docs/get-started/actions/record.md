---
title: record
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
description: Start capturing a video of test execution.
---

# record

The `record` action starts recording the browser viewport as a video file (MP4, WebM, or GIF). This is useful for debugging failed tests or creating multimedia documentation. Recording continues until a `stopRecord` step is encountered.

*Note: Recording is currently only supported in visible Chrome browsers.*

You can specify the recording action in several ways:

- **Boolean Shorthand:** Set `record: true` to start recording with default settings (usually saved as `record_<timestamp>.mp4` in the output directory).
- **String Shorthand:** Provide a file path directly as the value for the `record` key (e.g., `record: "test_session.webm"`). This starts recording to the specified path. Supported extensions are `.mp4`, `.webm`, and `.gif`.
- **Object Format:** Use an object for more control over the output file:
  - `path`: (Optional) The file path where the recording will be saved. Can include directories. If omitted, a default path is generated.
  - `directory`: (Optional) The directory where the recording will be saved. If `path` includes a directory, this is ignored. Defaults to the configured output directory.
  - `overwrite`: (Optional) Set to `true` to overwrite an existing file at the target path. Defaults to `false`.

**Stopping the Recording:** You *must* include a `stopRecord` step later in your test to finalize and save the video file.

> For comprehensive options, see the [`record`](/docs/references/schemas/record) and [`stopRecord`](/docs/references/schemas/stoprecord) references.

## Examples

Here are a few ways you might use the `record` and `stopRecord` actions:

### Simple recording (boolean shorthand)

Starts recording to a default path like `output/record_1745032062266.mp4` and stops later.

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Start recording.",
          "record": true
        },
        {
          "description": "Perform some actions...",
          "goTo": "https://example.com"
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

### Recording to a specific path (string shorthand)

Records to `./output/media/login_flow.webm`.

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Start recording to a specific WebM file.",
          "record": "./output/media/login_flow.webm"
        },
        {
          "description": "...",
          "find": "Login"
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

### Recording with object format (overwrite enabled)

Records to `test_video.gif` in the `output/gifs` directory, overwriting if it exists.

```json
{
  "tests": [
    {
      "steps": [
        {
          "description": "Start recording a GIF, overwriting if necessary.",
          "record": {
            "path": "test_video.gif",
            "directory": "./output/gifs",
            "overwrite": true
          }
        },
        {
          "description": "...",
          "wait": 2000
        },
        {
          "description": "Stop recording.",
          "stopRecord": true
        }
      ]
    }
  ]
}
