// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { promises as fsp } from 'fs';
const { detectTests } = require('doc-detective-resolver');
const yaml = require('js-yaml');

// Create an output channel for logging
const outputChannel = vscode.window.createOutputChannel('Doc Detective');

/**
 * Logs a message to both the console and the extension's output channel.
 *
 * @param message - The message to log.
 */
function log(message: string) {
  console.log(message);
  outputChannel.appendLine(message);
}

/**
 * Loads and parses a configuration file in JSON or YAML format from the specified path.
 *
 * @param filePath - The absolute path to the configuration file.
 * @returns The parsed configuration object, or {@link null} if loading or parsing fails.
 *
 * @remark
 * Returns {@link null} if the file cannot be read, parsed, or if the file format is unsupported.
 */
async function loadConfigFile(filePath: string): Promise<any> {
  try {
    log(`Loading config file: ${filePath}`);
    const content = await fsp.readFile(filePath, 'utf8');
    
    if (filePath.endsWith('.json')) {
      return JSON.parse(content);
    } else if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
      return yaml.load(content);
    }
    throw new Error(`Unsupported file format: ${path.extname(filePath)}`);
  } catch (error) {
    log(`Error loading config file: ${error}`);
    return null;
  }
}

/**
 * Asynchronously checks if a file exists and is accessible.
 *
 * @param filePath - The path to the file to check.
 * @returns True if the file exists and is accessible, false otherwise.
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fsp.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Searches for the Doc Detective configuration file in the workspace.
 *
 * Checks for a user-specified config path in settings, resolving absolute or relative paths. If not found, searches for default config filenames in each workspace folder root. Returns the path to the first config file found, or `null` if none exist.
 *
 * @param workspaceFolders - The workspace folders to search for the config file.
 * @returns The path to the configuration file, or `null` if not found.
 */
async function findConfigFile(workspaceFolders: readonly vscode.WorkspaceFolder[] | undefined): Promise<string | null> {
  // First check if a custom path is set in settings
  const config = vscode.workspace.getConfiguration('docDetective');
  const configPath = config.get<string>('configPath');
  
  if (configPath && configPath.trim() !== '') {
    // If absolute path, use it directly
    if (path.isAbsolute(configPath)) {
      return (await fileExists(configPath)) ? configPath : null;
    }
    
    // Relative path - try to resolve from each workspace folder
    if (workspaceFolders && workspaceFolders.length > 0) {
      for (const folder of workspaceFolders) {
        const fullPath = path.join(folder.uri.fsPath, configPath);
        if (await fileExists(fullPath)) {
          return fullPath;
        }
      }
    }
    
    // If we get here, the custom path wasn't found
    log(`Custom config path not found: ${configPath}`);
    return null;
  }
  
  // If no custom path or not found, look for default files in workspace root
  if (workspaceFolders && workspaceFolders.length > 0) {
    for (const folder of workspaceFolders) {
      const possibleFiles = [
        path.join(folder.uri.fsPath, '.doc-detective.json'),
        path.join(folder.uri.fsPath, '.doc-detective.yaml'),
        path.join(folder.uri.fsPath, '.doc-detective.yml')
      ];
      
      for (const file of possibleFiles) {
        if (await fileExists(file)) {
          log(`Found config file: ${file}`);
          return file;
        }
      }
    }
  }
  
  log('No Doc Detective config file found');
  return null;
}

// WebviewViewProvider for Doc Detective
class DocDetectiveWebviewViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'docDetectiveView';
  private _view?: vscode.WebviewView;

  constructor(private readonly context: vscode.ExtensionContext) {}

  // Check if the view is available
  public hasView(): boolean {
    return !!this._view;
  }

  public async resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    try {
      log('Resolving webview view...');
      this._view = webviewView;
      webviewView.webview.options = {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, 'media')]
      };
      
      // Set content security policy for the webview
      // Allow inline styles and scripts, as well as VS Code's webview CSS
      // Updated CSP to be more permissive for webview functionality
      webviewView.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' https:; script-src 'unsafe-inline'; connect-src vscode-webview:;">
          <title>Loading Doc Detective...</title>
          <style>
            body {
              padding: 20px;
              color: var(--vscode-editor-foreground);
              font-family: var(--vscode-font-family);
            }
            .loading {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100px;
            }
          </style>
        </head>
        <body>
          <div class="loading">Loading Doc Detective... Please wait.</div>
        </body>
        </html>
      `;
      
      // Initial render
      log('Initial webview HTML set, updating webview...');
      await this.updateWebview();

      // Listen for messages from the webview (if needed)
      webviewView.webview.onDidReceiveMessage(async (message) => {
        log(`Received message from webview: ${JSON.stringify(message)}`);
      });
      
      log('Webview view resolved successfully');
    } catch (error) {
      log(`Error resolving webview: ${error}`);
      if (this._view) {
        this._view.webview.html = this.getErrorHtml(`Failed to initialize Doc Detective panel: ${error}`);
      }
    }
  }

  public async updateWebview() {
    try {
      if (!this._view) {
        log('No view available to update');
        return;
      }
      
      log('Updating webview content...');
      
      // Get open files
      const editors = vscode.window.visibleTextEditors;
      const filePaths = editors
        .filter(e => e.document.uri.scheme === 'file')
        .map(e => e.document.uri.fsPath);
      const uniquePaths = Array.from(new Set(filePaths));
      
      log(`Found ${uniquePaths.length} unique file paths`);
      
      if (uniquePaths.length === 0) {
        this._view.webview.html = this.getNoFilesHtml();
        return;
      }
      
      // Show loading state
      this._view.webview.html = this.getLoadingHtml();
      
      // Load config file if available
      const configFilePath = await findConfigFile(vscode.workspace.workspaceFolders);
      let baseConfig: any = null;
      
      if (configFilePath) {
        baseConfig = await loadConfigFile(configFilePath);
        log(`Loaded base config from ${configFilePath}`);
      } else {
        log('No config file found, using default configuration');
      }
      
      // For each file, detect tests
      const results: Record<string, any> = {};
      for (const file of uniquePaths) {
        try {
          log(`Detecting tests for file: ${file}`);
          
          // Create a config object that either extends the loaded config or creates a new one
          const config = baseConfig ? { ...baseConfig } : {};
          
          // Always override the input with the current file
          config.input = file;
          
          const suites = await detectTests({ config });
          results[file] = suites;
          log(`Detected tests for ${file}: ${JSON.stringify(suites).substring(0, 100)}...`);
        } catch (e) {
          log(`Error detecting tests for ${file}: ${e}`);
          results[file] = { error: String(e) };
        }
      }
        // Render JSON in webview
      log('Rendering results to HTML...');
      try {
        this._view.webview.html = this.getHtmlForWebview(results);
        log('Webview updated successfully with full view');
      } catch (renderError) {
        log(`Error with view rendering: ${renderError}`);
        this._view.webview.html = this.getErrorHtml(`Failed to render results: ${renderError}`);
      }
    } catch (error) {
      log(`Error updating webview: ${error}`);
      if (this._view) {
        this._view.webview.html = this.getErrorHtml(`Failed to update Doc Detective panel: ${error}`);
      }
    }
  }

  private getLoadingHtml(): string {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' https:; script-src 'unsafe-inline'; connect-src vscode-webview:;">
        <title>Doc Detective Results</title>
        <style>
          body {
            font-family: var(--vscode-editor-font-family, monospace); 
            margin: 0; 
            padding: 1em; 
            background: var(--vscode-editor-background); 
            color: var(--vscode-editor-foreground);
          }
          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100px;
          }
        </style>
      </head>
      <body>
        <div class="loading">Processing files, please wait...</div>
      </body>
      </html>`;
  }

  private getNoFilesHtml(): string {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' https:; script-src 'unsafe-inline'; connect-src vscode-webview:;">
        <title>Doc Detective Results</title>
        <style>
          body {
            font-family: var(--vscode-editor-font-family, monospace); 
            margin: 0; 
            padding: 1em; 
            background: var(--vscode-editor-background); 
            color: var(--vscode-editor-foreground);
          }
          .message {
            padding: 1em;
            text-align: center;
          }
        </style>
      </head>
      <body>        <div class="message">
          <h3>No files open</h3>
          <p>Open files in the editor to see Doc Detective results.</p>
          <p><em>Results automatically update when files are saved.</em></p>
        </div>
      </body>
      </html>`;
  }

  private getErrorHtml(errorMessage: string): string {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' https:; script-src 'unsafe-inline'; connect-src vscode-webview:;">
        <title>Doc Detective Error</title>
        <style>
          body {
            font-family: var(--vscode-editor-font-family, monospace); 
            margin: 0; 
            padding: 1em; 
            background: var(--vscode-editor-background); 
            color: var(--vscode-editor-foreground);
          }
          .error {
            color: var(--vscode-errorForeground);
            padding: 1em;
            border: 1px solid currentColor;
            margin: 1em 0;
          }
        </style>
      </head>      <body>
        <h3>Doc Detective Error</h3>
        <div class="error">${errorMessage}</div>
        <p>Check the Doc Detective output channel for more details.</p>
        <p><em>Doc Detective automatically updates when files are saved.</em></p>
      </body>
      </html>`;
  }
  private getHtmlForWebview(jsonObj: any): string {
    try {
      // Handle empty results
      if (!jsonObj || Object.keys(jsonObj).length === 0) {
        log('No results to display');
        return this.getNoFilesHtml();
      }
      
      // Properly escape the JSON for embedding in JavaScript
      // First stringify the object, then escape any problematic characters
      const jsonString = JSON.stringify(JSON.stringify(jsonObj))
        .slice(1, -1)  // Remove the outer quotes added by the second stringify
        .replace(/\\"/g, '\\"'); // Ensure quotes are properly escaped
      
      // Log a sample of the prepared JSON string for debugging
      log(`JSON string prepared (first 100 chars): ${jsonString.substring(0, 100)}...`);
      
      return `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' https:; script-src 'unsafe-inline'; connect-src vscode-webview:;">
          <title>Doc Detective Results</title>
          <style>
            :root {
              --background: var(--vscode-editor-background);
              --foreground: var(--vscode-editor-foreground);
              --key-color: var(--vscode-symbolIcon-propertyForeground, var(--vscode-debugTokenExpression-name, #9cdcfe));
              --string-color: var(--vscode-debugTokenExpression-string, #ce9178);
              --number-color: var(--vscode-debugTokenExpression-number, #b5cea8);
              --boolean-color: var(--vscode-debugTokenExpression-boolean, #569cd6);
              --indent-color: var(--vscode-editorIndentGuide-background, #555);
              --dash-color: var(--vscode-editorIndentGuide-activeBackground, #666);
              --toggle-color: var(--vscode-editorLink-activeForeground, #569cd6);
            }
            
            body { 
              font-family: var(--vscode-editor-font-family, monospace); 
              margin: 0; 
              padding: 0.5em; 
              background: var(--background); 
              color: var(--foreground);
              font-size: var(--vscode-editor-font-size, 14px);
              line-height: 1.5;
            }
            
            .collapsible { cursor: pointer; }
            
            .content { 
              display: block; 
              margin-left: 1.5em; 
            }
            
            li:not(.active) > .content { 
              display: none; 
            }
            
            .key { 
              color: var(--key-color); 
              font-weight: var(--vscode-font-weight, normal);
            }
            
            .string { 
              color: var(--string-color); 
            }
            
            .number { 
              color: var(--number-color); 
            }
            
            .boolean { 
              color: var(--boolean-color); 
            }
            
            .null { 
              color: var(--foreground);
              opacity: 0.7; 
            }
            
            ul { 
              list-style-type: none; 
              margin: 0; 
              padding: 0; 
            }
            
            .yaml-indent { 
              color: var(--indent-color); 
            }
            
            .yaml-dash { 
              color: var(--dash-color); 
            }
            
            .toggle { 
              color: var(--toggle-color);
              display: inline-block;
              width: 1em;
              text-align: center;
            }
            
            .simple-obj { 
              margin-left: 1.5em;
              padding-left: 0.5em;
              border-left: 1px solid var(--indent-color);
            }
            
            /* Basic styling */
            .collapsible {
              transition: opacity 0.1s;
            }
            
            li {
              padding: 1px 0;
            }
            
            /* Error/debug info */
            .error-info {
              color: var(--vscode-errorForeground);
              margin: 8px 0;
              padding: 8px;
              border: 1px solid currentColor;
            }

            /* No results message */
            .no-results {
              text-align: center;
              padding: 20px;
            }
          </style>        </head>
        <body>
          <div id="debug-info" style="display: none; padding: 8px; margin-bottom: 12px; border: 1px solid var(--vscode-debugTokenExpression-name); font-size: 12px;"></div>
          <div id="json"></div><script>
            // Error handling wrapper
            try {
              // Use the pre-escaped JSON string directly
              // This avoids issues with template string interpolation
              const jsonObj = JSON.parse("${jsonString}");
              
              // Check if we have data to display
              if (!jsonObj || Object.keys(jsonObj).length === 0) {
                document.getElementById('json').innerHTML = '<div class="no-results">No results to display</div>';
                console.log('Empty results object');
              }
              
              function escapeHTML(str) {
                return str.replace(/[&<>]/g, function(tag) {
                  const chars = {'&':'&amp;','<':'&lt;','>':'&gt;'};
                  return chars[tag] || tag;
                });
              }
              
              // Helper function to check if an object has nested objects/arrays
              function hasNestedObjects(obj) {
                if (typeof obj !== 'object' || obj === null) return false;
                
                if (Array.isArray(obj)) {
                  return obj.some(item => typeof item === 'object' && item !== null);
                } else {
                  return Object.values(obj).some(val => typeof val === 'object' && val !== null);
                }
              }
              
              function renderYAML(obj, indent = 0, isArrayItem = false) {
                const INDENT = '  ';
                const pad = (n) => INDENT.repeat(n);
                
                if (typeof obj !== 'object' || obj === null) {
                  if (typeof obj === 'string') return '<span class="string">' + escapeHTML(obj) + '</span>';
                  if (typeof obj === 'number') return '<span class="number">' + obj + '</span>';
                  if (typeof obj === 'boolean') return '<span class="boolean">' + obj + '</span>';
                  if (obj === null) return '<span class="null">null</span>';
                  return obj;
                }
                
                if (Array.isArray(obj)) {
                  if (obj.length === 0) return '[]';
                  let html = '<ul>';
                  
                  for (let i = 0; i < obj.length; i++) {
                    const value = obj[i];
                    const indentSpan = '<span class="yaml-indent">' + pad(indent) + '</span>';
                    
                    if (typeof value === 'object' && value !== null) {
                      if (Array.isArray(value)) {
                        // Array inside array
                        html += '<li>' + indentSpan + '<span class="yaml-dash">-</span> ' + 
                                renderYAML(value, indent + 1, true) + '</li>';
                      } else {
                        // Object inside array
                        const keys = Object.keys(value);
                        if (keys.length === 0) {
                          html += '<li>' + indentSpan + '<span class="yaml-dash">-</span> {}</li>';
                        } else {
                          const hasNested = hasNestedObjects(value);
                          const firstKey = keys[0];

                          if (hasNested) {
                            // This is a complex object with nested properties
                            // Use triangle toggle INSTEAD OF dash marker
                            html += '<li class="active">' + indentSpan + 
                                    '<span class="collapsible"><span class="toggle">▼</span> <span class="key">' + 
                                    escapeHTML(firstKey) + ':</span></span>';

                            if (typeof value[firstKey] === 'object' && value[firstKey] !== null) {
                              // First value is also an object
                              html += '<div class="content">' + renderYAML(value[firstKey], indent + 1) + '</div>';
                            } else {
                              // First value is a primitive
                              html += ' ' + renderYAML(value[firstKey], 0);
                              html += '<div class="content">';
                              for (let k = 1; k < keys.length; k++) {
                                html += '<div>' + 
                                        '<span class="yaml-indent">' + pad(indent + 1) + '</span>' +
                                        '<span class="key">' + escapeHTML(keys[k]) + ':</span> ' + 
                                        renderYAML(value[keys[k]], 0) + '</div>';
                              }
                              html += '</div>';
                            }
                          } else {
                            // Simple object - use dash marker
                            html += '<li>' + indentSpan + '<span class="yaml-dash">-</span> ' +
                                    '<span class="key">' + escapeHTML(firstKey) + ':</span> ' +
                                    renderYAML(value[firstKey], 0);
                            
                            if (keys.length > 1) {
                              html += '<div class="simple-obj">';
                              for (let k = 1; k < keys.length; k++) {
                                html += '<div>' + 
                                        '<span class="key">' + escapeHTML(keys[k]) + ':</span> ' + 
                                        renderYAML(value[keys[k]], 0) + '</div>';
                              }
                              html += '</div>';
                            }
                          }
                        }
                      }
                    } else {
                      // Simple value in array
                      html += '<li>' + indentSpan + '<span class="yaml-dash">-</span> ' + 
                              renderYAML(value, 0, true) + '</li>';
                    }
                    html += '</li>';
                  }
                  
                  html += '</ul>';
                  return html;
                } else {
                  // It's an object
                  const keys = Object.keys(obj);
                  if (keys.length === 0) return '{}';
                  
                  let html = '<ul>';
                  keys.forEach(function(key) {
                    const value = obj[key];
                    const indentation = '<span class="yaml-indent">' + pad(indent) + '</span>';
                    
                    if (typeof value === 'object' && value !== null && (hasNestedObjects(value) || Array.isArray(value))) {
                      // Object with nested structure - use triangle
                      html += '<li class="active">' + indentation +
                              '<span class="collapsible"><span class="toggle">▼</span> <span class="key">' + 
                              escapeHTML(key) + ':</span></span>' +
                              '<div class="content">' + renderYAML(value, indent + 1, Array.isArray(value)) + '</div>' +
                              '</li>';
                    } else {
                      // Simple key-value
                      html += '<li>' + indentation + '<span class="key">' + 
                              escapeHTML(key) + ':</span> ' + renderYAML(value, 0) + '</li>';
                    }
                  });
                  
                  html += '</ul>';
                  return html;
                }
              }
              
              document.getElementById('json').innerHTML = renderYAML(jsonObj, 0);
              document.querySelectorAll('.collapsible').forEach(function(el) {
                el.addEventListener('click', function(e) {
                  e.stopPropagation();
                  var parent = el.parentElement;
                  parent.classList.toggle('active');
                  
                  // Update the toggle arrow
                  const toggleEl = el.querySelector('.toggle');
                  if (toggleEl) {
                    toggleEl.textContent = parent.classList.contains('active') ? '▼' : '▶';
                  }
                });
              });

              // Handle theme changes
              window.addEventListener('message', event => {
                const message = event.data;
                if (message.type === 'vscode-theme-updated') {
                  console.log('Theme updated');
                }
              });
                // Show success message
              document.getElementById('debug-info').innerHTML = 'Data loaded successfully!';
              
              // Initialize VS Code API properly
              try {
                const vscode = acquireVsCodeApi();
                
                // Add a message to let the extension know we loaded successfully
                setTimeout(() => {
                  vscode.postMessage({
                    command: 'webviewLoaded',
                    data: { success: true }
                  });
                }, 500);
              } catch (e) {
                // This might happen if running in a context without VS Code API
                console.error('Failed to acquire VS Code API:', e);
                document.getElementById('debug-info').style.display = 'block';
                document.getElementById('debug-info').innerHTML += '<br>VS Code API error: ' + e.message;
              }
            } catch (e) {
              console.error('Error in webview script:', e);
              document.getElementById('debug-info').style.display = 'block';
              document.getElementById('debug-info').innerHTML = 'Error in webview: ' + e.message;
              document.getElementById('json').innerHTML = 
                '<div class="error-info">Error processing results: ' + e.message + '</div>';
            }
          </script>
        </body>
        </html>`;
    } catch (error) {
      log(`Error generating HTML: ${error}`);
      return this.getErrorHtml(`Failed to generate HTML: ${error}`);
    }
  }




}

// This method is called when your extension is activated
/**
 * Activates the Doc Detective extension and registers its commands, webview provider, and event listeners.
 *
 * Sets up the sidebar panel for detecting and displaying test suites in open files, and ensures the panel updates automatically in response to editor, file, theme, and configuration changes. Also registers commands for manual refresh and switching to a simplified view.
 *
 * @param context - The VS Code extension context used for managing extension lifecycle and subscriptions.
 */

export function activate(context: vscode.ExtensionContext) {
  log('Activating Doc Detective extension...');

  const disposable = vscode.commands.registerCommand('doc-detective.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from doc-detective!');
  });
  context.subscriptions.push(disposable);


  // Register the WebviewViewProvider for the sidebar
  const provider = new DocDetectiveWebviewViewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('docDetectiveView', provider)
  );

  // Refresh the webview when visible editors change
  context.subscriptions.push(
    vscode.window.onDidChangeVisibleTextEditors(() => {
      log('Visible editors changed, updating webview...');
      provider.updateWebview();
    })
  );

  // Hot-reload the webview when the active editor changes (switching tabs)
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() => {
      log('Active editor changed, updating webview...');
      provider.updateWebview();
    })
  );

  // Update the webview when a file is saved
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((document) => {
      log(`File saved: ${document.uri.fsPath}, updating webview...`);
      provider.updateWebview();
    })
  );

  // Update when the color theme changes
  context.subscriptions.push(
    vscode.window.onDidChangeActiveColorTheme(() => {
      log('Color theme changed, updating webview...');
      if (provider.hasView()) {
        provider.updateWebview();
      }
    })
  );

  // Update when configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('docDetective.configPath')) {
        log('Doc Detective configuration changed, updating webview...');
        if (provider.hasView()) {
          provider.updateWebview();
        }
      }
    })
  );

  context.subscriptions.push(outputChannel);
  log('Doc Detective extension activated');
}

/**
 * Deactivates the extension.
 *
 * This function is called by Visual Studio Code when the extension is deactivated. No cleanup actions are performed.
 */
export function deactivate() {}
