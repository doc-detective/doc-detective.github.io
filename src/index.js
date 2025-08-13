const { schemas } = require("./schemas");
const { validate, transformToSchemaKey } = require("./validate");
const { resolvePaths } = require("./resolvePaths");
const { readFile } = require("./files");

module.exports = {
  schemas,
  validate,
  resolvePaths,
  readFile,
  transformToSchemaKey,
};
