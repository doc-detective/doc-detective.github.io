import React, { useState } from "react";
import yaml from "yaml";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

const JsonYamlTabs = ({ object }) => {
  const jsonInput = JSON.stringify(object, null, 2);
  const yamlOutput = yaml.stringify(object, { lineWidth: -1 });
  // Change to use Docusaurus code block
  return (
    <Tabs defaultValue="json">
      <TabItem value="json" label="JSON">
        <CodeBlock language="json" showLineNumbers>
          {jsonInput}
        </CodeBlock>
      </TabItem>
      <TabItem value="yaml" label="YAML">
        <CodeBlock language="yaml" showLineNumbers>
          {yamlOutput}
        </CodeBlock>
      </TabItem>
    </Tabs>
  );
};

export default JsonYamlTabs;
