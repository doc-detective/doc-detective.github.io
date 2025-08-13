const { validate, schemas } = require("../src/index");

console.log(validate("find_v2",schemas.find_v2.examples[0]))