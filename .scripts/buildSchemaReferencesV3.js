const fs = require("fs");
const path = require("path");
const parser = require("@apidevtools/json-schema-ref-parser");
const { schemas } = require("doc-detective-common");
const { exit } = require("process");

main();

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
    
    // Fields
    let fields = [
      "## Fields",
      "",
      "Field | Type | Description | Default",
      ":-- | :-- | :-- | :--",
    ];
    
    // Extract all unique top-level property keys, handling direct properties, anyOf/oneOf, and allOf structures
    const propertyKeys = extractAllPropertyKeys(schema);
    
    // Process each top-level property
    for (const field of propertyKeys) {
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
      schema.description || "",
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

/**
 * Extract all unique property keys from a schema, including properties in anyOf/oneOf/allOf structures
 */
function extractAllPropertyKeys(schema) {
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
  
  // Handle allOf at the top level
  if (schema.allOf) {
    for (const allOfItem of schema.allOf) {
      if (allOfItem.properties) {
        Object.keys(allOfItem.properties).forEach(key => propertyKeys.add(key));
      }
    }
  }
  
  return Array.from(propertyKeys);
}

/**
 * Extract all variations of a property from a schema
 */
function extractPropertyVariations(schema, fieldName) {
  const variations = [];
  
  // Check direct properties
  if (schema.properties && schema.properties[fieldName]) {
    variations.push({
      property: schema.properties[fieldName],
      source: 'direct',
      required: schema.required && schema.required.includes(fieldName),
      readOnly: schema.properties[fieldName].readOnly || false,
      deprecated: schema.properties[fieldName].deprecated || false
    });
  }
  
  // Check properties in anyOf/oneOf variants
  if (schema.anyOf || schema.oneOf) {
    const variants = schema.anyOf || schema.oneOf;
    
    for (const variant of variants) {
      // Direct properties in variant
      if (variant.properties && variant.properties[fieldName]) {
        variations.push({
          property: variant.properties[fieldName],
          source: 'variant',
          required: variant.required && variant.required.includes(fieldName),
          readOnly: variant.properties[fieldName].readOnly || false,
          deprecated: variant.properties[fieldName].deprecated || false
        });
      }
      
      // Properties in allOf structures
      if (variant.allOf) {
        for (const allOfItem of variant.allOf) {
          if (allOfItem.properties && allOfItem.properties[fieldName]) {
            variations.push({
              property: allOfItem.properties[fieldName],
              source: 'allOf',
              required: allOfItem.required && allOfItem.required.includes(fieldName),
              readOnly: allOfItem.properties[fieldName].readOnly || false,
              deprecated: allOfItem.properties[fieldName].deprecated || false
            });
          }
        }
      }
    }
  }
  
  // Check properties in top-level allOf
  if (schema.allOf) {
    for (const allOfItem of schema.allOf) {
      if (allOfItem.properties && allOfItem.properties[fieldName]) {
        variations.push({
          property: allOfItem.properties[fieldName],
          source: 'allOf',
          required: allOfItem.required && allOfItem.required.includes(fieldName),
          readOnly: allOfItem.properties[fieldName].readOnly || false,
          deprecated: allOfItem.properties[fieldName].deprecated || false
        });
      }
    }
  }
  
  return variations;
}

/**
 * Extract all type variations from a property
 */
function extractTypeVariations(property) {
  const variations = [];
  
  // Handle direct type
  if (property.type) {
    variations.push({
      type: property.type,
      property
    });
  }
  // Handle anyOf/oneOf
  else if (property.anyOf || property.oneOf) {
    const variants = property.anyOf || property.oneOf;
    
    for (const variant of variants) {
      if (variant.type) {
        variations.push({
          type: variant.type,
          property: variant
        });
      } else if (variant.title) {
        // Reference to another schema
        variations.push({
          type: 'object',
          property: variant,
          title: variant.title
        });
      }
    }
  }
  
  return variations;
}

/**
 * Parse a field and generate documentation rows for all its variations
 */
function parseField(schema, fieldName, fieldNameBase) {
  const details = [];
  const name = fieldNameBase ? `${fieldNameBase}.${fieldName}` : fieldName;
  
  // Extract all variations of the property from the schema
  const propertyVariations = extractPropertyVariations(schema, fieldName);
  
  if (propertyVariations.length === 0) {
    console.warn(`Warning: Property '${fieldName}' not found in schema '${schema.title || 'unknown'}' or its variants`);
    return [`${name} | unknown | Property definition not found | `];
  }
  
  // Process each property variation
  for (const variation of propertyVariations) {
    const { property, required, readOnly, deprecated } = variation;
    
    // Extract type variations
    const typeVariations = extractTypeVariations(property);
    
    // No types found, handle as direct property
    if (typeVariations.length === 0) {
      details.push(generatePropertyRow(name, property, { required, readOnly, deprecated }));
    }
    // Process each type variation
    else {
      for (const typeVar of typeVariations) {
        // Generate row for this type variation
        details.push(generatePropertyRow(name, typeVar.property, { 
          type: typeVar.type,
          required,
          readOnly,
          deprecated,
          title: typeVar.title
        }));
        
        // Handle nested object properties
        if (typeVar.type === 'object' && typeVar.property.properties) {
          // Process nested properties
          for (const [nestedKey, nestedProp] of Object.entries(typeVar.property.properties)) {
            const nestedRequired = typeVar.property.required && typeVar.property.required.includes(nestedKey);
            const nestedReadOnly = nestedProp.readOnly || false;
            const nestedDeprecated = nestedProp.deprecated || false;
            
            // Recursively parse nested field
            const nestedFields = parseField(
              { properties: { [nestedKey]: nestedProp }, required: nestedRequired ? [nestedKey] : [] },
              nestedKey,
              name
            );
            
            details.push(...nestedFields);
          }
        }
        
        // Handle array items that are objects with properties
        if (typeVar.type === 'array' && typeVar.property.items) {
          const itemsArray = getItems(typeVar.property, 'object');
          
          // Process object items with properties
          for (const item of itemsArray) {
            if (item.type === 'object' && !item.title && item.properties) {
              for (const [nestedKey, nestedProp] of Object.entries(item.properties)) {
                const nestedRequired = item.required && item.required.includes(nestedKey);
                
                // Generate row for array item property
                const arrayItemName = `${name}[].${nestedKey}`;
                details.push(generatePropertyRow(arrayItemName, nestedProp, { 
                  required: nestedRequired,
                  readOnly: nestedProp.readOnly || false,
                  deprecated: nestedProp.deprecated || false
                }));
              }
            }
          }
        }
      }
    }
  }
  
  return details;
}

/**
 * Generate a table row for a property
 */
function generatePropertyRow(name, property, options = {}) {
  const { type: explicitType, required, readOnly, deprecated, title } = options;
  
  // Get type information
  let typeDetails;
  if (explicitType) {
    typeDetails = { 
      type: title ? `${explicitType}([${title}](/docs/references/schemas/${title}))` : explicitType,
      types: [explicitType] 
    };
    
    // Handle array subtypes if this is an array
    if (explicitType === 'array') {
      const subTypes = getArraySubTypes(property, 0);
      typeDetails.type = typeDetails.type + subTypes;
    }
  } else {
    typeDetails = getTypes(property);
  }
  
  // Get description with status prefix
  let description = property.description || "No description provided.";
  if (required) {
    description = "Required. " + description;
  } else if (readOnly) {
    description = "ReadOnly. " + description;
  } else if (deprecated) {
    description = "Deprecated. " + description;
  } else {
    description = "Optional. " + description;
  }
  
  // Add enum values if present
  if (property.enum) {
    let enums = `<br/><br/>Accepted values: \`${property.enum.join("`, `")}\``;
    description = description + enums;
  }
  
  // Format default value
  let defaultValue = formatDefaultValue(property);
  
  // Return formatted table row
  return `${name} | ${typeDetails.type} | ${description} | ${defaultValue}`;
}

/**
 * Format a property's default value for display
 */
function formatDefaultValue(property) {
  if (property.default === undefined || property.default === "") {
    return "";
  }
  
  if (typeof property.default === "object" && !Array.isArray(property.default)) {
    return `\`\`${JSON.stringify(property.default)}\`\``;
  }
  
  if (typeof property.default === "object" && Array.isArray(property.default)) {
    return `\`\`${JSON.stringify(property.default)}\`\``;
  }
  
  return `\`${property.default}\``;
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
    
    // Add title for referenced objects
    if (property.title && type === "object") {
      type = type + `([${property.title}](/docs/references/schemas/${property.title}))`;
    }
  }

  return { type: type || "unknown", types: types.length ? types : ["unknown"] };
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