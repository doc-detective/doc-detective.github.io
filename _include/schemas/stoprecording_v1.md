# stopRecording Schema

```txt
undefined
```

Stop recording the current browser viewport.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                           |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [stopRecording\_v1.schema.json](stopRecording_v1.schema.json "open original schema") |

## stopRecording Type

`object` ([stopRecording](stoprecording_v1.md))

## stopRecording Examples

```json
{
  "action": "stopRecording"
}
```

# stopRecording Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                            |
| :---------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------ |
| [action](#action) | `string` | Required | cannot be null | [stopRecording](stoprecording_v1-properties-action.md "undefined#/properties/action") |

## action



`action`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [stopRecording](stoprecording_v1-properties-action.md "undefined#/properties/action")

### action Type

`string`

### action Constraints

**constant**: the value of this property must be equal to:

```json
"stopRecording"
```
