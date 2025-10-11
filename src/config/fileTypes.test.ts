import { describe, expect, it } from 'vitest'
import { isSupportedFileType, normalizeFileType } from './fileTypes'

describe('fileTypes', () => {
	it('should recognize known file types', () => {
		for (const t of ['json', 'csv', 'env', 'fallback']) {
			expect(isSupportedFileType(t)).toBe(true)
		}
		expect(isSupportedFileType('unknown' as string)).toBe(false)
	})

	it('should normalize file types (trim, lowercase, validate)', () => {
		expect(normalizeFileType('  JSON  ')).toBe('json')
		expect(normalizeFileType('  YML')).toBe('yml')
		expect(normalizeFileType('')).toBe(undefined)
		expect(normalizeFileType('x')).toBe(undefined)
	})
})
