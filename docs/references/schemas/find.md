
# find

Find an element based on display text or a selector, then optionally interact with it.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
elementText | string |  Optional. Display text of the element to find. If combined with `selector`, the element must match both the text and the selector. | 
selector | string |  Optional. Selector of the element to find. If combined with `elementText`, the element must match both the text and the selector. | 
timeout | integer |  Optional. Max duration in milliseconds to wait for the element to exist. | `5000`
moveTo | boolean |  Optional. Move to the element. If the element isn't visible, it's scrolled into view. | `true`
click | One of<br/>-&nbsp;object([click](/docs/references/schemas/click))<br/>-&nbsp;object |  Optional. Click the element. | 
type | undefined |  Optional. Type keys after finding the element. Either a string or an object with a `keys` field as defined in [`type`](type). To type in the element, make the element active with the `click` parameter. | 

## Examples

```json
"Find me!"
```

```json
{
  "selector": "[title=Search]"
}
```

```json
{
  "selector": "[title=Search]",
  "timeout": 10000,
  "elementText": "Search",
  "moveTo": true,
  "click": true,
  "type": "shorthair cat"
}
```

```json
{
  "selector": "[title=Search]",
  "click": {
    "button": "right"
  }
}
```

```json
{
  "selector": "[title=Search]",
  "timeout": 10000,
  "elementText": "Search",
  "moveTo": true,
  "click": true,
  "type": {
    "keys": [
      "shorthair cat"
    ],
    "inputDelay": 100
  }
}
```
