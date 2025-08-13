# .github Repository

This repository serves as a monorepo for all Doc Detective projects, managed using git subtrees.

## Projects

- **common** - Common utilities and shared code
- **core** - Core Doc Detective functionality  
- **resolver** - Resolution and validation logic
- **vscode** - VS Code extension

## Git Subtree Management

This repository uses git subtrees to manage multiple projects. See [SUBTREE_MANAGEMENT.md](./SUBTREE_MANAGEMENT.md) for detailed instructions on working with subtrees.

### Quick Start

```bash
# Pull all latest changes
npm run subtree:pull:all

# Push all changes
npm run subtree:push:all

# Show help
npm run subtree help
```

For more detailed subtree management, see the [subtree management guide](./SUBTREE_MANAGEMENT.md).
