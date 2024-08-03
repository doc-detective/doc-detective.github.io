
# startRecording

Start recording the current browser viewport. Must be followed by a `stopRecording` action. Only runs when the context `app` is `chrome` and `headless` is `false`. Supported extensions: [ '.mp4', '.webm', '.gif' ]

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. The action to perform. | 
path | string |  Optional. File path of the recording. Supports the `.mp4`, `.webm`, and `.gif` extensions. If not specified, the file name is the ID of the step, and the extension is `.mp4`. | 
directory | string |  Optional. Directory of the file. Attempts to create the directory if it doesn't exist. | 
overwrite | boolean |  Optional. If `true`, overwrites the existing file at `path` if it exists. | `false`

## Examples

```json
{
  "action": "startRecording"
}
```

```json
{
  "action": "startRecording",
  "path": "results.mp4"
}
```

```json
{
  "action": "startRecording",
  "path": "results.mp4",
  "directory": "static/media",
  "overwrite": true
}
```
