
# record

Start recording the current browser viewport. Must be followed by a `stopRecord` step. Only runs in Chrome browsers when they are visible. Supported extensions: [ '.mp4', '.webm', '.gif' ]

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
path | string |  Optional. File path of the recording. Supports the `.mp4`, `.webm`, and `.gif` extensions. If not specified, the file name is the ID of the step, and the extension is `.mp4`. | 
directory | string |  Optional. Directory of the file. If the directory doesn't exist, creates the directory. | 
overwrite | string |  Optional. If `true`, overwrites the existing recording at `path` if it exists.<br/><br/>Accepted values: `true`, `false` | 

## Examples

```json
true
```

```json
"results.mp4"
```

```json
{
  "path": "results.mp4",
  "directory": "static/media",
  "overwrite": "true"
}
```
