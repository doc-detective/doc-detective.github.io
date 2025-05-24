
# fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[9]-allOf[1]-record-anyOf[1]-01e0a25a



## Referenced In

- [fileTypes-anyOf[0]-array-anyOf[1]-markup-array-actions-anyOf[1]-array-anyOf[1]-anyOf[9]-allOf[1]-5adb023d](/docs/references/schemas/filetypes-anyof-0--array-anyof-1--markup-array-actions-anyof-1--array-anyof-1--anyof-9--allof-1--5adb023d)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
path | string | Optional. File path of the recording. Supports the `.mp4`, `.webm`, and `.gif` extensions. If not specified, the file name is the ID of the step, and the extension is `.mp4`.<br/><br/>Pattern: `([A-Za-z0-9_-]*\.(mp4|webm|gif)$|\$[A-Za-z0-9_]+)` | 
directory | string | Optional. Directory of the file. If the directory doesn't exist, creates the directory. | 
overwrite | string | Optional. If `true`, overwrites the existing recording at `path` if it exists.<br/><br/>Accepted values: `true`, `false` | 

## Examples

```json
{
  "path": "example",
  "directory": "example",
  "overwrite": "true"
}
```
