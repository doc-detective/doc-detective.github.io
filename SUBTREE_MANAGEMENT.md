# Git Subtree Management

This repository uses git subtrees to manage multiple Doc Detective projects in a single monorepo. This document explains how to work with these subtrees.

## Available Subtrees

- `common` - Common utilities and shared code
- `core` - Core Doc Detective functionality
- `resolver` - Resolution and validation logic
- `vscode` - VS Code extension

## Quick Commands

### Using npm scripts (recommended for individual operations):

```bash
# Pull updates from a specific subtree
npm run subtree:pull:core
npm run subtree:pull:common
npm run subtree:pull:resolver
npm run subtree:pull:vscode

# Push changes to a specific subtree
npm run subtree:push:core
npm run subtree:push:common
npm run subtree:push:resolver
npm run subtree:push:vscode

# Bulk operations
npm run subtree:pull:all    # Pull all subtrees
npm run subtree:push:all    # Push all subtrees
```

### Using the subtree manager script (recommended for advanced operations):

```bash
# Show available commands
npm run subtree help

# List all subtrees
npm run subtree:list

# Show status
npm run subtree:status

# Pull a specific subtree
npm run subtree pull core

# Push a specific subtree
npm run subtree push core

# Pull all subtrees
npm run subtree pull-all

# Push all subtrees
npm run subtree push-all

# Add a new subtree (if not already present)
npm run subtree add core
```

## Workflow

### Day-to-day development:

1. **Pull latest changes**: `npm run subtree:pull:all`
2. **Make your changes** in the appropriate subdirectories
3. **Commit your changes** to this repository
4. **Push changes back** to individual repos: `npm run subtree:push:all`

### Working on a specific project:

1. **Pull updates**: `npm run subtree:pull:core`
2. **Make changes** in the `core/` directory
3. **Commit changes** to this repository
4. **Push to the core repo**: `npm run subtree:push:core`

## Important Notes

### Git Subtree Behavior

- **Squashed commits**: We use `--squash` for pulls to keep history clean
- **Separate histories**: Each subtree maintains its own commit history
- **Two-way sync**: Changes can flow both ways between this repo and individual repos

### Best Practices

1. **Always pull before pushing**: Ensure you have the latest changes
2. **Commit to main repo first**: Always commit your changes to this repository before pushing to subtrees
3. **Test changes**: Verify changes work in the context of this monorepo
4. **Coordinate team changes**: Communicate with team when making significant changes

### Troubleshooting

If you encounter merge conflicts:

1. **Resolve conflicts** in the affected files
2. **Commit the resolution** to this repository
3. **Try the push again**

If a subtree gets out of sync:

1. **Check status**: `npm run subtree:status`
2. **Pull latest**: `npm run subtree:pull:<name>`
3. **If needed, force push**: Manually run the git command without `--squash`

### Manual Git Commands

If you need to run git subtree commands manually:

```bash
# Add a new subtree
git subtree add --prefix=<directory> <repository-url> <branch> --squash

# Pull updates
git subtree pull --prefix=<directory> <repository-url> <branch> --squash

# Push changes
git subtree push --prefix=<directory> <repository-url> <branch>
```

## Repository URLs

- Common: https://github.com/doc-detective/common
- Core: https://github.com/doc-detective/core
- Resolver: https://github.com/doc-detective/resolver
- VS Code: https://github.com/doc-detective/vscode
