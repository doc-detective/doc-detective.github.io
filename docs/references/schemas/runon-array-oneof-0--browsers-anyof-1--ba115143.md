
# runOn-array-oneOf[0]-browsers-anyOf[1]-ba115143

Browser configuration.

## Referenced In

- [context](/docs/references/schemas/context)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
name | string | Required. Name of the browser.<br/><br/>Accepted values: `chrome`, `firefox`, `safari`, `webkit` | 
headless | boolean | Optional. If `true`, runs the browser in headless mode. | `true`
window | object | Optional. Browser dimensions. | 
viewport | object | Optional. Viewport dimensions. | 

## Examples

```json
{
  "name": "chrome",
  "headless": true,
  "window": {
    "width": 42,
    "height": 42
  },
  "viewport": {
    "width": 42,
    "height": 42
  }
}
```
