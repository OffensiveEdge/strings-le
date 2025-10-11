import { bench } from 'vitest'
import { extractStrings } from '../extraction/extract'

// Test data generators
function generateJsonContent(size: number): string {
	const strings = [
		'Hello World',
		'This is a test string',
		'Another string with content',
		'String with special chars: @#$%',
		'Unicode string: 你好世界',
	]
	const obj = {
		items: Array.from({ length: size }, (_, i) => ({
			id: i,
			name: strings[i % strings.length],
			description: `${strings[i % strings.length]} - Item ${i}`,
		})),
	}

	return JSON.stringify(obj)
}

function generateCsvContent(size: number): string {
	const strings = [
		'Hello World',
		'This is a test string',
		'Another string with content',
		'String with special chars: @#$%',
		'Unicode string: 你好世界',
	]
	const rows = ['name,description,value']

	for (let i = 0; i < size; i++) {
		const str = strings[i % strings.length]
		rows.push(`"${str}","${str} - Item ${i}","${i}"`)
	}

	return rows.join('\n')
}

function generateDotenvContent(size: number): string {
	const strings = [
		'Hello World',
		'This is a test string',
		'Another string with content',
		'String with special chars: @#$%',
		'Unicode string: 你好世界',
	]
	const lines = []

	for (let i = 0; i < size; i++) {
		const str = strings[i % strings.length]
		lines.push(`KEY_${i}="${str}"`)
	}

	return lines.join('\n')
}

function generateFallbackContent(size: number): string {
	const strings = [
		'Hello World',
		'This is a test string',
		'Another string with content',
		'String with special chars: @#$%',
		'Unicode string: 你好世界',
	]
	const lines = []

	for (let i = 0; i < size; i++) {
		const str = strings[i % strings.length]
		lines.push(`const value${i} = "${str}";`)
	}

	return lines.join('\n')
}

// Benchmark tests
bench('extractStrings: JSON - 1KB', async () => {
	const content = generateJsonContent(50)
	await extractStrings(content, 'json')
})

bench('extractStrings: JSON - 10KB', async () => {
	const content = generateJsonContent(500)
	await extractStrings(content, 'json')
})

bench('extractStrings: JSON - 100KB', async () => {
	const content = generateJsonContent(5000)
	await extractStrings(content, 'json')
})

bench('extractStrings: JSON - 1MB', async () => {
	const content = generateJsonContent(50000)
	await extractStrings(content, 'json')
})

bench('extractStrings: CSV - 1KB', async () => {
	const content = generateCsvContent(50)
	await extractStrings(content, 'csv')
})

bench('extractStrings: CSV - 10KB', async () => {
	const content = generateCsvContent(500)
	await extractStrings(content, 'csv')
})

bench('extractStrings: CSV - 100KB', async () => {
	const content = generateCsvContent(5000)
	await extractStrings(content, 'csv')
})

bench('extractStrings: CSV - 1MB', async () => {
	const content = generateCsvContent(50000)
	await extractStrings(content, 'csv')
})

bench('extractStrings: DotEnv - 1KB', async () => {
	const content = generateDotenvContent(50)
	await extractStrings(content, 'env')
})

bench('extractStrings: DotEnv - 10KB', async () => {
	const content = generateDotenvContent(500)
	await extractStrings(content, 'env')
})

bench('extractStrings: DotEnv - 100KB', async () => {
	const content = generateDotenvContent(5000)
	await extractStrings(content, 'env')
})

bench('extractStrings: DotEnv - 1MB', async () => {
	const content = generateDotenvContent(50000)
	await extractStrings(content, 'env')
})

bench('extractStrings: Fallback - 1KB', async () => {
	const content = generateFallbackContent(50)
	await extractStrings(content, 'unknown')
})

bench('extractStrings: Fallback - 10KB', async () => {
	const content = generateFallbackContent(500)
	await extractStrings(content, 'unknown')
})

bench('extractStrings: Fallback - 100KB', async () => {
	const content = generateFallbackContent(5000)
	await extractStrings(content, 'unknown')
})

bench('extractStrings: Fallback - 1MB', async () => {
	const content = generateFallbackContent(50000)
	await extractStrings(content, 'unknown')
})

// Memory usage tests
bench('extractStrings: Memory usage - Large JSON', async () => {
	const content = generateJsonContent(10000)
	await extractStrings(content, 'json')

	// Log memory usage if available
	if (typeof process !== 'undefined' && process.memoryUsage) {
		console.log('Memory usage:', process.memoryUsage())
	}
})

bench('extractStrings: Memory usage - Large CSV', async () => {
	const content = generateCsvContent(10000)
	await extractStrings(content, 'csv')

	// Log memory usage if available
	if (typeof process !== 'undefined' && process.memoryUsage) {
		console.log('Memory usage:', process.memoryUsage())
	}
})

bench('extractStrings: Memory usage - Large DotEnv', async () => {
	const content = generateDotenvContent(10000)
	await extractStrings(content, 'env')

	// Log memory usage if available
	if (typeof process !== 'undefined' && process.memoryUsage) {
		console.log('Memory usage:', process.memoryUsage())
	}
})

bench('extractStrings: Memory usage - Large Fallback', async () => {
	const content = generateFallbackContent(10000)
	await extractStrings(content, 'unknown')

	// Log memory usage if available
	if (typeof process !== 'undefined' && process.memoryUsage) {
		console.log('Memory usage:', process.memoryUsage())
	}
})
