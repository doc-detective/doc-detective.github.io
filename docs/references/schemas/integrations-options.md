
# Integrations options

Options for connecting to external services.

## Referenced In

- [config](/docs/references/schemas/config)

## Fields

Field | Type | Description | Default
:-- | :-- | :-- | :--
openApi | array of unknown | Optional. No description provided. | 
docDetectiveApi | object([Doc Detective Orchestration API](/docs/references/schemas/doc-detective-orchestration-api)) | Optional. Configuration for Doc Detective Orchestration API integration. | 
anthropic | object | Optional. Configuration for Anthropic AI integration. | 
anthropic.apiKey | string | Optional. API key for authenticating with Anthropic. You can also set this via the `ANTHROPIC_API_KEY` environment variable. | 
openAi | object | Optional. Configuration for OpenAI integration. | 
openAi.apiKey | string | Optional. API key for authenticating with OpenAI. You can also set this via the `OPENAI_API_KEY` environment variable. | 
google | object | Optional. Configuration for Google Gemini AI integration. | 
google.apiKey | string | Optional. API key for authenticating with Google Generative AI. You can also set this via the `GOOGLE_GENERATIVE_AI_API_KEY` environment variable. | 
ollama | object | Optional. Configuration for Ollama integration. Ollama runs locally and doesn't require an API key. | 
ollama.baseUrl | string | Optional. Base URL for the Ollama API. | `http://localhost:11434/api`

## Examples

```json
{
  "openApi": [],
  "docDetectiveApi": {
    "apiKey": "example"
  }
}
```

```json
{
  "anthropic": {
    "apiKey": "your-anthropic-api-key"
  }
}
```

```json
{
  "openAi": {
    "apiKey": "your-openai-api-key"
  }
}
```

```json
{
  "google": {
    "apiKey": "your-google-api-key"
  }
}
```

```json
{
  "ollama": {
    "baseUrl": "http://localhost:11434/api"
  }
}
```
