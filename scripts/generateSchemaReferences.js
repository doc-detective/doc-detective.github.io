const fs = require("fs");
const path = require("path");
const parser = require("@apidevtools/json-schema-ref-parser");
const { exit } = require("process");

main();
// console.log(schemas);

async function main() {
  const dirPath = path.resolve(`${__dirname}/../_includes/schemas`);
  const files = fs.readdirSync(dirPath);
  for await (const file of files) {
    const filePath = path.resolve(`${dirPath}/${file}`);
    // Load from file
    let schema = fs.readFileSync(filePath).toString();
    // Convert to JSON
    schema = JSON.parse(schema);
    // Set ID
    schema.$id = `${filePath}`;
    // Update references to current relative path
    schema = updateRefPaths(schema, dirPath);
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
    let metadata = [
      "---",
      `title: ${schema.title}`,
      "layout: default",
      "nav_order: 1",
      "parent: Reference",
      "---",
    ];
    // Heading
    let heading = ["", `# ${schema.title}`, "", schema.description, ""];
    // Putting it all together
    let output = metadata
      .concat(heading)
      .concat(fields)
      .concat(examples)
      .join("\n");
    // Identify output path
    const outputPath = path.resolve(
      `${__dirname}/../reference/schemas/${schema.title}.md`
    );
    // Write file
    fs.writeFileSync(outputPath, output);
  }
  console.log("Documents generated.");
}

// Prepend path to referenced relative paths
function updateRefPaths(schema, dirPath) {
  for (let [key, value] of Object.entries(schema)) {
    if (typeof value === "object") {
      updateRefPaths(value, dirPath);
    }
    if (key === "$ref") {
      schema[key] = `${dirPath}/${value}`;
    }
  }
  return schema;
}

function parseField(schema, fieldName) {
  debug = false;
  let details = [];
  let property = schema.properties[fieldName];
  let type = property.type;
  let description = property.description;
  // Get enums
  if (property.enum) {
    let enums = `<br><br>Accepted values: \`${property.enum.join("\`, \`")}\``;
    description = description + enums;
  }
  let defaultValue;
  if (
    // JSON object
    typeof property.default === "object" &&
    !Array.isArray(property.default)
  ) {
    defaultValue = `\`${JSON.stringify(property.default)}\``;
  } else if (
    // Array
    typeof property.default === "object" &&
    Array.isArray(property.default)
  ) {
    defaultValue = `\`${JSON.stringify(property.default)}\``;
  } else if (
    // String or number
    property.default === undefined
  ) {
    defaultValue = "";
  } else {
    defaultValue = `\`${property.default}\``;
  }
  if (debug) console.log(defaultValue);
  details.push(`${fieldName} | ${type} | ${description} | ${defaultValue}`);
  return details;
}
