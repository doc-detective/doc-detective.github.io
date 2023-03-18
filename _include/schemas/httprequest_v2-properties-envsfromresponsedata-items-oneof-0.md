# Untitled object in httpRequest Schema

```txt
undefined#/properties/envsFromResponseData/items/oneOf/0
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                         |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [httpRequest\_v2.schema.json\*](httpRequest_v2.schema.json "open original schema") |

## 0 Type

`object` ([Details](httprequest_v2-properties-envsfromresponsedata-items-oneof-0.md))

# 0 Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                        |
| :-------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [name](#name)         | `string` | Optional | cannot be null | [httpRequest](httprequest_v2-properties-envsfromresponsedata-items-oneof-0-properties-name.md "undefined#/properties/envsFromResponseData/items/oneOf/0/properties/name")         |
| [jqFilter](#jqfilter) | `string` | Optional | cannot be null | [httpRequest](httprequest_v2-properties-envsfromresponsedata-items-oneof-0-properties-jqfilter.md "undefined#/properties/envsFromResponseData/items/oneOf/0/properties/jqFilter") |

## name

Name of the environment variable to set.

`name`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-envsfromresponsedata-items-oneof-0-properties-name.md "undefined#/properties/envsFromResponseData/items/oneOf/0/properties/name")

### name Type

`string`

## jqFilter

jq filter to apply to the response data. If the filter doesn't return a value, the environment variable isn't set.

`jqFilter`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [httpRequest](httprequest_v2-properties-envsfromresponsedata-items-oneof-0-properties-jqfilter.md "undefined#/properties/envsFromResponseData/items/oneOf/0/properties/jqFilter")

### jqFilter Type

`string`
