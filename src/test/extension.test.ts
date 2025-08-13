import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Extension should be activated', async () => {
		// The extension is expected to be activated when tests run
		const extension = vscode.extensions.getExtension('DocDetective.doc-detective');
		assert.ok(extension, 'Extension should be available');
		
		// If extension is not already activated, activate it
		if (!extension?.isActive) {
			await extension?.activate();
		}
		
		assert.ok(extension?.isActive, 'Extension should be activated');
	});

	test('Commands should be registered', async () => {
		// Get all available commands
		const commands = await vscode.commands.getCommands(true);
		
		// Test for the extension's commands
		assert.ok(commands.includes('doc-detective.helloWorld'), 'helloWorld command should be registered');
	});

	test('WebView provider should be registered', async () => {
		// Try to open the view; if it's not properly registered, this will fail
		try {
			await vscode.commands.executeCommand('docDetectiveView.focus');
			// If we get here without an error, the command is registered
			assert.ok(true, 'WebView provider should be registered');
		} catch (e) {
			assert.fail('WebView provider should be registered, but focus command failed');
		}
	});
});
