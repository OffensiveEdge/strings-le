import { describe, expect, it } from 'vitest'
import { detectEnvExtension } from './filename'

describe('detectEnvExtension', () => {
	it('should map env variants to env', () => {
		expect(detectEnvExtension('/a/.env')).toBe('env')
		expect(detectEnvExtension('/a/.env.local')).toBe('env')
		expect(detectEnvExtension('/a/.env.prod')).toBe('env')
	})

	it('should pass through regular extensions', () => {
		expect(detectEnvExtension('/a/file.json')).toBe('json')
	})

	it('should handle exact .env file', () => {
		expect(detectEnvExtension('.env')).toBe('env')
		expect(detectEnvExtension('/path/to/.env')).toBe('env')
	})

	it('should handle .env prefix but not exact match', () => {
		expect(detectEnvExtension('.env.development')).toBe('env')
		expect(detectEnvExtension('.env.production')).toBe('env')
	})

	it('should handle file without extension', () => {
		expect(detectEnvExtension('README')).toBe('')
		expect(detectEnvExtension('/path/to/Dockerfile')).toBe('')
	})

	it('should handle non-env files', () => {
		expect(detectEnvExtension('environment.json')).toBe('json')
		expect(detectEnvExtension('config.env.json')).toBe('json')
		expect(detectEnvExtension('package.json')).toBe('json')
		expect(detectEnvExtension('src/test.ts')).toBe('ts')
	})
})
