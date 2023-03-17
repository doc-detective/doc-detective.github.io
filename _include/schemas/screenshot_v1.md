# screenshot Schema

```txt
undefined
```

Navigate to a specified URI.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [screenshot\_v1.schema.json](screenshot_v1.schema.json "open original schema") |

## screenshot Type

`object` ([screenshot](screenshot_v1.md))

## screenshot Examples

```json
{
  "action": "screenshot",
  "filename": "results.png"
}
```

```json
{
  "action": "screenshot",
  "mediaDirectory": "samples",
  "filename": "results.png",
  "matchPrevious": true,
  "matchThreshold": 0.3
}
```

# screenshot Properties

| Property                          | Type      | Required | Nullable       | Defined by                                                                                      |
| :-------------------------------- | :-------- | :------- | :------------- | :---------------------------------------------------------------------------------------------- |
| [action](#action)                 | `string`  | Required | cannot be null | [screenshot](screenshot_v1-properties-action.md "undefined#/properties/action")                 |
| [mediaDirectory](#mediadirectory) | `string`  | Optional | cannot be null | [screenshot](screenshot_v1-properties-mediadirectory.md "undefined#/properties/mediaDirectory") |
| [filename](#filename)             | `string`  | Optional | cannot be null | [screenshot](screenshot_v1-properties-filename.md "undefined#/properties/filename")             |
| [matchPrevious](#matchprevious)   | `boolean` | Optional | cannot be null | [screenshot](screenshot_v1-properties-matchprevious.md "undefined#/properties/matchPrevious")   |
| [matchThreshold](#matchthreshold) | `number`  | Optional | cannot be null | [screenshot](screenshot_v1-properties-matchthreshold.md "undefined#/properties/matchThreshold") |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [screenshot](screenshot_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"screenshot"
```

## mediaDirectory

The directory path for media created by the action. Overrides the default directory config. Default is config.imageDirectory or config.videoDirectory depending on the file type.

`mediaDirectory`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [screenshot](screenshot_v1-properties-mediadirectory.md "undefined#/properties/mediaDirectory")

### mediaDirectory Type

`string`

## filename

Name of the media file. If not specified, the filename is randomized.

`filename`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [screenshot](screenshot_v1-properties-filename.md "undefined#/properties/filename")

### filename Type

`string`

## matchPrevious

If `true`, performs a pixel-diff against an image that matches the path of the new screenshot. If a previous image doesn't exist at the path, this option is ignored.

`matchPrevious`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [screenshot](screenshot_v1-properties-matchprevious.md "undefined#/properties/matchPrevious")

### matchPrevious Type

`boolean`

## matchThreshold

Decimal value of percentage of pixels that must be different between the old and new screenshots to fail the action. For example, a value of `0.3` fails the action if the diff is 30% or more of pixels.

`matchThreshold`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [screenshot](screenshot_v1-properties-matchthreshold.md "undefined#/properties/matchThreshold")

### matchThreshold Type

`number`

### matchThreshold Constraints

**maximum**: the value of this number must smaller than or equal to: `1`

**minimum (exclusive)**: the value of this number must be greater than: `0`

### matchThreshold Default Value

The default value is:

```json
0.3
```
