
# tests-array-anyOf[0]-contexts-array-browser-ba115143

Browser configuration.

## Referenced In

- [tests-array-anyOf[0]-contexts-array-9bc6aaa2](/docs/references/schemas/tests-array-anyof-0--contexts-array-9bc6aaa2)

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
