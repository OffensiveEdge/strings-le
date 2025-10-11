import { describe, expect, it } from 'vitest'
import { collectStrings } from './collect'

describe('collectStrings', () => {
	it('should collect and trim nested strings', () => {
		const input = { a: '  x ', b: [null, 1, ' y', { c: 'z  ' }] }
		const out = collectStrings(input)
		expect(out).toEqual(['x', 'y', 'z'])
	})

	it('should ignore non-strings and empty', () => {
		const input = { a: 0, b: false, c: undefined, d: null, e: ['   '] }
		const out = collectStrings(input)
		expect(out).toEqual([])
	})

	it('should return empty for null/undefined root', () => {
		expect(collectStrings(undefined as unknown as never)).toEqual([])
		expect(collectStrings(null as unknown as never)).toEqual([])
	})

	it('should handle array root', () => {
		const out = collectStrings([' a ', 1, { x: ' b ' }])
		expect(out).toEqual(['a', 'b'])
	})
})
