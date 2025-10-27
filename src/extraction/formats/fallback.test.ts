import { describe, expect, it } from 'vitest';
import { extractFallback } from './fallback';

describe('extractFallback', () => {
	it('should extract double quoted strings', () => {
		const text = `Hello "world" and "universe"`;
		const result = extractFallback(text);
		expect(result).toEqual(['world', 'universe']);
	});

	it('should extract single quoted strings', () => {
		const text = `Hello 'world' and 'universe'`;
		const result = extractFallback(text);
		expect(result).toEqual(['world', 'universe']);
	});

	it('should extract backtick quoted strings', () => {
		const text = `Hello \`world\` and \`universe\``;
		const result = extractFallback(text);
		expect(result).toEqual(['world', 'universe']);
	});

	it('should extract mixed quote types', () => {
		const text = `"double" 'single' \`backtick\``;
		const result = extractFallback(text);
		expect(result).toEqual(['double', 'single', 'backtick']);
	});

	it('should handle nested quotes', () => {
		const text = `"outer 'inner' quotes" and 'outer "inner" quotes'`;
		const result = extractFallback(text);
		expect(result).toEqual(["outer 'inner' quotes", 'outer "inner" quotes']);
	});

	it('should handle escaped quotes', () => {
		const text = `"escaped \\"quotes\\"" and 'escaped \\'quotes\\''`;
		const result = extractFallback(text);
		// Note: The regex captures the backslashes - unescaping would add complexity
		// For "zero hassle" we keep the simple regex approach
		expect(result).toEqual(['escaped \\"quotes\\"', "escaped \\'quotes\\'"]);
	});

	it('should handle empty strings', () => {
		const text = `"" '' \`\``;
		const result = extractFallback(text);
		expect(result).toEqual([]);
	});

	it('should handle strings with spaces', () => {
		const text = `"hello world" 'foo bar' \`baz qux\``;
		const result = extractFallback(text);
		expect(result).toEqual(['hello world', 'foo bar', 'baz qux']);
	});

	it('should handle strings with special characters', () => {
		const text = `"hello@world.com" 'path/to/file' \`regex: ^[a-z]+$\``;
		const result = extractFallback(text);
		expect(result).toEqual([
			'hello@world.com',
			'path/to/file',
			'regex: ^[a-z]+$',
		]);
	});

	it('should handle strings with newlines', () => {
		const text = `"line1\nline2" 'tab\there' \`carriage\rreturn\``;
		const result = extractFallback(text);
		// Note: The regex doesn't match across newlines by default
		// This is intentional to avoid capturing multi-line code blocks
		expect(result).toEqual(['tab\there']);
	});

	it('should handle no strings', () => {
		const text = `Just plain text without any quotes`;
		const result = extractFallback(text);
		expect(result).toEqual([]);
	});

	it('should handle empty input', () => {
		const result = extractFallback('');
		expect(result).toEqual([]);
	});

	it('should handle whitespace only', () => {
		const result = extractFallback('   \n\t  ');
		expect(result).toEqual([]);
	});

	it('should handle malformed quotes gracefully', () => {
		const text = `"unclosed quote and 'unclosed single`;
		const result = extractFallback(text);
		// Should handle gracefully and extract what it can
		expect(result).toEqual([]);
	});

	it('should handle complex mixed content', () => {
		const text = `Code: const name = "John";
Comment: // This is a comment
String: 'hello world'
Template: \`Hello \${name}\`
Empty: ""`;

		const result = extractFallback(text);
		expect(result).toEqual(['John', 'hello world', 'Hello $' + '{name}']);
	});

	it('should handle large text with many strings', () => {
		const strings = Array.from({ length: 1000 }, (_, i) => `"string_${i}"`);
		const text = strings.join(' ');

		const result = extractFallback(text);

		// Should extract all strings
		expect(result.length).toBe(1000);
		expect(result[0]).toBe('string_0');
		expect(result[999]).toBe('string_999');
	});

	it('should handle strings with unicode', () => {
		const text = `"Hello 世界" 'Привет мир' \`مرحبا بالعالم\``;
		const result = extractFallback(text);
		expect(result).toEqual(['Hello 世界', 'Привет мир', 'مرحبا بالعالم']);
	});

	it('should handle strings with emojis', () => {
		const text = `"Hello 👋" 'World 🌍' \`Universe 🚀\``;
		const result = extractFallback(text);
		expect(result).toEqual(['Hello 👋', 'World 🌍', 'Universe 🚀']);
	});
});
