import * as vscode from 'vscode';

/**
 * Shared helper for post-processing commands (dedupe, sort)
 * Handles the "open in new file vs in-place edit" logic consistently
 * Returns true on success, false on failure
 */
export async function processAndOutput(
	editor: vscode.TextEditor,
	processedContent: string,
): Promise<boolean> {
	const cfg = vscode.workspace.getConfiguration('string-le');
	const openNew = Boolean(cfg.get('postProcess.openInNewFile', false));
	const openSideBySide = Boolean(cfg.get('openResultsSideBySide', false));

	if (openNew) {
		try {
			const doc = await vscode.workspace.openTextDocument({
				content: processedContent,
				language: 'plaintext',
			});
			const options: vscode.TextDocumentShowOptions = {};
			if (openSideBySide) {
				options.viewColumn = vscode.ViewColumn.Beside;
			}
			await vscode.window.showTextDocument(doc, options);
			return true;
		} catch (error) {
			vscode.window.showErrorMessage(
				`Failed to open new document: ${error instanceof Error ? error.message : 'Unknown error'}`,
			);
			return false;
		}
	}

	try {
		const success = await editor.edit((editBuilder) => {
			const fullRange = new vscode.Range(
				editor.document.positionAt(0),
				editor.document.positionAt(editor.document.getText().length),
			);
			editBuilder.replace(fullRange, processedContent);
		});

		if (!success) {
			vscode.window.showErrorMessage(
				'Failed to edit document: edit was rejected. The document may be read-only or no longer valid.',
			);
			return false;
		}

		return true;
	} catch (error) {
		vscode.window.showErrorMessage(
			`Failed to edit document: ${error instanceof Error ? error.message : 'Unknown error'}`,
		);
		return false;
	}
}
