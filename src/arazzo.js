const { v4: uuid } = require("uuid");

/**
 * Translates an Arazzo description into a Doc Detective test specification
 * @param {Object} arazzoDescription - The Arazzo description object
 * @returns {Object} - The Doc Detective test specification object
 */
function workflowToTest(arazzoDescription, workflowId, inputs) {
  // Initialize the Doc Detective test specification
  const test = {
    id: arazzoDescription.info.title || `${uuid()}`,
    description:
      arazzoDescription.info.description || arazzoDescription.info.summary,
    steps: [],
    openApi: [],
  };

  arazzoDescription.sourceDescriptions.forEach((source) => {
    // Translate OpenAPI definitions to Doc Detective format
    if (source.type === "openapi") {
      const openApiDefinition = {
        name: source.name,
        descriptionPath: source.url,
      };
      test.openApi.push(openApiDefinition);
    }
  });

  // Find workflow by ID
  const workflow = arazzoDescription.workflows.find(
    (workflow) => workflow.workflowId === workflowId
  );

  if (!workflow) {
    console.warn(`Workflow with ID ${workflowId} not found.`);
    return;
  }

  // Translate each step in the workflow to a Doc Detective step
  workflow.steps.forEach((workflowStep) => {
    const docDetectiveStep = {
      action: "httpRequest",
    };

    if (workflowStep.operationId) {
      // Translate API operation steps
      docDetectiveStep.openApi = { operationId: workflowStep.operationId };
    } else if (workflowStep.operationPath) {
      // Handle operation path references (not yet supported in Doc Detective)
      console.warn(
        `Operation path references arne't yet supported in Doc Detective: ${workflowStep.operationPath}`
      );
      return;
    } else if (workflowStep.workflowId) {
      // Handle workflow references (not yet supported in Doc Detective)
      console.warn(
        `Workflow references arne't yet supported in Doc Detective: ${workflowStep.workflowId}`
      );
      return;
    } else {
      // Handle unsupported step types
      console.warn(`Unsupported step type: ${JSON.stringify(workflowStep)}`);
      return;
    }

    // Add parameters
    if (workflowStep.parameters) {
      docDetectiveStep.requestParams = {};
      workflowStep.parameters.forEach((param) => {
        if (param.in === "query") {
          docDetectiveStep.requestParams[param.name] = param.value;
        } else if (param.in === "header") {
          if (!docDetectiveStep.requestHeaders)
            docDetectiveStep.requestHeaders = {};
          docDetectiveStep.requestHeaders[param.name] = param.value;
        }
        // Note: path parameters would require modifying the URL, which is not handled in this simple translation
      });
    }

    // Add request body if present
    if (workflowStep.requestBody) {
      docDetectiveStep.requestData = workflowStep.requestBody.payload;
    }

    // Translate success criteria to response validation
    if (workflowStep.successCriteria) {
      docDetectiveStep.responseData = {};
      workflowStep.successCriteria.forEach((criterion) => {
        if (criterion.condition.startsWith("$statusCode")) {
          docDetectiveStep.statusCodes = [
            parseInt(criterion.condition.split("==")[1].trim()),
          ];
        } else if (criterion.context === "$response.body") {
          // This is a simplification; actual JSONPath translation would be more complex
          docDetectiveStep.responseData[criterion.condition] = true;
        }
      });
    }

    test.steps.push(docDetectiveStep);
  });

  return test;
}
