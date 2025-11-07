# Doc Detective Documentation

Documentation for [Doc Detective](https://doc-detective.com) - keep your docs in sync with your product. Always.

## 🤖 For AI Agents and Programmatic Usage

If you're an AI coding agent or need structured information for programmatic usage:

- **[Quick Start for AI Agents](https://doc-detective.com/docs/get-started/quick-start-for-ai)** - Structured guide with JSON examples and common patterns
- **[API Reference Summary](https://doc-detective.com/docs/get-started/api-reference)** - Complete action parameters, return values, and usage
- **[Troubleshooting Guide](https://doc-detective.com/docs/get-started/troubleshooting)** - Common errors and solutions with code examples

**Key concepts:**
- Doc Detective validates documentation by running JSON-defined tests against your product
- Tests consist of actions (goTo, find, click, screenshot, httpRequest, etc.)
- Results are output as structured JSON for parsing and automation
- Ideal for CI/CD pipelines, automated documentation testing, and API validation

**Minimal example:**
```json
{
  "tests": [{
    "steps": [
      {"action": "goTo", "url": "https://example.com"},
      {"action": "find", "selector": "h1"},
      {"action": "screenshot", "path": "result.png"}
    ]
  }]
}
```

Run with: `npx doc-detective --input test.spec.json`

## 🤝 Contributing

We welcome contributions from everyone! Whether you're fixing a typo or writing a complete tutorial, your contribution matters.

### Quick contributions (2-10 minutes)

Fix typos, broken links, or small issues directly in your browser:

1. Click **"Edit this page"** at the bottom of any doc page
2. Make your changes in the GitHub web editor
3. Submit a pull request

**No setup required!** See our [Quick Start Guide](https://doc-detective.com/docs/contributing/quick-start) for details.

### Standard contributions (10-30 minutes)

Add examples, troubleshooting tips, or new content:

- Follow our [Standard Contributions Guide](https://doc-detective.com/docs/contributing/standard-contributions)
- Use our [content templates](https://doc-detective.com/docs/contributing/templates/) for structure
- Set up [local development](#local-development) (optional)

### Substantial contributions (30+ minutes)

Document new features, write tutorials, or restructure documentation:

- Review our [Substantial Contributions Guide](https://doc-detective.com/docs/contributing/substantial-contributions)
- Discuss your plans in an issue first
- Set up [local development](#local-development) (recommended)

**📚 [Read the full contribution guidelines →](https://doc-detective.com/docs/contributing/)**

## 🚀 Local development

### Quick start

```bash
# Clone the repository (or your fork)
git clone https://github.com/doc-detective/doc-detective.github.io.git
cd doc-detective.github.io

# Install dependencies
npm install

# Start the development server
npm run start
```

Visit `http://localhost:3000` to see your changes live.

### Using Dev Containers (recommended)

1. Install [Docker](https://docs.docker.com/get-docker/) and [VS Code](https://code.visualstudio.com/)
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Open the repo in VS Code
4. Press `F1` → "Dev Containers: Reopen in Container"
5. Run `npm run start` in the integrated terminal

Everything is pre-configured!

### Available commands

```bash
npm run start       # Start development server with live reload
npm run build       # Create production build
npm run serve       # Preview production build locally
npm run doc-detective  # Run documentation tests
```

**📖 [Full local development guide →](https://doc-detective.com/docs/contributing/local-development)**

## 📝 Documentation structure

```
docs/
├── get-started/          # Getting started guides
├── references/           # Technical reference documentation
└── contributing/         # Contribution guidelines (you are here!)
    ├── quick-start.mdx
    ├── standard-contributions.mdx
    ├── substantial-contributions.mdx
    ├── local-development.mdx
    ├── review-process.mdx
    ├── testing.mdx
    └── templates/        # Content templates
```

## 🧪 Testing

Doc Detective tests its own documentation! Learn about our testing approach:

- **Run tests**: `npm run doc-detective`
- **Write tests**: See our [Testing Guide](https://doc-detective.com/docs/contributing/testing)
- **Test files**: Look for `.spec.json` files throughout the docs

## 🤔 Questions or ideas?

- **Discord**: [Join our community](https://discord.gg/2M7wXEThfF)
- **Issues**: [Report bugs or request features](https://github.com/doc-detective/doc-detective.github.io/issues)
- **Docs**: [Browse the documentation](https://doc-detective.com/docs)

## 📄 License

This documentation is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## ⭐ Contributors

Thank you to all our contributors! Your contributions make Doc Detective better for everyone.

<!-- Add contributor images here or link to contributors page -->

**[View all contributors →](https://github.com/doc-detective/doc-detective.github.io/graphs/contributors)**