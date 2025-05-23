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
    ];
    
    // Add warning about mutually exclusive properties if the schema has top-level anyOf/oneOf
    if (schema.anyOf || schema.oneOf) {
      const mutuallyExclusiveProps = extractMutuallyExclusiveActionProperties(schema);
      if (mutuallyExclusiveProps.length > 0) {
        fields.push("> **Note:** The following action properties are mutually exclusive. You can only use one of these in a single step:");
        fields.push("> ");
        fields.push("> `" + mutuallyExclusiveProps.join("`, `") + "`");
        fields.push("");
      }
    }
    
    fields = fields.concat([
      "Field | Type | Description | Default",
      ":-- | :-- | :-- | :--",
    ]);
    
    // Handle top-level anyOf/oneOf schemas (like screenshot which can be string, object, or boolean)
    if (schema.anyOf || schema.oneOf) {
      const topLevelRows = processTopLevelVariations(schema);
      if (topLevelRows.length > 0) {
        fields = fields.concat(topLevelRows);
      }
    }
    
    // Extract all unique top-level property keys, handling direct properties, anyOf/oneOf, and allOf structures
    const propertyKeys = extractAllPropertyKeys(schema);
    
    // Process each top-level property
    const generatedRows = [];
    for (const field of propertyKeys) {
      let fieldDetails = parseField(schema, field); // Pass only the top-level field name
      generatedRows.push(...fieldDetails);
    }
    
    // Deduplicate rows by creating a map of property name+type to row
    const uniqueRows = {};
    for (const row of generatedRows) {
      const [name, type, description, defaultValue] = row.split(' | ');
      const key = `${name}|${type}`;
      
      // Only add if this property+type combination doesn't exist already
      if (!uniqueRows[key]) {
        uniqueRows[key] = row;
      }
    }
    
    // Add the unique rows to fields
    fields = fields.concat(Object.values(uniqueRows));
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
 * Process top-level variations for schemas that can be multiple types
 * (e.g., screenshot can be a string, object, or boolean)
 */
function processTopLevelVariations(schema) {
  const rows = [];
  
  // Get all variants
  const variants = schema.anyOf || schema.oneOf;
  
  for (const variant of variants) {
    // Handle direct types
    if (variant.type) {
      processVariantWithType(schema.title, variant, rows);
    }
    // Handle nested anyOf/oneOf
    else if (variant.anyOf || variant.oneOf) {
      const nestedVariants = variant.anyOf || variant.oneOf;
      for (const nestedVariant of nestedVariants) {
        processVariantWithType(schema.title, nestedVariant, rows);
      }
    }
  }
  
  return rows;
}

/**
 * Process a schema variant that has a type 
 */
function processVariantWithType(schemaTitle, variant, rows) {
  if (variant.type === 'string') {
    rows.push(`${schemaTitle} | string | ${variant.description || 'No description provided.'} | `);
  } 
  else if (variant.type === 'boolean') {
    rows.push(`${schemaTitle} | boolean | ${variant.description || 'No description provided.'} | `);
  }
  else if (variant.type === 'number' || variant.type === 'integer') {
    const defaultValue = variant.default !== undefined ? `\`${variant.default}\`` : '';
    rows.push(`${schemaTitle} | ${variant.type} | ${variant.description || 'No description provided.'} | ${defaultValue}`);
  }
  else if (variant.type === 'array') {
    let arrayType = 'array';
    if (variant.items) {
      if (variant.items.oneOf || variant.items.anyOf) {
        const itemVariants = variant.items.oneOf || variant.items.anyOf;
        if (itemVariants.length === 1 && itemVariants[0].type) {
          arrayType += ` of ${itemVariants[0].type}`;
        } else {
          const types = itemVariants.filter(v => v.type).map(v => v.type).join(', ');
          if (types) {
            arrayType += ` of ${types}`;
          }
        }
      } else if (variant.items.type) {
        arrayType += ` of ${variant.items.type}`;
      }
    }
    const defaultValue = variant.default ? `\`\`${JSON.stringify(variant.default)}\`\`` : '';
    rows.push(`${schemaTitle} | ${arrayType} | ${variant.description || 'No description provided.'} | ${defaultValue}`);
  }
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
      // Skip non-object variants at the top level
      if (variant.type && variant.type !== 'object') {
        continue;
      }
      
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
          property: {
            ...variant,
            description: variant.description || property.description
          }
        });
      } else if (variant.title) {
        // Reference to another schema
        variations.push({
          type: 'object',
          property: {
            ...variant,
            description: variant.description || property.description
          },
          title: variant.title
        });
      } else if (variant.anyOf || variant.oneOf) {
        // Handle nested anyOf/oneOf
        const nestedVariants = variant.anyOf || variant.oneOf;
        for (const nestedVariant of nestedVariants) {
          if (nestedVariant.type) {
            variations.push({
              type: nestedVariant.type,
              property: {
                ...nestedVariant,
                description: nestedVariant.description || variant.description || property.description
              }
            });
          } else if (nestedVariant.title) {
            variations.push({
              type: 'object',
              property: {
                ...nestedVariant,
                description: nestedVariant.description || variant.description || property.description
              },
              title: nestedVariant.title
            });
          }
        }
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
      // Check if items have a specific type
      if (property.items && property.items.type) {
        typeDetails.type = `${typeDetails.type} of ${property.items.type}`;
      }
      // Check if items have a title (schema reference)
      else if (property.items && property.items.title) {
        typeDetails.type = `${typeDetails.type} of object([${property.items.title}](/docs/references/schemas/${property.items.title}))`;
      }
      // Check if items have multiple possible types
      else if (property.items && (property.items.anyOf || property.items.oneOf)) {
        const itemVariants = property.items.anyOf || property.items.oneOf;
        // Handle single variant with title or type
        if (itemVariants.length === 1) {
          if (itemVariants[0].title) {
            typeDetails.type = `${typeDetails.type} of object([${itemVariants[0].title}](/docs/references/schemas/${itemVariants[0].title}))`;
          } else if (itemVariants[0].type) {
            typeDetails.type = `${typeDetails.type} of ${itemVariants[0].type}`;
          }
        } 
        // Handle multiple variants
        else {
          const typesList = itemVariants.map(v => {
            if (v.title) {
              return `object([${v.title}](/docs/references/schemas/${v.title}))`;
            } else if (v.type) {
              return v.type;
            } else {
              return "unknown";
            }
          });
          
          if (typesList.length > 0) {
            typeDetails.type = `${typeDetails.type} of one of: ${typesList.join(', ')}`;
          }
        }
      }
      // If no specific item type information, use getArraySubTypes
      else {
        const subTypes = getArraySubTypes(property, 0);
        typeDetails.type = typeDetails.type + subTypes;
      }
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
  
  // Add constraint information
  const constraints = [];
  
  if (property.minimum !== undefined) {
    constraints.push(`Minimum: ${property.minimum}`);
  }
  if (property.maximum !== undefined) {
    constraints.push(`Maximum: ${property.maximum}`);
  }
  if (property.minLength !== undefined) {
    constraints.push(`Minimum length: ${property.minLength}`);
  }
  if (property.maxLength !== undefined) {
    constraints.push(`Maximum length: ${property.maxLength}`);
  }
  if (property.pattern) {
    constraints.push(`Pattern: \`${property.pattern}\``);
  }
  
  if (constraints.length > 0) {
    description += `<br/><br/>${constraints.join('. ')}`;
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
    items = items.filter((item) => {
      // If item has explicit type that matches
      if (item.type === typeFilter) return true;
      
      // For object filter, also include items with title (schema references)
      if (typeFilter === 'object' && item.title) return true;
      
      return false;
    });
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
            } else if (variant.title) {
              // Handle case where title exists but type might be undefined
              return `object([${variant.title}](/docs/references/schemas/${variant.title}))`;
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
      // Check for title on the item directly (handles schema references in array items)
      else if (item.title) {
        subTypes = `${subTypes}<br/>${spaces}-&nbsp;object([${item.title}](/docs/references/schemas/${item.title}))`;
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
        } else if (variant.title) {
          // Handle case where title exists but type might be undefined
          return `object([${variant.title}](/docs/references/schemas/${variant.title}))`;
        } else if (variant.type) {
          return variant.type;
        } else {
          return "unknown";
        }
      }).join(", ");
      subTypes += variantTypes;
    }
    // Check for title on the item directly (handles schema references in array items)
    else if (item.title) {
      subTypes = `${subTypes}object([${item.title}](/docs/references/schemas/${item.title}))`;
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

/**
 * Extract action property names from the schema that are mutually exclusive
 * (typically at the top level of an anyOf)
 */
function extractMutuallyExclusiveActionProperties(schema) {
  const actionProps = [];
  
  // Check if the schema has a top-level anyOf or oneOf
  if (!schema.anyOf && !schema.oneOf) {
    return actionProps;
  }
  
  const variants = schema.anyOf || schema.oneOf;
  
  // For each variant, find the action property (usually in required array)
  for (const variant of variants) {
    // Handle typical allOf structure in step schema 
    // where common properties are in one block and action-specific in another
    if (variant.allOf) {
      for (const allOfItem of variant.allOf) {
        if (allOfItem.required && allOfItem.required.length > 0) {
          // Find the action property that's required
          for (const requiredProp of allOfItem.required) {
            // Skip common properties that can be used with any action
            if (['stepId', 'description', 'outputs', 'variables'].includes(requiredProp)) {
              continue;
            }
            if (!actionProps.includes(requiredProp)) {
              actionProps.push(requiredProp);
            }
          }
        }
        
        // Also check the properties directly if they're specific action types
        if (allOfItem.properties) {
          for (const propName of Object.keys(allOfItem.properties)) {
            // Skip common properties that can be used with any action
            if (['stepId', 'description', 'outputs', 'variables'].includes(propName)) {
              continue;
            }
            // Add property if it seems to be an action (has $schema or title)
            const prop = allOfItem.properties[propName];
            if ((prop.$schema || prop.title) && !actionProps.includes(propName)) {
              actionProps.push(propName);
            }
          }
        }
      }
    }
    // Handle direct required properties in the variant
    else if (variant.required) {
      for (const requiredProp of variant.required) {
        // Skip common properties
        if (['stepId', 'description', 'outputs', 'variables'].includes(requiredProp)) {
          continue;
        }
        if (!actionProps.includes(requiredProp)) {
          actionProps.push(requiredProp);
        }
      }
    }
  }
  
  return actionProps;
}