import SchemaForm from '../components/SchemaForms/SchemaForm';
import schemas from "../schemas/schemas.json";

// This default export determines where your story goes in the story list.
export default {
  title: 'Doc Detective/SchemaForm',
  component: SchemaForm,
  // args at the component level for all stories.
  args: {
    schema:schemas.checkLink_v2
  },
  argTypes: {
    schema: { 
      options:[
        "checkLink",
        "goTo",
        "find",
        "typeKeys",
        "runShell",
        "saveScreenshot",
        "setVariables",
        "httpRequest",
        "wait",
        "context",
        "test",
        "spec",
        "config"
      ],
      mapping: {
        checkLink: schemas.checkLink_v2,
        goTo: schemas.goTo_v2,
        find: schemas.find_v2,
        typeKeys: schemas.typeKeys_v2,
        runShell: schemas.runShell_v2,
        saveScreenshot: schemas.saveScreenshot_v2,
        setVariables: schemas.setVariables_v2,
        httpRequest: schemas.httpRequest_v2,
        wait: schemas.wait_v2,
        context: schemas.context_v2,
        test: schemas.test_v2,
        spec: schemas.spec_v2,
        config: schemas.config_v2
      },
      }
  }
};

export const Default = {}