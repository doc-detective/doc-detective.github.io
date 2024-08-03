const fs = require("fs");
const path = require("path");
const parser = require("@apidevtools/json-schema-ref-parser");
const { schemas } = require("doc-detective-common");
const { exit } = require("process");

main();

// TODO: Add `minimum` values
// TODO: Add `maximum` values

async function main() {
  const schemasToGenerate = [
    "checkLink_v2",
    "config_v2",
    "context_v2",
    "find_v2",
    "goTo_v2",
    "httpRequest_v2",
    "runShell_v2",
    "saveScreenshot_v2",
    "setVariables_v2",
    "startRecording_v2",
    "stopRecording_v2",
    "spec_v2",
    "test_v2",
    "typeKeys_v2",
    "wait_v2",
  ];
  for await (const key of schemasToGenerate) {
    schema = schemas[key];
    // Dereference schema
    schema = await parser.dereference(schema);
    // Format
    // TODO
    // Fields
    let fields = [
      "## Fields",
      "",
      "Field | Type | Description | Default",
      ":-- | :-- | :-- | :--",
    ];
    const keys = Object.keys(schema.properties);
    for (const key in keys) {
      let field = keys[key];
      let fieldDetails = parseField(schema, field);
      fields = fields.concat(fieldDetails);
    }
    fields.push("");
    // Examples
    let examples = ["## Examples", ""];
    for (const example in schema.examples) {
      let snippet = [
        "```json",
        JSON.stringify(schema.examples[example], null, 2),
        "```",
        "",
      ];
      examples = examples.concat(snippet);
    }
    // Metadata
    let metadata = [];
    // Heading
    let heading = [
      "",
      `# ${schema.title}`,

      "",
      schema.description,
      "",
    ];
    // Putting it all together
    let output = metadata
      .concat(heading)
      .concat(fields)
      .concat(examples)
      .join("\n");
    // Identify output path
    const outputPath = path.resolve(
      `${__dirname}/../docs/references/schemas/${schema.title}.md`
    );
    // Write file
    fs.writeFileSync(outputPath, output);
  }
  console.log("References generated.");
}

function parseField(schema, fieldName, fieldNameBase) {
  debug = false;
  let details = [];
  let name;
  if (fieldNameBase) {
    name = `${fieldNameBase}.${fieldName}`;
  } else {
    name = fieldName;
  }
  let property = schema.properties[fieldName];
  let typeDetails = getTypes(property);
  let description = property.description;
  // Get required
  if (schema.required && schema.required.includes(fieldName)) {
    description = "Required. " + description;
  } else if (property.deprecated){
    description = "Deprecated. " + description;
  } else {
    description = "Optional. " + description;
  }
  // Get enums
  if (property.enum) {
    let enums = `<br/><br/>Accepted values: \`${property.enum.join("`, `")}\``;
    description = description + enums;
  }
  let defaultValue;
  if (
    // JSON object
    typeof property.default === "object" &&
    !Array.isArray(property.default)
  ) {
    defaultValue = `\`\`${JSON.stringify(property.default)}\`\``;
  } else if (
    // Array
    typeof property.default === "object" &&
    Array.isArray(property.default)
  ) {
    defaultValue = `\`\`${JSON.stringify(property.default)}\`\``;
  } else if (
    // UUID
    schema.dynamicDefaults &&
    Object.keys(schema.dynamicDefaults).includes(fieldName) &&
    schema.dynamicDefaults[fieldName] === "uuid"
  ) {
    defaultValue = "Generated UUID";
  } else if (
    // Undefined
    property.default === undefined ||
    property.default === ""
  ) {
    defaultValue = "";
  } else {
    // Default
    defaultValue = `\`${property.default}\``;
  }
  if (fieldName === "fileTypes") defaultValue = "[]"; // TODO: Remove the need for this override.
  details.push(
    `${name} | ${typeDetails.type} |  ${description} | ${defaultValue}`
  );
  // Parse child objects
  // Check if has child properties
  if (typeDetails.type === "object") {
    let childProperties;
    if (property.properties) childProperties = [property.properties];
    if (property.anyOf || property.oneOf) {
      let xOfArray = property.anyOf || property.oneOf;
      childProperties = xOfArray.filter((item) => item.property);
    }
    for (const prop in childProperties) {
      property.properties = childProperties[prop];
      const keys = Object.keys(property.properties);
      for (const key in keys) {
        let field = keys[key];
        let fieldDetails = parseField(property, field, name);
        for (const detail in fieldDetails) details.push(fieldDetails[detail]);
      }
    }
  }
  // Check if any array items are internally defined objects
  if (typeDetails.types.includes("array")) {
    let itemsArray = getItems(property, "object");
    for (const index in itemsArray) {
      const item = itemsArray[index];
      if (item.type === "object" && !item.title) {
        // console.log(item);
        const keys = Object.keys(item.properties);
        for (const key in keys) {
          let field = keys[key];
          let fieldDetails = parseField(item, field, name);
          for (const detail in fieldDetails) details.push(fieldDetails[detail]);
        }
      }
    }
  }
  // console.log(details);
  return details;
}

function getItems(property, typeFilter) {
  let items;
  if (property.items && (property.items.anyOf || property.items.oneOf)) {
    items = property.items.anyOf || property.items.oneOf;
  } else if (property.items) {
    items = [property.items];
  }
  if (
    (property.anyOf && property.anyOf.items) ||
    (property.oneOf && property.oneOf.items)
  ) {
    items = property.anyOf.items || property.oneOf.items;
  }
  if (typeFilter) items = items.filter((item) => item.type === typeFilter);
  return items;
}

function getTypes(property) {
  // TODO: Include supported subtypes within array
  let type;
  let types = [];
  // Get types
  if (!property.type && (property.anyOf || property.oneOf)) {
    xOfArray = property.anyOf || property.oneOf;
    types = xOfArray.filter((xOf) => xOf.type);
    if (types.length > 1) {
      type = "One of";
      for (const item of types) {
        type = type + `<br/>-&nbsp;${item.type}`;
        if (item.type === "array") {
          subTypes = getArraySubTypes(item, 1);
          type = type + subTypes;
        }
      }
    } else {
      type = types[0];
    }
  } else if (property.type) {
    type = property.type;
    types = [type];
    if (type === "array") {
      subTypes = getArraySubTypes(property, 0);
      type = type + subTypes;
    }
  }

  return { type, types };
}

function getArraySubTypes(property, depth) {
  let subTypes = " of ";
  let itemsArray = getItems(property);
  if (itemsArray.length > 1) {
    let spaces = "";
    if (Number(depth) === 1) spaces = "&nbsp;&nbsp;";
    for (const index in itemsArray) {
      item = itemsArray[index];
      if (item.type === "object" && item.title) {
        subTypes = `${subTypes}<br/>${spaces}-&nbsp;${item.type}([${item.title}](/docs/references/schemas/${item.title}))`;
      } else {
        subTypes = `${subTypes}<br/>${spaces}- ${item.type}s`;
      }
    }
  } else {
    item = itemsArray[0];
    if (item.type === "object" && item.title) {
      subTypes = `${subTypes}${item.type}([${item.title}](/docs/references/schemas/${item.title}))`;
    } else {
      subTypes = subTypes + item.type + "s";
    }
  }

  return subTypes;
}

// TODO: Figure out formatting for oneOfs with arrays/objects
function getSchemaFormat(schema, depth) {
  let format = ["{"];
  if (!depth) depth = 1;
  // console.log(Object.keys(schema.properties));
  // exit()
  let properties = schema.properties;
  for (const [key, value] of Object.entries(properties)) {
    console.log({ key, value });
    const typeDetails = getTypes(value);
    console.log(typeDetails.types);
    if (typeDetails.types.length > 1) {
      format.push(`${"  ".repeat(depth)}// One of`);
      for (const type of typeDetails.types) {
        value.type = type.type;
        if (type.items) value.items = type.items;
        if (type.properties) value.properties = type.properties;
        
        // console.log(getFormatDescription(key, value, depth))
        // exit()
        format.push(getFormatDescription(key, value, depth).replace(`"${key}":`,""));
      }
      format.push(`${"  ".repeat(depth)}// End one of`);
    } else {
      format.push(getFormatDescription(key, value, depth));
    }
  }
  // Remove trailing comma from last item
  format[format.length - 1] = format[format.length - 1].slice(0, -1);
  format.push("}");
  // Make text
  format = format.join("\n");
  // Make json
  console.log(format);
  return format;
}

// TODO: Figure out formatting for oneOfs with arrays/objects
function getFormatDescription(name, property, depth) {
  let description = [];
  if (!depth) depth = 1;
  if (property.type === "object" && property.title) {
    description.push(`${"  ".repeat(depth)}"${name}": {`);
    depth = depth + 1;
    description.push(
      `${"  ".repeat(depth)}object([${property.title}](/docs/references/schemas/${
        property.title
      }))`
    );
    depth = depth - 1;
    description.push(`${"  ".repeat(depth)}},`);
  } else if (property.type === "object" && !property.title) {
    description.push(`${"  ".repeat(depth)}"${name}": {`);
    depth = depth + 1;
    description.push(`${"  ".repeat(depth)}object`);
    depth = depth - 1;
    description.push(`${"  ".repeat(depth)}},`);
  } else if (property.type === "array") {
    description.push(`${"  ".repeat(depth)}"${name}": [ ${property.type} ],`);
  } else if (property.type === "string" && property.const) {
    description.push(`${"  ".repeat(depth)}"${name}": "${property.const}",`);
  } else {
    description.push(`${"  ".repeat(depth)}"${name}": ${property.type},`);
  }
  console.log(description);
  description = description.join("\n");
  return description;
}
