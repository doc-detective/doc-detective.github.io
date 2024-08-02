
# find

Check if an element exists with the specified CSS selector.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
id | string |  Optional. ID of the step. | Generated UUID
description | string |  Optional. Description of the step. | 
action | string |  Required. Action to perform. | 
selector | string |  Required. Selector that uniquely identifies the element. | 
timeout | integer |  Optional. Max duration in milliseconds to wait for the element to exist. | `5000`
matchText | string |  Optional. Text that the element should contain. If the element doesn't contain the text, the step fails. Accepts both strings an regular expressions. To use a regular expression, the expression should start and end with a `/`. For example, `/search/`. | 
moveTo | [object Object] |  Optional. Move to the element. If the element isn't visible, it's scrolled into view. Only runs the if the test is being recorded. | `false`
click | boolean |  Optional. Click the element. | `false`
typeKeys | One of<br/>-&nbsp;string<br/>-&nbsp;object |  Optional. Type keys after finding the element. Either a string or an object with a `keys` field as defined in [`typeKeys`](/reference/schemas/typeKeys). To type in the element, make the element active with the `click` parameter. | 
setVariables | array of objects |  Optional. Extract environment variables from the element's text. | ``[]``
setVariables.name | string |  Required. Name of the environment variable to set. | 
setVariables.regex | string |  Required. Regex to extract the environment variable from the element's text. | 

## Examples

```json
{
  "action": "find",
  "selector": "[title=Search]"
}
```

```json
{
  "action": "find",
  "selector": "[title=Search]",
  "timeout": 10000,
  "matchText": "Search",
  "moveTo": true,
  "click": true,
  "typeKeys": "shorthair cat"
}
```

```json
{
  "action": "find",
  "selector": "[title=Search]",
  "timeout": 10000,
  "matchText": "Search",
  "moveTo": true,
  "click": true,
  "typeKeys": {
    "keys": [
      "shorthair cat"
    ],
    "delay": 100
  }
}
```

```json
{
  "action": "find",
  "selector": "[title=ResultsCount]",
  "setVariables": [
    {
      "name": "resultsCount",
      "regex": ".*"
    }
  ]
}
```
