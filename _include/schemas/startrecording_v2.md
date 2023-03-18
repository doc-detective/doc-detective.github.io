# startRecording Schema

```txt
undefined
```

Start recording the current browser viewport. Must be followed by a `stopeRecording` action. Supported extensions: \[ '.mp4', '.webm', '.gif' ]

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [startRecording\_v2.schema.json](startRecording_v2.schema.json "open original schema") |

## startRecording Type

`object` ([startRecording](startrecording_v2.md))

## startRecording Examples

```json
{
  "action": "startRecording"
}
```

```json
{
  "action": "startRecording",
  "path": "results.mp4",
  "fps": 30
}
```

# startRecording Properties

| Property                    | Type      | Required | Nullable       | Defined by                                                                                        |
| :-------------------------- | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------ |
| [id](#id)                   | `string`  | Optional | cannot be null | [startRecording](startrecording_v2-properties-id.md "undefined#/properties/id")                   |
| [description](#description) | `string`  | Optional | cannot be null | [startRecording](startrecording_v2-properties-description.md "undefined#/properties/description") |
| [action](#action)           | `string`  | Required | cannot be null | [startRecording](startrecording_v2-properties-action.md "undefined#/properties/action")           |
| [path](#path)               | `string`  | Optional | cannot be null | [startRecording](startrecording_v2-properties-path.md "undefined#/properties/path")               |
| [fps](#fps)                 | `integer` | Optional | cannot be null | [startRecording](startrecording_v2-properties-fps.md "undefined#/properties/fps")                 |

## id

ID of the step.

`id`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [startRecording](startrecording_v2-properties-id.md "undefined#/properties/id")

### id Type

`string`

## description

Description of the step.

`description`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [startRecording](startrecording_v2-properties-description.md "undefined#/properties/description")

### description Type

`string`

## action

The action to perform.

`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [startRecording](startrecording_v2-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"startRecording"
```

## path

File path of the recording. Supports the `.mp4`, `.webm`, and `.gif` extensions. If not specified, the file path is your media directory, the file name is the ID of the step, and the extension is `.mp4`.

`path`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [startRecording](startrecording_v2-properties-path.md "undefined#/properties/path")

### path Type

`string`

### path Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
[A-Za-z0-9_-]*\.(mp4|MP4|webm|WEBM|gif|GIF)$
```

[try pattern](https://regexr.com/?expression=%5BA-Za-z0-9_-%5D*%5C.\(mp4%7CMP4%7Cwebm%7CWEBM%7Cgif%7CGIF\)%24 "try regular expression with regexr.com")

## fps

Target frames-per-second for the recording.

`fps`

*   is optional

*   Type: `integer`

*   cannot be null

*   defined in: [startRecording](startrecording_v2-properties-fps.md "undefined#/properties/fps")

### fps Type

`integer`

### fps Default Value

The default value is:

```json
30
```
