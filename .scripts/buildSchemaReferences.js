/*
This is a legacy version of the schema reference builder.
Please use the buildSchemaReferencesV3.js script instead, which has better support for v3 schemas.
*/

// Forward to V3 implementation
require('./buildSchemaReferencesV3.js');

async function main() {
  const schemasToGenerate = [
    "checkLink_v3",
    "click_v3",
    "config_v3",
    "context_v3",
    "find_v3",
    "goTo_v3",
    "httpRequest_v3",
    "runShell_v3",
    "runCode_v3",
    "screenshot_v3",
    "loadVariables_v3",
    "record_v3",
    "stopRecord_v3",
    "spec_v3",
    "step_v3",
    "test_v3",
    "type_v3",
    "wait_v3",
  ];
  for await (const key of schemasToGenerate) {
    let schema = schemas[key];
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
    
    // Extract all unique top-level property keys, handling direct properties, anyOf/oneOf, and allOf structures
    const propertyKeys = new Set();
    
    // Handle direct properties if they exist
    if (schema.properties) {
      Object.keys(schema.properties).forEach(key => propertyKeys.add(key));
    }
    
    // Handle polymorphic schemas with anyOf or oneOf
    if (schema.anyOf || schema.oneOf) {
      const variants = schema.anyOf || schema.oneOf;
      
      for (const variant of variants) {
        // Check for properties directly within the variant
        if (variant.properties) {
          Object.keys(variant.properties).forEach(key => propertyKeys.add(key));
        }
        // Check for properties within an allOf structure inside the variant
        if (variant.allOf) {
          for (const allOfItem of variant.allOf) {
            if (allOfItem.properties) {
              Object.keys(allOfItem.properties).forEach(key => propertyKeys.add(key));
            }
          }
        }
      }
    }
    
    // Get the unique keys as an array
    const keys = Array.from(propertyKeys);
    
    // Process each top-level property
    for (const field of keys) { // Changed loop variable name for clarity
      // let field = keys[key]; // Old line
      let fieldDetails = parseField(schema, field); // Pass only the top-level field name
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
  
  // Find the property definition, handling direct properties, anyOf/oneOf, and allOf structures
  let property;
  
  // Check direct properties first
  if (schema.properties && schema.properties[fieldName]) {
    property = schema.properties[fieldName];
  } 
  // If not found, check in anyOf/oneOf variants
  else if (schema.anyOf || schema.oneOf) {
    const variants = schema.anyOf || schema.oneOf;
    
    // Look for the property in each variant
    for (const variant of variants) {
      // Check direct properties within the variant
      if (variant.properties && variant.properties[fieldName]) {
        property = variant.properties[fieldName];
        break; // Found it
      }
      // Check within an allOf structure inside the variant
      if (variant.allOf) {
        for (const allOfItem of variant.allOf) {
          if (allOfItem.properties && allOfItem.properties[fieldName]) {
            property = allOfItem.properties[fieldName];
            break; // Found it
          }
        }
      }
      if (property) break; // Found it in the inner loop
    }
  }
  
  // If property still not found, handle the error
  if (!property) {
    console.warn(`Warning: Property '${fieldName}' not found in schema '${schema.title || 'unknown'}' or its variants`);
    return [`${name} | unknown | Property definition not found | `];
  }
  
  let typeDetails = getTypes(property);
  let description = property.description || "No description provided.";
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
    let childProperties = [];
    if (property.properties) childProperties = [property.properties];
    if (property.anyOf || property.oneOf) {
      let xOfArray = property.anyOf || property.oneOf;
      // Improved filtering for polymorphic objects
      let polymorphicObjects = xOfArray.filter((item) => 
        item.properties || (item.type === "object" && item.title)
      );
      
      // Add each variant's properties to childProperties
      for (const obj of polymorphicObjects) {
        if (obj.properties) childProperties.push(obj.properties);
      }
    }
    
    // Process all child properties
    for (const prop in childProperties) {
      property.properties = childProperties[prop];
      if (property.properties) {
        const keys = Object.keys(property.properties);
        for (const key in keys) {
          let field = keys[key];
          let fieldDetails = parseField(property, field, name);
          for (const detail in fieldDetails) details.push(fieldDetails[detail]);
        }
      }
    }
  }
  // Check if any array items are internally defined objects
  if (typeDetails.types.includes("array")) {
    let itemsArray = getItems(property, "object");
    for (const index in itemsArray) {
      const item = itemsArray[index];
      if (item.type === "object" && !item.title && item.properties) {
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
  let items = [];
  
  // Handle direct items property
  if (property.items) {
    if (property.items.anyOf || property.items.oneOf) {
      // Array items with polymorphic types
      items = property.items.anyOf || property.items.oneOf;
    } else {
      // Single type array items
      items = [property.items];
    }
  }
  
  // Handle items in anyOf/oneOf variants
  if (property.anyOf || property.oneOf) {
    const variants = property.anyOf || property.oneOf;
    
    // Collect items from all variants that have them
    for (const variant of variants) {
      if (variant.items) {
        if (variant.items.anyOf || variant.items.oneOf) {
          // Add all polymorphic items
          const variantItems = variant.items.anyOf || variant.items.oneOf;
          items = items.concat(variantItems);
        } else {
          // Add single item
          items.push(variant.items);
        }
      }
    }
  }
  
  // Apply type filter if specified
  if (typeFilter && items.length > 0) {
    items = items.filter((item) => item.type === typeFilter);
  }
  
  return items;
}

function getTypes(property) {
  let type;
  let types = [];
  
  // Get types
  if (!property.type && (property.anyOf || property.oneOf)) {
    // Handle polymorphic properties with anyOf or oneOf
    const xOfArray = property.anyOf || property.oneOf;
    const typesArray = xOfArray.filter((xOf) => xOf.type || xOf.title);
    
    // Extract type information from each variant
    types = typesArray.map(item => {
      if (item.type) return item.type;
      if (item.title) return "object";
      return "unknown";
    });
    
    if (types.length > 1) {
      // Format for multiple type options
      type = "One of";
      for (const index in typesArray) {
        const item = typesArray[index];
        const itemType = types[index];
        
        // Basic type display
        type = type + `<br/>-&nbsp;${itemType}`;
        
        // Add title for referenced objects
        if (item.title) {
          type = type + `([${item.title}](/docs/references/schemas/${item.title}))`;
        }
        
        // Handle array subtypes
        if (itemType === "array") {
          const subTypes = getArraySubTypes(item, 1);
          type = type + subTypes;
        }
      }
    } else if (types.length === 1) {
      // Single type from oneOf/anyOf
      type = types[0];
      
      // Add title for referenced objects
      const item = typesArray[0];
      if (item.title) {
        type = type + `([${item.title}](/docs/references/schemas/${item.title}))`;
      }
      
      // Handle array subtypes
      if (type === "array") {
        const subTypes = getArraySubTypes(item, 0);
        type = type + subTypes;
      }
    } else {
      type = "unknown";
    }
  } else if (property.type) {
    // Direct type definition
    type = property.type;
    types = [type];
    
    // Handle array subtypes
    if (type === "array") {
      const subTypes = getArraySubTypes(property, 0);
      type = type + subTypes;
    }
  }

  return { type, types };
}

function getArraySubTypes(property, depth) {
  let subTypes = " of ";
  let itemsArray = getItems(property);
  
  // If no items found
  if (!itemsArray || itemsArray.length === 0) {
    return " of any";
  }
  
  // For multiple item types (polymorphic array)
  if (itemsArray.length > 1) {
    let spaces = "";
    if (Number(depth) === 1) spaces = "&nbsp;&nbsp;";
    
    subTypes += "<br/>" + spaces + "one of:";
    
    for (const index in itemsArray) {
      const item = itemsArray[index];
      // Handle referenced schema objects
      if (item.type === "object" && item.title) {
        subTypes = `${subTypes}<br/>${spaces}-&nbsp;${item.type}([${item.title}](/docs/references/schemas/${item.title}))`;
      } 
      // Handle nested oneOf/anyOf in array items
      else if (!item.type && (item.oneOf || item.anyOf)) {
        const nestedTypes = (item.oneOf || item.anyOf)
          .map(variant => {
            if (variant.type === "object" && variant.title) {
              return `${variant.type}([${variant.title}](/docs/references/schemas/${variant.title}))`;
            } else if (variant.type) {
              return variant.type;
            } else {
              return "unknown";
            }
          })
          .join(", ");
        subTypes = `${subTypes}<br/>${spaces}- one of: ${nestedTypes}`;
      }
      // Handle regular types
      else if (item.type) {
        subTypes = `${subTypes}<br/>${spaces}- ${item.type}`;
      }
      // Handle unknown types
      else {
        subTypes = `${subTypes}<br/>${spaces}- unknown`;
      }
    }
  } 
  // For single item type
  else {
    const item = itemsArray[0];
    // Handle referenced schema objects
    if (item.type === "object" && item.title) {
      subTypes = `${subTypes}${item.type}([${item.title}](/docs/references/schemas/${item.title}))`;
    } 
    // Handle nested oneOf/anyOf in array items
    else if (!item.type && (item.oneOf || item.anyOf)) {
      subTypes += "one of: ";
      const variants = item.oneOf || item.anyOf;
      const variantTypes = variants.map(variant => {
        if (variant.type === "object" && variant.title) {
          return `${variant.type}([${variant.title}](/docs/references/schemas/${variant.title}))`;
        } else if (variant.type) {
          return variant.type;
        } else {
          return "unknown";
        }
      }).join(", ");
      subTypes += variantTypes;
    }
    // Handle regular types
    else if (item.type) {
      subTypes += item.type;
    }
    // Handle unknown types
    else {
      subTypes += "unknown";
    }
  }

  return subTypes;
}

// TODO: Figure out formatting for oneOfs with arrays/objects
function getSchemaFormat(schema, depth) {
  let format = ["{"];
  if (!depth) depth = 1;
  
  // Handle properties from multiple sources
  let allProperties = {};
  
  // Handle direct properties if they exist
  if (schema.properties) {
    allProperties = { ...schema.properties };
  }
  
  // Handle polymorphic schemas with anyOf or oneOf
  if (schema.anyOf || schema.oneOf) {
    const variants = schema.anyOf || schema.oneOf;
    
    // Extract properties from each variant that has them
    for (const variant of variants) {
      if (variant.properties) {
        // Merge properties from this variant
        allProperties = { ...allProperties, ...variant.properties };
      }
    }
  }
  
  // Process all properties
  for (const [key, value] of Object.entries(allProperties)) {
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

function getFormatDescription(name, property, depth) {
  let description = [];
  if (!depth) depth = 1;
  const indent = "  ".repeat(depth);
  
  // Handle polymorphic properties (oneOf/anyOf)
  if (!property.type && (property.oneOf || property.anyOf)) {
    const variants = property.oneOf || property.anyOf;
    description.push(`${indent}"${name}": /* One of the following: */`);
    
    // Add variants as comments
    for (const variant of variants) {
      if (variant.type === "object" && variant.title) {
        description.push(`${indent}/* - object: ${variant.title} schema */`);
      } else if (variant.type === "array") {
        const itemTypes = getArrayItemType(variant);
        description.push(`${indent}/* - array of ${itemTypes} */`);
      } else if (variant.type) {
        description.push(`${indent}/* - ${variant.type} */`);
      }
    }
    
    // Use the first variant for the example
    const firstVariant = variants[0];
    if (firstVariant.type === "object" && firstVariant.title) {
      description.push(`${indent}{`);
      description.push(`${indent}  /* See ${firstVariant.title} schema */`);
      description.push(`${indent}},`);
    } else if (firstVariant.type === "object") {
      description.push(`${indent}{`);
      description.push(`${indent}  /* Object with custom properties */`);
      description.push(`${indent}},`);
    } else if (firstVariant.type === "array") {
      const itemTypes = getArrayItemType(firstVariant);
      description.push(`${indent}[ /* Array of ${itemTypes} */ ],`);
    } else if (firstVariant.type === "string" && firstVariant.const) {
      description.push(`${indent}"${firstVariant.const}",`);
    } else if (firstVariant.type) {
      description.push(`${indent}${firstVariant.type},`);
    } else {
      description.push(`${indent}/* Complex polymorphic type */,`);
    }
  }
  // Handle object with title reference
  else if (property.type === "object" && property.title) {
    description.push(`${indent}"${name}": {`);
    description.push(
      `${indent}  /* See ${property.title} schema */`
    );
    description.push(`${indent}},`);
  } 
  // Handle regular object
  else if (property.type === "object" && !property.title) {
    description.push(`${indent}"${name}": {`);
    description.push(`${indent}  /* Object with custom properties */`);
    description.push(`${indent}},`);
  } 
  // Handle array
  else if (property.type === "array") {
    const itemTypes = getArrayItemType(property);
    description.push(`${indent}"${name}": [ /* Array of ${itemTypes} */ ],`);
  } 
  // Handle string constants
  else if (property.type === "string" && property.const) {
    description.push(`${indent}"${name}": "${property.const}",`);
  } 
  // Handle string enums
  else if (property.type === "string" && property.enum) {
    const enumValues = property.enum.map(val => `"${val}"`).join(" | ");
    description.push(`${indent}"${name}": /* One of: ${enumValues} */,`);
  }
  // Handle other types
  else if (property.type) {
    description.push(`${indent}"${name}": ${property.type},`);
  }
  // Handle unknown types
  else {
    description.push(`${indent}"${name}": /* Unknown type */,`);
  }
  
  return description.join("\n");
}

// Helper function to get array item type description
function getArrayItemType(property) {
  const items = getItems(property);
  if (!items || items.length === 0) {
    return "any";
  }
  
  if (items.length === 1) {
    const item = items[0];
    if (item.type === "object" && item.title) {
      return `${item.title} objects`;
    } else if (item.type) {
      return `${item.type}s`;
    } else if (item.oneOf || item.anyOf) {
      const variants = item.oneOf || item.anyOf;
      const types = variants.map(v => {
        if (v.type === "object" && v.title) return v.title;
        return v.type || "unknown";
      }).join(" | ");
      return `[${types}]`;
    }
  } else {
    const types = items.map(item => {
      if (item.type === "object" && item.title) return item.title;
      return item.type || "unknown";
    }).join(" | ");
    return `[${types}]`;
  }
  
  return "unknown";
}
