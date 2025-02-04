
# saveScreenshot

Takes a screenshot in PNG format.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. The action to perform. | 
path | string |  Optional. File path of the PNG file, relative to `directory`. If not specified, the file name is the ID of the step. | 
directory | string |  Optional. Directory of the PNG file. If the directory doesn't exist, creates the directory. | 
maxVariation | number |  Optional. Allowed variation in percentage of pixels between the new screenshot and the exisitng screenshot at `path`. If the difference between the new screenshot and the existing screenshot is greater than `maxVariation`, the step fails. If a screenshot doesn't exist at `path`, this value is ignored. | `5`
overwrite | string |  Optional. If `true`, overwrites the existing screenshot at `path` if it exists.
If `byVariation`, overwrites the existing screenshot at `path` if the difference between the new screenshot and the existing screenshot is greater than `maxVariation`.<br/><br/>Accepted values: `true`, `false`, `byVariation` | `false`
crop | object |  Optional. Crops the screenshot. | 
crop.selector | string |  Required. Selector of the element to crop the image to. | 
crop.padding | One of<br/>-&nbsp;number<br/>-&nbsp;object |  Optional. undefined | 

## Examples

```json
{
  "action": "saveScreenshot"
}
```

```json
{
  "action": "saveScreenshot",
  "path": "results.png"
}
```

```json
{
  "action": "saveScreenshot",
  "path": "results.png",
  "directory": "static/images"
}
```

```json
{
  "action": "saveScreenshot",
  "path": "results.png",
  "directory": "static/images",
  "maxVariation": 10,
  "overwrite": "byVariation"
}
```

```json
{
  "action": "saveScreenshot",
  "path": "results.png",
  "directory": "static/images",
  "crop": {
    "selector": "#element"
  }
}
```

```json
{
  "action": "saveScreenshot",
  "path": "results.png",
  "directory": "static/images",
  "crop": {
    "selector": "#element",
    "padding": 10
  }
}
```

```json
{
  "action": "saveScreenshot",
  "path": "results.png",
  "directory": "static/images",
  "crop": {
    "selector": "#element",
    "padding": {
      "top": 10,
      "right": 20,
      "bottom": 30,
      "left": 40
    }
  }
}
```
