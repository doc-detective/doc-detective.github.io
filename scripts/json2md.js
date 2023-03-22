const fs = require("fs");
const path = require("path");
const JsonSchemaStaticDocs = require("json-schema-static-docs");

// (async () => {
//   let jsonSchemaStaticDocs = new JsonSchemaStaticDocs({
//     inputPath: "schema",
//     outputPath: "docs",
//     ajvOptions: {
//       allowUnionTypes: true,
//     },
//   });
//   await jsonSchemaStaticDocs.generate();
//   console.log("Documents generated.");
// })();


(async () =>  {
  // Read files from schema directory
  const dirPath = path.resolve(__dirname, "../reference/schemas");
  let jsonSchemaStaticDocs = new JsonSchemaStaticDocs({
    inputPath: "scripts",
    outputPath: "docs",
    ajvOptions: {
        strict: false,
    }
  });
  await jsonSchemaStaticDocs.generate();
  console.log("Documents generated.");

//   var files = fs.readdirSync(dirPath);
//   // Loop through all schema files
//   files.forEach(async (file) => {
//     // Process Markdown files
//     const extension = file.slice(((file.lastIndexOf(".") - 1) >>> 0) + 2);
//     if (extension === "md") {
//       console.log(file);
//       // Read file content
//       const filePath = path.join(dirPath, file);
//       let text = fs.readFileSync(filePath).toString("utf-8");

//       // Set title
//       let textArray = text.split("\n");
//       let title = textArray.find((line) => line.match(/#.*Schema/));
//       if (title) title = title.split(" ")[1];
//       const titleHeader = `title: ${title}`;
//       textArray.splice(1, 0, titleHeader);
//       text = textArray.join("\n");

//       // Replace ".md" hyperlinks with ".html"
//       text = text.replaceAll(".md", ".html");

//       // Write modified file
//       fs.writeFileSync(filePath, text);
//     }
//   });
})()
