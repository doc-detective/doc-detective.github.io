
# typeKeys

Type keys. To type special keys, begin and end the string with `$` and use the special key's keyword. For example, to type the Escape key, enter `$ESCAPE$`.

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
typeKeys | string | No description provided. | 
typeKeys | array of string | No description provided. | 
keys | string | Required. Sequence of keys to enter. | 
keys | array of string | Required. Sequence of keys to enter. | 
inputDelay | number | Optional. Delay in milliseconds between each key press during a recording | `100`
selector | string | Optional. Selector for the element to type into. If not specified, the typing occurs in the active element. | 

## Examples

```json
"kittens"
```

```json
[
  "$ENTER$"
]
```

```json
[
  "kittens",
  "$ENTER$"
]
```

```json
{
  "keys": "kittens"
}
```

```json
{
  "keys": [
    "$ENTER$"
  ]
}
```

```json
{
  "keys": [
    "kittens",
    "$ENTER$"
  ],
  "inputDelay": 500
}
```
