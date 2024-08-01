import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import yaml from 'yaml';

const JsonYamlTabs = ({ jsonInput }) => {
    const [yamlOutput, setYamlOutput] = useState('');

    const handleTabSelect = (key) => {
        if (key === 'yaml') {
            const parsedJson = JSON.parse(jsonInput);
            const yamlString = yaml.stringify(parsedJson);
            setYamlOutput(yamlString);
        }
    };
// Change to use Docusaurus code block
    return (
        <Tabs defaultActiveKey="json" onSelect={handleTabSelect}>
            <Tab eventKey="json" title="JSON">
                <pre>{jsonInput}</pre>
            </Tab>
            <Tab eventKey="yaml" title="YAML">
                <pre>{yamlOutput}</pre>
            </Tab>
        </Tabs>
    );
};

export default JsonYamlTabs;