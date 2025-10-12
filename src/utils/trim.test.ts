import { describe, expect, it } from 'vitest';
import { applyTrimMode } from './trim';

describe('applyTrimMode', () => {
	it('should trim start and end only for both mode', () => {
		const line = '  hello  world  ';
		const result = applyTrimMode(line, 'both');
		expect(result).toBe('hello  world');
	});

	it('should trim only leading whitespace (spaces, tabs)', () => {
		const line1 = '   foo  ';
		const line2 = '\t\tbar  ';
		expect(applyTrimMode(line1, 'leading')).toBe('foo  ');
		expect(applyTrimMode(line2, 'leading')).toBe('bar  ');
	});

	it('should trim only trailing whitespace (spaces, tabs)', () => {
		const line1 = '  baz   ';
		const line2 = '  qux\t\t';
		expect(applyTrimMode(line1, 'trailing')).toBe('  baz');
		expect(applyTrimMode(line2, 'trailing')).toBe('  qux');
	});

	it('should handle empty and whitespace-only lines', () => {
		expect(applyTrimMode('', 'both')).toBe('');
		expect(applyTrimMode('   ', 'both')).toBe('');
		expect(applyTrimMode('\t\t', 'leading')).toBe('');
		expect(applyTrimMode('   ', 'trailing')).toBe('');
	});

	it('should preserve internal whitespace and characters', () => {
		const line = '\t  a \t b  c  ';
		const both = applyTrimMode(line, 'both');
		const leading = applyTrimMode(line, 'leading');
		const trailing = applyTrimMode(line, 'trailing');
		expect(both).toBe('a \t b  c');
		expect(leading).toBe('a \t b  c  ');
		expect(trailing).toBe('\t  a \t b  c');
	});

	it('should handle multi-line when applied per line', () => {
		const text = '\t  a \t b  c  \n' + '  d  e  f  ';
		const both = text
			.split('\n')
			.map((l) => applyTrimMode(l, 'both'))
			.join('\n');
		const leading = text
			.split('\n')
			.map((l) => applyTrimMode(l, 'leading'))
			.join('\n');
		const trailing = text
			.split('\n')
			.map((l) => applyTrimMode(l, 'trailing'))
			.join('\n');

		expect(both).toBe('a \t b  c\nd  e  f');
		expect(leading).toBe('a \t b  c  \nd  e  f  ');
		expect(trailing).toBe('\t  a \t b  c\n  d  e  f');
	});
});
