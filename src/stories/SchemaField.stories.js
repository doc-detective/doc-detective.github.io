import SchemaField from "../components/SchemaForms/SchemaField";
import schemas from "../schemas/schemas.json";

// This default export determines where your story goes in the story list.
export default {
  title: "Doc Detective/SchemaField",
  component: SchemaField,
  // args at the component level for all stories.
  args: {
    schema: schemas.find_v2,
    pathToKey: "",
    propertyKey: "id",
    propertyValue: schemas.find_v2.properties["id"],
  },
};

export const string = {
  args: {
    schema: schemas.find_v2,
    pathToKey: "",
    propertyKey: "description",
    propertyValue: schemas.find_v2.properties["description"],
  },
};
export const stringWithDynamicDefault = {
  args: {
    schema: schemas.find_v2,
    pathToKey: "",
    propertyKey: "id",
    propertyValue: schemas.find_v2.properties["id"],
  },
};
export const stringWithRequired = {
  args: {
    schema: schemas.find_v2,
    pathToKey: "",
    propertyKey: "selector",
    propertyValue: schemas.find_v2.properties["selector"],
  },
};
export const stringWithPattern = {
  args: {
    schema: schemas.checkLink_v2,
    pathToKey: "",
    propertyKey: "url",
    propertyValue: schemas.checkLink_v2.properties["url"],
  },
};
export const integerWithDefault = {
  args: {
    schema: schemas.find_v2,
    pathToKey: "",
    propertyKey: "timeout",
    propertyValue: schemas.find_v2.properties["timeout"],
  },
};
export const numberWithDefault = {
  args: {
    schema: schemas.wait_v2,
    pathToKey: "",
    propertyKey: "duration",
    propertyValue: schemas.wait_v2.properties["duration"],
  },
};
export const numberWithMinAndMax = {
  args: {
    schema: schemas.saveScreenshot_v2,
    pathToKey: "",
    propertyKey: "maxVariation",
    propertyValue: schemas.saveScreenshot_v2.properties["maxVariation"],
  },
};
export const enums = {
  args: {
    schema: schemas.saveScreenshot_v2,
    pathToKey: "",
    propertyKey: "overwrite",
    propertyValue: schemas.saveScreenshot_v2.properties["overwrite"],
  },
}
export const boolean = {
  args: {
    schema: schemas.find_v2,
    pathToKey: "",
    propertyKey: "click",
    propertyValue: schemas.find_v2.properties["click"],
  },
};
export const object = {
  args: {
    schema: schemas.context_v2,
    pathToKey: "",
    propertyKey: "app",
    propertyValue: schemas.context_v2.properties["app"],
  },
};
export const objectWithAdditionalProperties = {
  args: {
    schema: schemas.httpRequest_v2,
    pathToKey: "",
    propertyKey: "requestHeaders",
    propertyValue: schemas.httpRequest_v2.properties["requestHeaders"],
  },
};
export const arrayOfStrings = {
  args: {
    schema: schemas.runShell_v2,
    pathToKey: "",
    propertyKey: "args",
    propertyValue: schemas.runShell_v2.properties["args"],
  },
};
export const arrayOfIntegers = {
  args: {
    schema: schemas.checkLink_v2,
    pathToKey: "",
    propertyKey: "statusCodes",
    propertyValue: schemas.checkLink_v2.properties["statusCodes"],
  },
};
export const arrayOfObjects = {
  args: {
    schema: schemas.httpRequest_v2,
    pathToKey: "",
    propertyKey: "envsFromResponseData",
    propertyValue: schemas.httpRequest_v2.properties["envsFromResponseData"],
  },
};
export const fieldWithMultipleSchemas = {
  args: {
    schema: schemas.typeKeys_v2,
    pathToKey: "",
    propertyKey: "keys",
    propertyValue: schemas.typeKeys_v2.properties["keys"],
  },
};
