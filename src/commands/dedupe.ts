import * as vscode from 'vscode';
import { dedupe } from '../utils/text';
import { processAndOutput } from './postProcessHelper';

export function registerDedupeCommand(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'string-le.postProcess.dedupe',
			async (): Promise<void> => {
				const editor = vscode.window.activeTextEditor;
				if (!editor) {
					vscode.window.showWarningMessage('No active editor');
					return;
				}
				const values = editor.document.getText().split(/\r?\n/);
				const processed = dedupe(values).join('\n');
				const success = await processAndOutput(editor, processed);
				if (success) {
					vscode.window.showInformationMessage('Deduplication complete');
				}
			},
		),
	);
}
