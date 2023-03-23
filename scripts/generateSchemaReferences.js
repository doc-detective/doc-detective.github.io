const fs = require("fs");
const path = require("path");
const parser = require("@apidevtools/json-schema-ref-parser");
const { exit } = require("process");
// const { schemas } = require("doc-detective-common");
// const { schemas } = require("doc-detective-common");

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
    let metadata = [
      "---",
      `title: ${schema.title}`,
      "layout: default",
      "nav_order: 1",
      "parent: Reference",
      "---",
    ];
    let body = [
      "",
      `# ${schema.title}`,
      "",
      "```json",
      JSON.stringify(schema, null, 2),
      "```"
    ]
    let output = metadata.concat(body).join("\n");
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
