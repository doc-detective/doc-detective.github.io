#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const SUBTREES = {
  common: {
    prefix: 'common',
    remote: 'https://github.com/doc-detective/common',
    branch: 'main'
  },
  core: {
    prefix: 'core',
    remote: 'https://github.com/doc-detective/core',
    branch: 'main'
  },
  resolver: {
    prefix: 'resolver',
    remote: 'https://github.com/doc-detective/resolver',
    branch: 'main'
  },
  vscode: {
    prefix: 'vscode',
    remote: 'https://github.com/doc-detective/vscode',
    branch: 'main'
  },
  cli: {
    prefix: 'cli',
    remote: 'https://github.com/doc-detective/doc-detective',
    branch: 'main'
  },
  'github-action': {
    prefix: 'github-action',
    remote: 'https://github.com/doc-detective/github-action',
    branch: 'main'
  },
  container: {
    prefix: 'container',
    remote: 'https://github.com/doc-detective/docker-image',
    branch: 'main'
  },
  docs: {
    prefix: 'docs',
    remote: 'https://github.com/doc-detective/doc-detective.github.io',
    branch: 'main'
  }
};

// Override branches from environment variables or command line
function getBranch(subtreeName, defaultBranch) {
  // Check for environment variable first
  const envVar = `SUBTREE_${subtreeName.toUpperCase()}_BRANCH`;
  return process.env[envVar] || defaultBranch;
}

function runCommand(command, options = {}) {
  try {
    console.log(`Running: ${command}`);
    const result = execSync(command, { 
      stdio: 'inherit', 
      encoding: 'utf8',
      ...options 
    });
    return result;
  } catch (error) {
    console.error(`Error running command: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

function addSubtree(name, customBranch = null) {
  const subtree = SUBTREES[name];
  if (!subtree) {
    console.error(`Unknown subtree: ${name}`);
    console.log(`Available subtrees: ${Object.keys(SUBTREES).join(', ')}`);
    process.exit(1);
  }

  const branch = customBranch || getBranch(name, subtree.branch);
  const command = `git subtree add --prefix=${subtree.prefix} ${subtree.remote} ${branch} --squash`;
  runCommand(command);
}

function pullSubtree(name, customBranch = null) {
  const subtree = SUBTREES[name];
  if (!subtree) {
    console.error(`Unknown subtree: ${name}`);
    console.log(`Available subtrees: ${Object.keys(SUBTREES).join(', ')}`);
    process.exit(1);
  }

  const branch = customBranch || getBranch(name, subtree.branch);
  const command = `git subtree pull --prefix=${subtree.prefix} ${subtree.remote} ${branch} --squash`;
  runCommand(command);
}

function pushSubtree(name, customBranch = null) {
  const subtree = SUBTREES[name];
  if (!subtree) {
    console.error(`Unknown subtree: ${name}`);
    console.log(`Available subtrees: ${Object.keys(SUBTREES).join(', ')}`);
    process.exit(1);
  }

  const branch = customBranch || getBranch(name, subtree.branch);
  const command = `git subtree push --prefix=${subtree.prefix} ${subtree.remote} ${branch}`;
  runCommand(command);
}

function pullAllSubtrees() {
  console.log('Pulling all subtrees...');
  for (const name of Object.keys(SUBTREES)) {
    console.log(`\n--- Pulling ${name} ---`);
    pullSubtree(name);
  }
  console.log('\n✅ All subtrees pulled successfully!');
}

function pushAllSubtrees() {
  console.log('Pushing all subtrees...');
  for (const name of Object.keys(SUBTREES)) {
    console.log(`\n--- Pushing ${name} ---`);
    pushSubtree(name);
  }
  console.log('\n✅ All subtrees pushed successfully!');
}

function addAllSubtrees() {
  console.log('Adding all subtrees...');
  for (const name of Object.keys(SUBTREES)) {
    console.log(`\n--- Adding ${name} ---`);
    addSubtree(name);
  }
  console.log('\n✅ All subtrees added successfully!');
}

function listSubtrees() {
  console.log('Available subtrees:');
  for (const [name, config] of Object.entries(SUBTREES)) {
    console.log(`  ${name}: ${config.remote} (${config.branch})`);
  }
}

function showStatus() {
  console.log('Git subtree status:');
  try {
    runCommand('git status --porcelain');
    console.log('\nSubtree remotes:');
    for (const [name, config] of Object.entries(SUBTREES)) {
      console.log(`  ${name}: ${config.prefix}/ -> ${config.remote}`);
    }
  } catch (error) {
    console.error('Error getting status:', error.message);
  }
}

function showHelp() {
  console.log(`
Git Subtree Manager

Usage: node scripts/subtree-manager.js <command> [subtree-name] [branch]

Commands:
  add <name> [branch]     Add a specific subtree (optionally from a specific branch)
  pull <name> [branch]    Pull updates from a specific subtree (optionally from a specific branch)
  push <name> [branch]    Push changes to a specific subtree (optionally to a specific branch)
  add-all                 Add all subtrees
  pull-all                Pull updates from all subtrees
  push-all                Push changes to all subtrees
  list                    List available subtrees
  status                  Show git status and subtree info
  help                    Show this help message

Available subtrees: ${Object.keys(SUBTREES).join(', ')}

Branch Configuration:
  You can override the default branch in several ways:
  1. Command line: node scripts/subtree-manager.js pull core develop
  2. Environment variables: SUBTREE_CORE_BRANCH=develop npm run subtree pull core
  3. Edit the SUBTREES configuration in this script

Examples:
  node scripts/subtree-manager.js pull core
  node scripts/subtree-manager.js pull core develop
  node scripts/subtree-manager.js push-all
  SUBTREE_CORE_BRANCH=develop node scripts/subtree-manager.js pull core
`);
}

// Main execution
const [,, command, subtreeName, customBranch] = process.argv;

switch (command) {
  case 'add':
    if (!subtreeName) {
      console.error('Please specify a subtree name');
      process.exit(1);
    }
    addSubtree(subtreeName, customBranch);
    break;
  
  case 'pull':
    if (!subtreeName) {
      console.error('Please specify a subtree name');
      process.exit(1);
    }
    pullSubtree(subtreeName, customBranch);
    break;
  
  case 'push':
    if (!subtreeName) {
      console.error('Please specify a subtree name');
      process.exit(1);
    }
    pushSubtree(subtreeName, customBranch);
    break;
  
  case 'add-all':
    addAllSubtrees();
    break;
  
  case 'pull-all':
    pullAllSubtrees();
    break;
  
  case 'push-all':
    pushAllSubtrees();
    break;
  
  case 'list':
    listSubtrees();
    break;
  
  case 'status':
    showStatus();
    break;
  
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  
  default:
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}
