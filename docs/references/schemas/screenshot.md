
# screenshot

Takes a screenshot in PNG format.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
path | string |  Optional. File path of the PNG file. Accepts absolute paths. If not specified, the file name is the ID of the step. | 
directory | string |  Optional. Directory of the PNG file. If the directory doesn't exist, creates the directory. | 
maxVariation | number |  Optional. Allowed variation in percentage of pixels between the new screenshot and the existing screenshot at `path`. If the difference between the new screenshot and the existing screenshot is greater than `maxVariation`, the step fails. If a screenshot doesn't exist at `path`, this value is ignored. | `0.05`
overwrite | string |  Optional. If `true`, overwrites the existing screenshot at `path` if it exists.
If `aboveVariation`, overwrites the existing screenshot at `path` if the difference between the new screenshot and the existing screenshot is greater than `maxVariation`.<br/><br/>Accepted values: `true`, `false`, `aboveVariation` | `aboveVariation`
crop | One of<br/>-&nbsp;string([Crop by element](/docs/references/schemas/Crop by element))<br/>-&nbsp;object([Crop by element (detailed)](/docs/references/schemas/Crop by element (detailed))) |  Optional. No description provided. | 

## Examples

```json
true
```

```json
"image.png"
```

```json
"static/images/image.png"
```

```json
"/User/manny/projects/doc-detective/static/images/image.png"
```

```json
{
  "path": "image.png",
  "directory": "static/images",
  "maxVariation": 0.1,
  "overwrite": "aboveVariation",
  "crop": "#elementToScreenshot"
}
```

```json
{
  "path": "image.png",
  "directory": "static/images",
  "maxVariation": 0.1,
  "overwrite": "aboveVariation"
}
```

```json
{
  "path": "image.png",
  "directory": "static/images",
  "maxVariation": 0.1,
  "overwrite": "aboveVariation",
  "crop": {
    "selector": "#elementToScreenshot",
    "elementText": "Element text",
    "padding": {
      "top": 0,
      "right": 0,
      "bottom": 0,
      "left": 0
    }
  }
}
```
