
# screenshot

Takes a screenshot in PNG format.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
screenshot | string | File path of the PNG file. Accepts absolute paths. If not specified, the file name is the ID of the step. | 
screenshot | boolean | No description provided. | 
path | string | Optional. File path of the PNG file. Accepts absolute paths. If not specified, the file name is the ID of the step.<br/><br/>Pattern: `([A-Za-z0-9_-]*\.(png|PNG)$|\$[A-Za-z0-9_]+)` | 
directory | string | Optional. Directory of the PNG file. If the directory doesn't exist, creates the directory. | 
maxVariation | number | Optional. Allowed variation in percentage of pixels between the new screenshot and the existing screenshot at `path`. If the difference between the new screenshot and the existing screenshot is greater than `maxVariation`, the step fails. If a screenshot doesn't exist at `path`, this value is ignored.<br/><br/>Minimum: 0. Maximum: 1 | `0.05`
overwrite | string | Optional. If `true`, overwrites the existing screenshot at `path` if it exists.
If `aboveVariation`, overwrites the existing screenshot at `path` if the difference between the new screenshot and the existing screenshot is greater than `maxVariation`.<br/><br/>Accepted values: `true`, `false`, `aboveVariation` | `aboveVariation`
crop | string | Optional. Display text or selector of the element to screenshot. | 
crop | object | Optional. Crop the screenshot to a specific element. | 
crop.elementText | string | Optional. Display text of the element to screenshot. | 
crop.selector | string | Optional. Selector of the element to screenshot. | 
crop.padding | number | Optional. Padding in pixels to add to the bounds of the element.<br/><br/>Minimum: 0 | 
crop.padding | object | Optional. No description provided. | 
crop.padding.top | number | Optional. No description provided.<br/><br/>Minimum: 0 | 
crop.padding.right | number | Optional. No description provided.<br/><br/>Minimum: 0 | 
crop.padding.bottom | number | Optional. No description provided.<br/><br/>Minimum: 0 | 
crop.padding.left | number | Optional. No description provided.<br/><br/>Minimum: 0 | 

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
