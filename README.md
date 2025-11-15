# Doc Detective Documentation

Documentation for [Doc Detective](https://doc-detective.com) - keep your docs in sync with your product. Always.

## 🤝 Contributing

We welcome contributions from everyone! Whether you're fixing a typo or writing a complete tutorial, your contribution matters.

### Quick contributions (2-10 minutes)

Fix typos, broken links, or small issues directly in your browser:

1. Click **"Edit this page"** at the bottom of any doc page
2. Make your changes in the GitHub web editor
3. Submit a pull request

**No setup required!** See our [Quick Start Guide](https://doc-detective.com/docs/contribute/docs/quick-start) for details.

### Standard contributions (10-30 minutes)

Add examples, troubleshooting tips, or new content:

- Follow our [Standard Contributions Guide](https://doc-detective.com/docs/contribute/docs/standard-contributions)
- Use our [content templates](https://doc-detective.com/docs/category/content-templates) for structure
- Set up [local development](#local-development) (optional)

### Substantial contributions (30+ minutes)

Document new features, write tutorials, or restructure documentation:

- Review our [Substantial Contributions Guide](https://doc-detective.com/docs/contribute/docs/substantial-contributions)
- Discuss your plans in an issue first
- Set up [local development](#local-development) (recommended)

**📚 [Read the full contribution guidelines →](https://doc-detective.com/docs/contribute/docs)**

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
