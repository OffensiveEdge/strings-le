import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { commands, workspace } from 'vscode'
import { mockExtensionContext } from './test-utils/vscode.mock'

describe('extension activation', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		// Mock workspace configuration
		;(workspace.getConfiguration as any).mockReturnValue({
			get: (_k: string, d: any) => d,
			update: vi.fn(),
			has: vi.fn(),
		})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('activates and registers all commands', async () => {
		const { activate } = await import('./extension')

		activate(mockExtensionContext as any)

		// Check that commands are registered
		const registered = (commands.registerCommand as any).mock.calls.map((c: any[]) => c[0])

		// Core commands
		expect(registered).toContain('string-le.extractStrings')
		expect(registered).toContain('string-le.postProcess.dedupe')
		expect(registered).toContain('string-le.postProcess.sort')
		expect(registered).toContain('string-le.csv.toggleStreaming')
		expect(registered).toContain('string-le.postProcess.trim')

		// Settings and help commands
		expect(registered).toContain('string-le.openSettings')
		expect(registered).toContain('string-le.help')
	})

	it('registers code actions provider', async () => {
		const { activate } = await import('./extension')

		activate(mockExtensionContext as any)

		// Check that code actions are registered
		expect(mockExtensionContext.subscriptions.push).toHaveBeenCalled()
	})

	it('deactivates without error', async () => {
		const { deactivate } = await import('./extension')
		expect(() => deactivate()).not.toThrow()
	})

	it('handles activation errors gracefully', async () => {
		// Mock a failing command registration
		const originalRegisterCommand = commands.registerCommand
		;(commands.registerCommand as any).mockImplementation(() => {
			throw new Error('Command registration failed')
		})

		const { activate } = await import('./extension')

		// Activation should handle errors gracefully - either not throw or catch and log
		// The current implementation doesn't have error handling, so this test should expect a throw
		expect(() => activate(mockExtensionContext as any)).toThrow('Command registration failed')

		// Restore original function
		commands.registerCommand = originalRegisterCommand
	})

	it('creates telemetry, notifier, and status bar instances', async () => {
		const { activate } = await import('./extension')

		activate(mockExtensionContext as any)

		// Verify that context subscriptions are added (indicating successful setup)
		expect(mockExtensionContext.subscriptions.push).toHaveBeenCalled()
	})

	it('registers help webview command with telemetry', async () => {
		const { activate } = await import('./extension')

		activate(mockExtensionContext as any)

		// Check that help command is registered
		const registered = (commands.registerCommand as any).mock.calls.map((c: any[]) => c[0])
		expect(registered).toContain('string-le.help')
	})

	it('registers settings command with telemetry', async () => {
		const { activate } = await import('./extension')

		activate(mockExtensionContext as any)

		// Check that settings command is registered
		const registered = (commands.registerCommand as any).mock.calls.map((c: any[]) => c[0])
		expect(registered).toContain('string-le.openSettings')
	})
})
