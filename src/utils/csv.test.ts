import { describe, expect, it } from 'vitest';
import { splitCsvLine } from './csv';

describe('splitCsvLine', () => {
	it('should handle empty line', () => {
		expect(splitCsvLine('')).toEqual([]);
	});

	it('should split basic CSV line', () => {
		expect(splitCsvLine('a,b , c ')).toEqual(['a', 'b', 'c']);
	});

	it('should handle quoted commas and escaped quotes', () => {
		expect(splitCsvLine('"a,1","x""y",z')).toEqual(['a,1', 'x"y', 'z']);
	});
});
