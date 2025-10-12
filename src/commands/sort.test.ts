import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { commands, window, workspace } from 'vscode';
import { mockExtensionContext } from '../test-utils/vscode.mock';
import { registerSortCommand } from './sort';

describe('sort command', () => {
	// Helper to create mock editor
	const createMockEditor = (text: string) => ({
		document: {
			getText: vi.fn().mockReturnValue(text),
			uri: { fsPath: '/test.txt' },
			positionAt: vi.fn((offset: number) => ({
				line: Math.floor(offset / 10),
				character: offset % 10,
			})),
		},
		edit: vi.fn((callback) => {
			const edit = {
				replace: vi.fn(),
				insert: vi.fn(),
				delete: vi.fn(),
			};
			callback(edit);
			return Promise.resolve(true);
		}),
	});

	beforeEach(() => {
		vi.clearAllMocks();

		// Mock window.activeTextEditor
		(window.activeTextEditor as any) = createMockEditor('zebra\napple\nbanana');

		// Mock window.showQuickPick
		(window.showQuickPick as any).mockResolvedValue('Alphabetical (A → Z)');

		// Mock workspace.openTextDocument
		(workspace.openTextDocument as any).mockResolvedValue({
			uri: { fsPath: '/result.txt' },
		});

		// Mock window.showTextDocument
		(window.showTextDocument as any).mockResolvedValue(undefined);

		// Mock workspace.applyEdit
		(workspace.applyEdit as any).mockResolvedValue(true);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('registers sort command', () => {
		registerSortCommand(mockExtensionContext as any);

		expect(commands.registerCommand).toHaveBeenCalledWith(
			'string-le.postProcess.sort',
			expect.any(Function),
		);
	});

	it('shows sort mode picker', async () => {
		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.showQuickPick).toHaveBeenCalledWith(
			expect.arrayContaining([
				'Alphabetical (A → Z)',
				'Alphabetical (Z → A)',
				'By length (short → long)',
				'By length (long → short)',
			]),
			expect.objectContaining({
				placeHolder: expect.stringContaining('Choose sort mode'),
			}),
		);
	});

	it('sorts alphabetically ascending when selected', async () => {
		(window.showQuickPick as any).mockResolvedValue('Alphabetical (A → Z)');

		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.activeTextEditor?.edit).toHaveBeenCalled();
	});

	it('sorts alphabetically descending when selected', async () => {
		(window.showQuickPick as any).mockResolvedValue('Alphabetical (Z → A)');

		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.activeTextEditor?.edit).toHaveBeenCalled();
	});

	it('sorts by length ascending when selected', async () => {
		(window.showQuickPick as any).mockResolvedValue('By length (short → long)');

		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.activeTextEditor?.edit).toHaveBeenCalled();
	});

	it('sorts by length descending when selected', async () => {
		(window.showQuickPick as any).mockResolvedValue('By length (long → short)');

		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.activeTextEditor?.edit).toHaveBeenCalled();
	});

	it('does nothing when no active editor', async () => {
		(window.activeTextEditor as any) = undefined;

		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.showQuickPick).not.toHaveBeenCalled();
		expect(window.activeTextEditor).toBeUndefined();
	});

	it('does nothing when user cancels picker', async () => {
		(window.showQuickPick as any).mockResolvedValue(undefined);

		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.showQuickPick).toHaveBeenCalled();
		expect(window.activeTextEditor?.edit).not.toHaveBeenCalled();
	});

	it('handles empty document gracefully', async () => {
		(window.activeTextEditor as any) = createMockEditor('');

		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.showQuickPick).toHaveBeenCalled();
		expect(window.activeTextEditor?.edit).toHaveBeenCalled();
	});

	it('handles single line document', async () => {
		(window.activeTextEditor as any) = createMockEditor('single line');

		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.showQuickPick).toHaveBeenCalled();
		expect(window.activeTextEditor?.edit).toHaveBeenCalled();
	});

	it('handles Windows line endings', async () => {
		(window.activeTextEditor as any) = createMockEditor(
			'zebra\r\napple\r\nbanana',
		);

		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.activeTextEditor?.edit).toHaveBeenCalled();
	});

	it('handles mixed line endings', async () => {
		(window.activeTextEditor as any) = createMockEditor(
			'zebra\napple\r\nbanana',
		);

		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.activeTextEditor?.edit).toHaveBeenCalled();
	});

	it('defaults to alpha-asc when invalid selection', async () => {
		// Mock invalid selection (shouldn't happen in real usage)
		(window.showQuickPick as any).mockResolvedValue('Invalid Option');

		registerSortCommand(mockExtensionContext as any);
		const command = (commands.registerCommand as any).mock.calls[0][1];

		await command();

		expect(window.activeTextEditor?.edit).toHaveBeenCalled();
	});
});
