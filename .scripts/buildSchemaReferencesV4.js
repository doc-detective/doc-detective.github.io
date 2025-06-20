const fs = require("fs");
const path = require("path");
const parser = require("@apidevtools/json-schema-ref-parser");
const { schemas } = require("doc-detective-common");
const crypto = require("crypto");

// Map to store schemas by their ID to prevent duplicate generation
const schemaRegistry = new Map();

// Map to store schema titles to their file paths
const schemaPaths = new Map();

// Set to track schema files that have been generated
const generatedSchemaFiles = new Set();

// Output directory
const outputDir = path.resolve(`${__dirname}/../docs/references/schemas`);

// Map for tracking parent-child relationships
const parentChildRelationships = new Map();

// Function to create a valid file name from a path
function createValidFileName(str) {
  return str
    .replace(/[\(\)]/g, "")
    .replace(/[^\w.-]/g, "-")
    .toLowerCase();
}

// Function to generate a unique ID for a schema
function generateSchemaId(schema, path = "") {
  // If schema has a title, use it directly
  if (schema.title) {
    return schema.title;
  }

  // For schemas without title, use the path and a hash of content
  const content = JSON.stringify(schema);
  const contentHash = crypto
    .createHash("md5")
    .update(content)
    .digest("hex")
    .substring(0, 8);

  // Clean up the path to make it usable as a filename
  const cleanPath = path.replace(/\[\]/g, "-array").replace(/\./g, "-");

  return cleanPath + (cleanPath ? "-" : "") + contentHash;
}

// Function to extract all object schemas from a schema
function extractObjectSchemas(schema, parentSchemaId = "", currentPath = "") {
  // Skip if null or not an object
  if (!schema || typeof schema !== "object") return {};

  const extractedSchemas = {};

  // If this is an object schema with properties
  if ((schema.type === "object" || !schema.type) && schema.properties) {
    // Generate an ID for this schema
    const schemaId = generateSchemaId(schema, currentPath || parentSchemaId);

    // Store parent-child relationship
    if (parentSchemaId && schemaId !== parentSchemaId) {
      if (!parentChildRelationships.has(parentSchemaId)) {
        parentChildRelationships.set(parentSchemaId, new Set());
      }
      parentChildRelationships.get(parentSchemaId).add(schemaId);
    }

    // Add to extracted schemas if not already processed
    if (!schemaRegistry.has(schemaId)) {
      schemaRegistry.set(schemaId, schema);
      extractedSchemas[schemaId] = schema;

      // Process properties
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        const propPath = currentPath ? `${currentPath}.${propName}` : propName;
        const nestedSchemas = extractObjectSchemas(
          propSchema,
          schemaId,
          propPath
        );
        Object.assign(extractedSchemas, nestedSchemas);
      }
    }
  }

  // Handle array items
  if (schema.type === "array" && schema.items) {
    const itemSchemas = Array.isArray(schema.items)
      ? schema.items
      : [schema.items];
    for (let i = 0; i < itemSchemas.length; i++) {
      const itemPath = `${currentPath}[]`;
      const nestedSchemas = extractObjectSchemas(
        itemSchemas[i],
        parentSchemaId,
        itemPath
      );
      Object.assign(extractedSchemas, nestedSchemas);
    }
  }

  // Handle anyOf/oneOf/allOf
  ["anyOf", "oneOf", "allOf"].forEach((key) => {
    if (Array.isArray(schema[key])) {
      schema[key].forEach((subSchema, index) => {
        const subPath = `${currentPath}${
          currentPath ? "." : ""
        }${key}[${index}]`;
        const nestedSchemas = extractObjectSchemas(
          subSchema,
          parentSchemaId,
          subPath
        );
        Object.assign(extractedSchemas, nestedSchemas);
      });
    }
  });

  return extractedSchemas;
}

// Function to generate markdown for a schema
function generateSchemaMarkdown(schemaId, schema) {
  // Metadata
  const metadata = [];

  // Heading
  const heading = [
    "",
    `# ${schema.title || schemaId}`,
    "",
    schema.description || "",
    "",
  ];

  // Add parent schemas section if this schema is referenced by others
  const parentSchemas = [];
  for (const [parentId, children] of parentChildRelationships.entries()) {
    if (children.has(schemaId) && parentId !== schemaId) {
      const parentPath = schemaPaths.get(parentId);
      if (parentPath) {
        const parentName = parentId;
        parentSchemas.push(`- [${parentName}](${parentPath})`);
      }
    }
  }

  if (parentSchemas.length > 0) {
    heading.push("## Referenced In");
    heading.push("");
    heading.push(...parentSchemas);
    heading.push("");
  }

  // Fields
  const fields = [
    "## Fields",
    "",
    "Field | Type | Description | Default",
    ":-- | :-- | :-- | :--",
  ];

  // Process fields if schema has properties
  if (schema.properties) {
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const row = generatePropertyRow(propName, propSchema, schema);
      fields.push(row);
    }
  }

  fields.push("");

  // Examples
  const examples = ["## Examples", ""];

  if (schema.examples && schema.examples.length > 0) {
    for (const example of schema.examples) {
      const snippet = ["```json", JSON.stringify(example, null, 2), "```", ""];
      examples.push(...snippet);
    }
  } else {
    // Generate example based on schema
    const exampleObj = generateExampleFromSchema(schema);
    if (Object.keys(exampleObj).length > 0) {
      const snippet = [
        "```json",
        JSON.stringify(exampleObj, null, 2),
        "```",
        "",
      ];
      examples.push(...snippet);
    }
  }

  // Putting it all together
  return metadata.concat(heading).concat(fields).concat(examples).join("\n");
}

// Function to generate an example from a schema
function generateExampleFromSchema(schema) {
  if (!schema || !schema.properties) return {};

  const example = {};

  for (const [propName, propSchema] of Object.entries(schema.properties)) {
    // Use default value if available
    if (propSchema.default !== undefined) {
      example[propName] = propSchema.default;
      continue;
    }

    // Generate based on type
    if (propSchema.type === "string") {
      example[propName] = propSchema.enum ? propSchema.enum[0] : "example";
    } else if (propSchema.type === "number" || propSchema.type === "integer") {
      example[propName] = 42;
    } else if (propSchema.type === "boolean") {
      example[propName] = true;
    } else if (propSchema.type === "array") {
      example[propName] = [];
    } else if (propSchema.type === "object" && propSchema.properties) {
      // Only include nested example if it's a simple object
      if (Object.keys(propSchema.properties).length <= 2) {
        example[propName] = generateExampleFromSchema(propSchema);
      } else {
        example[propName] = {};
      }
    }

    // Handle anyOf/oneOf by using the first option
    if (!propSchema.type && (propSchema.anyOf || propSchema.oneOf)) {
      const options = propSchema.anyOf || propSchema.oneOf;
      if (options.length > 0) {
        const firstOption = options[0];
        if (firstOption.type === "string") {
          example[propName] = firstOption.enum
            ? firstOption.enum[0]
            : "example";
        } else if (
          firstOption.type === "number" ||
          firstOption.type === "integer"
        ) {
          example[propName] = 42;
        } else if (firstOption.type === "boolean") {
          example[propName] = true;
        }
      }
    }
  }

  return example;
}

// Function to generate a property row for the fields table
function generatePropertyRow(propName, propSchema, parentSchema) {
  // Get type information
  let type = getTypeString(propSchema);

  // Get description with status prefix
  let description = propSchema.description || "No description provided.";

  // Add required/optional status
  if (parentSchema.required && parentSchema.required.includes(propName)) {
    description = "Required. " + description;
  } else if (propSchema.readOnly) {
    description = "ReadOnly. " + description;
  } else if (propSchema.deprecated) {
    description = "Deprecated. " + description;
  } else {
    description = "Optional. " + description;
  }

  // Add enum values if present
  if (propSchema.enum) {
    let enums = `<br/><br/>Accepted values: \`${propSchema.enum.join(
      "`, `"
    )}\``;
    description = description + enums;
  }

  // Add constraint information
  const constraints = [];

  if (propSchema.minimum !== undefined) {
    constraints.push(`Minimum: ${propSchema.minimum}`);
  }
  if (propSchema.maximum !== undefined) {
    constraints.push(`Maximum: ${propSchema.maximum}`);
  }
  if (propSchema.minLength !== undefined) {
    constraints.push(`Minimum length: ${propSchema.minLength}`);
  }
  if (propSchema.maxLength !== undefined) {
    constraints.push(`Maximum length: ${propSchema.maxLength}`);
  }
  if (propSchema.pattern) {
    constraints.push(`Pattern: \`${propSchema.pattern}\``);
  }

  if (constraints.length > 0) {
    description += `<br/><br/>${constraints.join(". ")}`;
  }

  // Format default value
  let defaultValue = "";
  if (propSchema.default !== undefined) {
    if (typeof propSchema.default === "object") {
      defaultValue = `\`\`${JSON.stringify(propSchema.default)}\`\``;
    } else {
      defaultValue = `\`${propSchema.default}\``;
    }
  }

  return `${propName} | ${type} | ${description} | ${defaultValue}`;
}

// Function to get a string representation of a type
function getTypeString(schema) {
  if (!schema) return "unknown";

  // Direct type
  if (schema.type) {
    let type = schema.type;

    // Handle objects with titles (reference to other schemas)
    if (schema.type === "object" && schema.title) {
      const schemaId = schema.title;
      const schemaPath = schemaPaths.get(schemaId);
      if (schemaPath) {
        type = `object([${schemaId}](${schemaPath}))`;
      } else {
        type = `object(${schemaId})`;
      }
    }

    // Handle arrays
    if (schema.type === "array" && schema.items) {
      const itemType = getArrayItemTypeString(schema.items);
      type = `array of ${itemType}`;
    }

    return type;
  }

  // Handle anyOf/oneOf
  if (schema.anyOf || schema.oneOf) {
    const options = schema.anyOf || schema.oneOf;

    if (options.length === 1) {
      return getTypeString(options[0]);
    }

    // Multiple options
    return (
      "one of:<br/>" +
      options
        .map((option) => {
          return `- ${getTypeString(option)}`;
        })
        .join("<br/>")
    );
  }

  return "unknown";
}

// Function to get a string representation of array item types
function getArrayItemTypeString(items) {
  if (!items) return "any";

  // Single item schema
  if (!Array.isArray(items)) {
    // If the item is an object with a title
    if (items.type === "object" && items.title) {
      const schemaId = items.title;
      const schemaPath = schemaPaths.get(schemaId);
      if (schemaPath) {
        return `object([${schemaId}](${schemaPath}))`;
      } else {
        return `object(${schemaId})`;
      }
    }

    // Handle anyOf/oneOf
    if (items.anyOf || items.oneOf) {
      const options = items.anyOf || items.oneOf;
      if (options.length === 1) {
        return getTypeString(options[0]);
      }

      return (
        "one of: " + options.map((option) => getTypeString(option)).join(", ")
      );
    }

    return items.type || "unknown";
  }

  // Multiple item schemas (tuple validation)
  return "tuple of various types";
}

// Main function
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

  // Process all schemas to extract object schemas
  for await (const key of schemasToGenerate) {
    let schema = schemas[key];
    // Dereference schema
    schema = await parser.dereference(schema);

    // Extract all object schemas
    const extractedSchemas = extractObjectSchemas(schema);

    // Generate schema paths
    for (const [schemaId, _] of Object.entries(extractedSchemas)) {
      const fileName = `${createValidFileName(schemaId)}.md`;
      const pathWithoutExt = fileName.replace(".md", "");
      const encodedPath = encodeURIComponent(pathWithoutExt);
      schemaPaths.set(schemaId, `/docs/references/schemas/${encodedPath}`);
    }
  }

  // Generate markdown files for each schema
  for (const [schemaId, schema] of schemaRegistry.entries()) {
    // Generate markdown content
    const content = generateSchemaMarkdown(schemaId, schema);

    // Determine file name
    const fileName = `${createValidFileName(schemaId)}.md`;
    // Write file
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, content);
    generatedSchemaFiles.add(fileName);

    console.log(`Generated schema file: ${fileName}`);
  }

  console.log(`Total schemas generated: ${generatedSchemaFiles.size}`);
}

// Run the main function
main().catch((err) => {
  console.error("Error generating schema references:", err);
  process.exit(1);
});
