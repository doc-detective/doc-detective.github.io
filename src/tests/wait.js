const { validate } = require("doc-detective-common");

exports.wait = wait;

// Open a URI in the browser
async function wait({ step }) {
  let result = { status: "PASS", description: "Waited." };

  // Validate step payload
  const isValidStep = validate({schemaKey: "step_v3", object: step});
  if (!isValidStep.valid) {
    result.status = "FAIL";
    result.description = `Invalid step definition: ${isValidStep.errors}`;
    return result;
  }

  // Resolve wait value
  if (step.wait === true || step.wait === "true") {
    // True boolean
    step.wait = 5000;
  } else if (step.wait === false || step.wait === "false") {
    result.status = "SKIPPED";
    result.description = "Wait skipped.";
    return result;
  } else if (typeof step.wait === "string") {
    // Convert to number
    const waitValue = parseInt(step.wait, 10);
    if (isNaN(waitValue)) {
      result.status = "FAIL";
      result.description = `Invalid wait value: ${step.wait}. Must be a number or boolean.`;
      return result;
    }
    // Set wait value
    step.wait = waitValue;
  }

  // Run action
  try {
    await new Promise((r) => setTimeout(r, step.wait));
  } catch (error) {
    // FAIL: Error waiting
    result.status = "FAIL";
    result.description = `Couldn't wait. ${error.message}`;
    return result;
  }

  // PASS
  result.status = "PASS";
  result.description = "Wait completed successfully.";
  return result;
}
