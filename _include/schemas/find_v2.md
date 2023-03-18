# find Schema

```txt
undefined
```

Check if an element exists with the specified CSS selector.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                         |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [find\_v2.schema.json](find_v2.schema.json "open original schema") |

## find Type

`object` ([find](find_v2.md))

## find Examples

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

# find Properties

| Property                    | Type      | Required | Nullable       | Defined by                                                                    |
| :-------------------------- | :-------- | :------- | :------------- | :---------------------------------------------------------------------------- |
| [id](#id)                   | `string`  | Optional | cannot be null | [find](find_v2-properties-id.md "undefined#/properties/id")                   |
| [description](#description) | `string`  | Optional | cannot be null | [find](find_v2-properties-description.md "undefined#/properties/description") |
| [action](#action)           | `string`  | Required | cannot be null | [find](find_v2-properties-action.md "undefined#/properties/action")           |
| [selector](#selector)       | `string`  | Required | cannot be null | [find](find_v2-properties-selector.md "undefined#/properties/selector")       |
| [timeout](#timeout)         | `integer` | Optional | cannot be null | [find](find_v2-properties-timeout.md "undefined#/properties/timeout")         |
| [matchText](#matchtext)     | `string`  | Optional | cannot be null | [find](find_v2-properties-matchtext.md "undefined#/properties/matchText")     |
| [moveTo](#moveto)           | `boolean` | Optional | cannot be null | [find](find_v2-properties-moveto.md "undefined#/properties/moveTo")           |
| [click](#click)             | `boolean` | Optional | cannot be null | [find](find_v2-properties-click.md "undefined#/properties/click")             |
| [typeKeys](#typekeys)       | Merged    | Optional | cannot be null | [find](find_v2-properties-typekeys.md "undefined#/properties/typeKeys")       |

## id

ID of the step.

`id`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [find](find_v2-properties-id.md "undefined#/properties/id")

### id Type

`string`

## description

Description of the step.

`description`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [find](find_v2-properties-description.md "undefined#/properties/description")

### description Type

`string`

## action

Action to perform.

`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [find](find_v2-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"find"
```

## selector

Selector that uniquely identifies the element.

`selector`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [find](find_v2-properties-selector.md "undefined#/properties/selector")

### selector Type

`string`

## timeout

Max duration in milliseconds to wait for the element to exist.

`timeout`

*   is optional

*   Type: `integer`

*   cannot be null

*   defined in: [find](find_v2-properties-timeout.md "undefined#/properties/timeout")

### timeout Type

`integer`

### timeout Default Value

The default value is:

```json
500
```

## matchText

Text that the element shuold contain. If the element doesn't contain the text, the step fails.

`matchText`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [find](find_v2-properties-matchtext.md "undefined#/properties/matchText")

### matchText Type

`string`

## moveTo

Move to the element. If the element isn't visible, it's scrolled into view. Only runs the if the test is being recorded.

`moveTo`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [find](find_v2-properties-moveto.md "undefined#/properties/moveTo")

### moveTo Type

`boolean`

## click

Click the element.

`click`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [find](find_v2-properties-click.md "undefined#/properties/click")

### click Type

`boolean`

## typeKeys

Type keys after finding the element. If you want to type in the element, make the element active with the `click` parameter.

`typeKeys`

*   is optional

*   Type: merged type ([Details](find_v2-properties-typekeys.md))

*   cannot be null

*   defined in: [find](find_v2-properties-typekeys.md "undefined#/properties/typeKeys")

### typeKeys Type

merged type ([Details](find_v2-properties-typekeys.md))

one (and only one) of

*   [Untitled string in find](find_v2-properties-typekeys-oneof-0.md "check type definition")

*   [Untitled object in find](find_v2-properties-typekeys-oneof-1.md "check type definition")
