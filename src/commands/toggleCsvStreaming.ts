import * as vscode from 'vscode';
import * as nls from 'vscode-nls';

const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

export function registerToggleCsvStreamingCommand(
	context: vscode.ExtensionContext,
): void {
	const command = vscode.commands.registerCommand(
		'string-le.csv.toggleStreaming',
		executeToggleCsvStreaming,
	);

	context.subscriptions.push(command);
}

async function executeToggleCsvStreaming(): Promise<void> {
	const config = vscode.workspace.getConfiguration('string-le');
	const isCurrentlyEnabled = readStreamingEnabled(config);
	const newValue = !isCurrentlyEnabled;

	await updateStreamingEnabled(config, newValue);
	showToggleMessage(newValue);
}

function readStreamingEnabled(config: vscode.WorkspaceConfiguration): boolean {
	return Boolean(config.get('csv.streamingEnabled', false));
}

async function updateStreamingEnabled(
	config: vscode.WorkspaceConfiguration,
	enabled: boolean,
): Promise<void> {
	await config.update(
		'csv.streamingEnabled',
		enabled,
		vscode.ConfigurationTarget.Global,
	);
}

function showToggleMessage(enabled: boolean): void {
	const message = enabled
		? localize('runtime.csv.streaming.enabled', 'CSV streaming enabled')
		: localize('runtime.csv.streaming.disabled', 'CSV streaming disabled');

	vscode.window.showInformationMessage(message);
}

void localize;
