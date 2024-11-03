import { type FC, useState, type ChangeEvent, type ClipboardEvent } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Upload, ChevronRight, AlertCircle } from 'lucide-react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Alert from '@mui/material/Alert';

// Updated interfaces to match Arazzo 1.0.0 schema
interface ArazzoParameter {
  name: string;
  in: string;
  value: string;
}

interface ArazzoSuccessCriteria {
  condition: string;
}

interface ArazzoStep {
  stepId: string;
  description?: string;
  operationId?: string;
  operationPath?: string;
  parameters?: ArazzoParameter[];
  successCriteria?: ArazzoSuccessCriteria[];
  outputs?: Record<string, string>;
}

interface ArazzoWorkflow {
  workflowId: string;
  summary?: string;
  description?: string;
  inputs?: {
    type: string;
    properties: Record<string, {
      type: string;
      description?: string;
      default?: any;
    }>;
  };
  steps: ArazzoStep[];
  outputs?: Record<string, string>;
}

interface ArazzoSourceDescription {
  name: string;
  url: string;
  type: string;
}

interface ArazzoDescription {
  arazzo: string;
  info: {
    title: string;
    summary?: string;
    description?: string;
    version: string;
  };
  sourceDescriptions?: ArazzoSourceDescription[];
  workflows: ArazzoWorkflow[];
}

const ArazzoRunner: FC = () => {
  // State management
  const [arazzoData, setArazzoData] = useState<ArazzoDescription | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('');
  const [inputValues, setInputValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>('');

  // Process parsed data
  const processData = (parsed: ArazzoDescription) => {
    setArazzoData(parsed);
    // Set first workflow as default if available
    if (parsed.workflows?.length > 0) {
      setSelectedWorkflow(parsed.workflows[0].workflowId);
    }
    setError(null);
    
    // Initialize input values with defaults
    const initialValues: Record<string, any> = {};
    const firstWorkflow = parsed.workflows[0];
    if (firstWorkflow?.inputs?.properties) {
      Object.entries(firstWorkflow.inputs.properties).forEach(([key, schema]) => {
        initialValues[key] = schema.default || '';
      });
    }
    setInputValues(initialValues);
  };

  // Handle file upload
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        processData(parsed);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid JSON format');
      }
    };
    reader.readAsText(file);
  };

  // Handle paste
  const handlePaste = (event: ClipboardEvent) => {
    const content = event.clipboardData.getData('text');
    try {
      const parsed = JSON.parse(content);
      processData(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  // Handle text input submission
  const handleTextInputSubmit = () => {
    try {
      const parsed = JSON.parse(textInput);
      processData(parsed);
      setTextInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  // Handle input changes
  const handleInputChange = (name: string, value: any) => {
    setInputValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get currently selected workflow
  const getCurrentWorkflow = () => {
    return arazzoData?.workflows.find(w => w.workflowId === selectedWorkflow);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Input Methods Tabs */}
      <Card className="bg-white">
        <CardHeader>
          <h2 className="text-xl font-semibold">Upload Arazzo Description</h2>
        </CardHeader>
        <CardContent>
          <TabContext value="upload">
            <Tabs value="upload">
              <Tab label="Upload/Paste" value="upload" />
              <Tab label="Text Input" value="text" />
            </Tabs>
            
            <TabPanel value="upload">
              <div 
                className="border-2 border-dashed rounded-lg p-6 text-center"
                onPaste={handlePaste}
                tabIndex={0}>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2">Drag and drop a file or paste JSON content here</p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".json"
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="mt-2">
                  Select File
                </Button>
              </div>
            </TabPanel>

            <TabPanel value="text">
              <div className="space-y-4">
                <textarea
                  className="w-full h-48 p-2 border rounded-md font-mono text-sm"
                  placeholder="Paste your JSON content here..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
                <Button 
                  onClick={handleTextInputSubmit}
                  className="w-full">
                  Submit
                </Button>
              </div>
            </TabPanel>
          </TabContext>

          {error && (
            <Alert severity="error" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Main Content */}
      {arazzoData && (
        <div className="space-y-4">
          {/* Description Card */}
          <Card className="bg-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{arazzoData.info.title}</h2>
                  <p className="text-sm text-gray-500">Version {arazzoData.info.version}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Arazzo {arazzoData.arazzo}
                </div>
              </div>
              {arazzoData.info.description && (
                <p className="text-gray-600 whitespace-pre-wrap">{arazzoData.info.description}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Workflow Selector */}
              {arazzoData.workflows?.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Select Workflow</label>
                  <Select 
                    value={selectedWorkflow}
                    onChange={(e) => setSelectedWorkflow(e.target.value as string)}>
                    {arazzoData.workflows.map((workflow) => (
                      <MenuItem key={workflow.workflowId} value={workflow.workflowId}>
                        {workflow.workflowId}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}

              {/* Workflow Inputs */}
              {getCurrentWorkflow()?.inputs && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Workflow Inputs</h3>
                  {Object.entries(getCurrentWorkflow()?.inputs?.properties || {}).map(([key, schema]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium">
                        {key}
                        {schema.description && (
                          <span className="text-gray-500 ml-2 text-xs">
                            ({schema.description})
                          </span>
                        )}
                      </label>
                      <input
                        type={schema.type === 'number' ? 'number' : 'text'}
                        value={inputValues[key] || ''}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="block w-full rounded-md border border-gray-300 p-2"
                        placeholder={`Enter ${schema.type}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Workflow Visualization Card */}
          {getCurrentWorkflow() && (
            <Card className="bg-white">
              <CardHeader>
                <h2 className="text-xl font-semibold">
                  Workflow: {getCurrentWorkflow()?.workflowId}
                </h2>
                {getCurrentWorkflow()?.description && (
                  <p className="text-gray-600">{getCurrentWorkflow()?.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getCurrentWorkflow()?.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{step.stepId}</h3>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            {step.operationId || step.operationPath?.split('/').pop()}
                          </span>
                        </div>
                        {step.description && (
                          <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                        )}
                        {step.parameters && step.parameters.length > 0 && (
                          <div className="mt-2 pl-4 border-l-2 border-gray-200">
                            <h4 className="text-sm font-medium">Parameters:</h4>
                            {step.parameters.map((param, idx) => (
                              <div key={idx} className="text-sm">
                                <span className="text-gray-600">{param.name}</span>
                                <span className="text-gray-400"> ({param.in}): </span>
                                <code className="text-xs bg-gray-100 px-1 rounded">
                                  {param.value}
                                </code>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default ArazzoRunner;
