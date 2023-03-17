# Untitled number in screenshot Schema

```txt
undefined#/properties/matchThreshold
```

Decimal value of percentage of pixels that must be different between the old and new screenshots to fail the action. For example, a value of `0.3` fails the action if the diff is 30% or more of pixels.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [screenshot\_v1.schema.json\*](screenshot_v1.schema.json "open original schema") |

## matchThreshold Type

`number`

## matchThreshold Constraints

**maximum**: the value of this number must smaller than or equal to: `1`

**minimum (exclusive)**: the value of this number must be greater than: `0`

## matchThreshold Default Value

The default value is:

```json
0.3
```
