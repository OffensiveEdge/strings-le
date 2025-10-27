import * as vscode from 'vscode';
import * as nls from 'vscode-nls';
import { type SortMode, sortStrings } from '../utils/text';
import { processAndOutput } from './postProcessHelper';

const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

type SortOption = Readonly<{
	label: string;
	mode: SortMode;
}>;

const SORT_OPTIONS: readonly SortOption[] = [
	{
		label: localize('runtime.sort.option.alpha-asc', 'Alphabetical (A → Z)'),
		mode: 'alpha-asc',
	},
	{
		label: localize('runtime.sort.option.alpha-desc', 'Alphabetical (Z → A)'),
		mode: 'alpha-desc',
	},
	{
		label: localize(
			'runtime.sort.option.length-asc',
			'By length (short → long)',
		),
		mode: 'length-asc',
	},
	{
		label: localize(
			'runtime.sort.option.length-desc',
			'By length (long → short)',
		),
		mode: 'length-desc',
	},
] as const;

export function registerSortCommand(context: vscode.ExtensionContext): void {
	const command = vscode.commands.registerCommand(
		'string-le.postProcess.sort',
		executeSort,
	);

	context.subscriptions.push(command);
}

async function executeSort(): Promise<void> {
	const editor = vscode.window.activeTextEditor;

	// Guard: No active editor
	if (!editor) {
		showNoEditorWarning();
		return;
	}

	const sortMode = await promptForSortMode();

	// Guard: User cancelled
	if (!sortMode) {
		return;
	}

	const lines = extractLines(editor);
	const sortedLines = sortStrings(lines, sortMode);
	const processedContent = joinLines(sortedLines);

	const success = await processAndOutput(editor, processedContent);

	if (success) {
		showSuccessMessage();
	}
}

async function promptForSortMode(): Promise<SortMode | undefined> {
	const labels = SORT_OPTIONS.map((option) => option.label);

	const picked = await vscode.window.showQuickPick(labels, {
		placeHolder: localize(
			'runtime.sort.picker.placeholder',
			'Choose sort mode',
		),
	});

	// Guard: User cancelled
	if (!picked) {
		return undefined;
	}

	return findSortMode(picked);
}

function findSortMode(label: string): SortMode {
	const option = SORT_OPTIONS.find((opt) => opt.label === label);
	return option?.mode ?? 'alpha-asc';
}

function showNoEditorWarning(): void {
	vscode.window.showWarningMessage(
		localize('runtime.message.error.no-editor', 'No active editor'),
	);
}

function extractLines(editor: vscode.TextEditor): readonly string[] {
	return editor.document.getText().split(/\r?\n/);
}

function joinLines(lines: readonly string[]): string {
	return lines.join('\n');
}

function showSuccessMessage(): void {
	vscode.window.showInformationMessage(
		localize('runtime.status.postprocess', 'Dedupe/sort applied'),
	);
}
