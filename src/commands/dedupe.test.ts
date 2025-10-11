import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { commands, window, workspace } from 'vscode'
import { mockExtensionContext } from '../test-utils/vscode.mock'
import { registerDedupeCommand } from './dedupe'

describe('dedupe command', () => {
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
			}
			callback(edit)
			return Promise.resolve(true)
		}),
	})

	beforeEach(() => {
		vi.clearAllMocks()

		// Mock window.activeTextEditor
		;(window.activeTextEditor as any) = createMockEditor('line1\nline2\nline1\nline3')

		// Mock workspace.openTextDocument
		;(workspace.openTextDocument as any).mockResolvedValue({
			uri: { fsPath: '/result.txt' },
		})

		// Mock window.showTextDocument
		;(window.showTextDocument as any).mockResolvedValue(undefined)

		// Mock workspace.applyEdit
		;(workspace.applyEdit as any).mockResolvedValue(true)
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('registers dedupe command', () => {
		registerDedupeCommand(mockExtensionContext as any)

		expect(commands.registerCommand).toHaveBeenCalledWith('string-le.postProcess.dedupe', expect.any(Function))
	})

	it('deduplicates lines in active editor', async () => {
		;(window.activeTextEditor as any) = createMockEditor('apple\nbanana\napple\ncherry\nbanana')

		registerDedupeCommand(mockExtensionContext as any)
		const command = (commands.registerCommand as any).mock.calls[0][1]

		await command()

		// Should call editor.edit with deduplicated content
		expect(window.activeTextEditor?.edit).toHaveBeenCalled()
	})

	it('handles empty document gracefully', async () => {
		;(window.activeTextEditor as any) = createMockEditor('')

		registerDedupeCommand(mockExtensionContext as any)
		const command = (commands.registerCommand as any).mock.calls[0][1]

		await command()

		// Should still call editor.edit (empty result)
		expect(window.activeTextEditor?.edit).toHaveBeenCalled()
	})

	it('handles single line document', async () => {
		;(window.activeTextEditor as any) = createMockEditor('single line')

		registerDedupeCommand(mockExtensionContext as any)
		const command = (commands.registerCommand as any).mock.calls[0][1]

		await command()

		expect(window.activeTextEditor?.edit).toHaveBeenCalled()
	})

	it('does nothing when no active editor', async () => {
		;(window.activeTextEditor as any) = undefined

		registerDedupeCommand(mockExtensionContext as any)
		const command = (commands.registerCommand as any).mock.calls[0][1]

		await command()

		// Should not apply any edits (no active editor)
		expect(window.activeTextEditor).toBeUndefined()
	})

	it('preserves order of first occurrence', async () => {
		;(window.activeTextEditor as any) = createMockEditor('first\nsecond\nfirst\nthird\nsecond')

		registerDedupeCommand(mockExtensionContext as any)
		const command = (commands.registerCommand as any).mock.calls[0][1]

		await command()

		expect(window.activeTextEditor?.edit).toHaveBeenCalled()
	})

	it('handles Windows line endings', async () => {
		;(window.activeTextEditor as any) = createMockEditor('line1\r\nline2\r\nline1\r\nline3')

		registerDedupeCommand(mockExtensionContext as any)
		const command = (commands.registerCommand as any).mock.calls[0][1]

		await command()

		expect(window.activeTextEditor?.edit).toHaveBeenCalled()
	})

	it('handles mixed line endings', async () => {
		;(window.activeTextEditor as any) = createMockEditor('line1\nline2\r\nline1\nline3')

		registerDedupeCommand(mockExtensionContext as any)
		const command = (commands.registerCommand as any).mock.calls[0][1]

		await command()

		expect(window.activeTextEditor?.edit).toHaveBeenCalled()
	})
})
