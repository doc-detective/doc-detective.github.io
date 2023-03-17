# startRecording Schema

```txt
undefined
```

Start recording the current browser viewport. Must be followed by a `stopeRecording` action. Supported extensions: \[ '.mp4', '.webm', '.gif' ]

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                             |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [startRecording\_v1.schema.json](startRecording_v1.schema.json "open original schema") |

## startRecording Type

`object` ([startRecording](startrecording_v1.md))

## startRecording Examples

```json
{
  "action": "startRecording"
}
```

```json
{
  "action": "startRecording",
  "overwrite": false,
  "mediaDirectory": "./samples",
  "filename": "results.mp4",
  "fps": 30,
  "width": 1200,
  "height": 800
}
```

# startRecording Properties

| Property                          | Type      | Required | Nullable       | Defined by                                                                                              |
| :-------------------------------- | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------ |
| [action](#action)                 | `string`  | Required | cannot be null | [startRecording](startrecording_v1-properties-action.md "undefined#/properties/action")                 |
| [overwrite](#overwrite)           | `boolean` | Optional | cannot be null | [startRecording](startrecording_v1-properties-overwrite.md "undefined#/properties/overwrite")           |
| [mediaDirectory](#mediadirectory) | `string`  | Optional | cannot be null | [startRecording](startrecording_v1-properties-mediadirectory.md "undefined#/properties/mediaDirectory") |
| [filename](#filename)             | `string`  | Optional | cannot be null | [startRecording](startrecording_v1-properties-filename.md "undefined#/properties/filename")             |
| [fps](#fps)                       | `integer` | Optional | cannot be null | [startRecording](startrecording_v1-properties-fps.md "undefined#/properties/fps")                       |
| [width](#width)                   | `integer` | Optional | cannot be null | [startRecording](startrecording_v1-properties-width.md "undefined#/properties/width")                   |
| [height](#height)                 | `integer` | Optional | cannot be null | [startRecording](startrecording_v1-properties-height.md "undefined#/properties/height")                 |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [startRecording](startrecording_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"startRecording"
```

## overwrite

If `true`, overwrites files at the specified path. If `false`, skips the action if a file exists at the specified path.

`overwrite`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [startRecording](startrecording_v1-properties-overwrite.md "undefined#/properties/overwrite")

### overwrite Type

`boolean`

## mediaDirectory

The directory path for media created by the action. Overrides the default directory config. Default is config.imageDirectory or config.videoDirectory depending on the file type.

`mediaDirectory`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [startRecording](startrecording_v1-properties-mediadirectory.md "undefined#/properties/mediaDirectory")

### mediaDirectory Type

`string`

## filename

Name of the media file. If not specified, the filename is randomized.

`filename`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [startRecording](startrecording_v1-properties-filename.md "undefined#/properties/filename")

### filename Type

`string`

## fps

Target frames-per-second for the recording.

`fps`

*   is optional

*   Type: `integer`

*   cannot be null

*   defined in: [startRecording](startrecording_v1-properties-fps.md "undefined#/properties/fps")

### fps Type

`integer`

### fps Default Value

The default value is:

```json
30
```

## width

Target width of the recording. Defaults to the browser window width.

`width`

*   is optional

*   Type: `integer`

*   cannot be null

*   defined in: [startRecording](startrecording_v1-properties-width.md "undefined#/properties/width")

### width Type

`integer`

## height

Target height of the recording. Defaults to the browser window height.

`height`

*   is optional

*   Type: `integer`

*   cannot be null

*   defined in: [startRecording](startrecording_v1-properties-height.md "undefined#/properties/height")

### height Type

`integer`
