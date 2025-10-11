import { describe, expect, it } from 'vitest'
import { extractJson } from './json'

describe('extractJson', () => {
	it('should extract strings from valid JSON object', () => {
		const json = JSON.stringify({
			name: 'John Doe',
			email: 'john@example.com',
			age: 30,
			active: true,
		})

		const result = extractJson(json)
		expect(result).toEqual(['John Doe', 'john@example.com']) // Only strings, not booleans
	})

	it('should extract strings from nested objects', () => {
		const json = JSON.stringify({
			user: {
				profile: {
					firstName: 'John',
					lastName: 'Doe',
				},
				settings: {
					theme: 'dark',
					notifications: false,
				},
			},
		})

		const result = extractJson(json)
		expect(result).toEqual(['John', 'Doe', 'dark']) // Only strings, not booleans
	})

	it('should extract strings from arrays', () => {
		const json = JSON.stringify({
			tags: ['urgent', 'important'],
			users: [
				{ name: 'Alice', role: 'admin' },
				{ name: 'Bob', role: 'user' },
			],
		})

		const result = extractJson(json)
		expect(result).toEqual(['urgent', 'important', 'Alice', 'admin', 'Bob', 'user'])
	})

	it('should handle mixed data types', () => {
		const json = JSON.stringify({
			string: 'hello',
			number: 42,
			boolean: true,
			null: null,
			array: ['item1', 'item2'],
			object: { key: 'value' },
		})

		const result = extractJson(json)
		expect(result).toEqual(['hello', 'item1', 'item2', 'value']) // Only strings
	})

	it('should handle empty values', () => {
		const json = JSON.stringify({
			empty: '',
			null: null,
			false: false,
			zero: 0,
			emptyArray: [],
			emptyObject: {},
		})

		const result = extractJson(json)
		expect(result).toEqual([]) // No strings, only empty/null/boolean/number
	})

	it('should handle malformed JSON', () => {
		const malformed = '{"name": "test", "invalid": }'
		const result = extractJson(malformed)
		expect(result).toEqual([])
	})

	it('should handle empty string', () => {
		const result = extractJson('')
		expect(result).toEqual([])
	})

	it('should handle whitespace only', () => {
		const result = extractJson('   \n\t  ')
		expect(result).toEqual([])
	})

	it('should handle large nested structure', () => {
		const largeObj = {
			level1: {
				level2: {
					level3: {
						items: Array.from({ length: 100 }, (_, i) => ({
							id: i,
							name: `Item ${i}`,
							description: `Description ${i}`,
						})),
					},
				},
			},
		}

		const json = JSON.stringify(largeObj)
		const result = extractJson(json)

		// Should extract all string values
		expect(result.length).toBe(200) // 100 names + 100 descriptions
		expect(result).toContain('Item 0')
		expect(result).toContain('Item 99')
		expect(result).toContain('Description 0')
		expect(result).toContain('Description 99')
	})
})
