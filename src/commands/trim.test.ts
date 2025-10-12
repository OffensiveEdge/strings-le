import { describe, expect, it } from 'vitest';
import { applyTrimMode } from '../utils/trim';

describe('applyTrimMode', () => {
	it('should trim both leading and trailing (default)', () => {
		const initial = '  line 1  \n  line 2  ';
		const expected = 'line 1\nline 2';
		const result = initial
			.split('\n')
			.map((l) => applyTrimMode(l, 'both'))
			.join('\n');
		expect(result).toBe(expected);
	});

	it('should trim leading only', () => {
		const initial = '  line 1  \n\t\tline 2  ';
		const expected = 'line 1  \nline 2  ';
		const result = initial
			.split('\n')
			.map((l) => applyTrimMode(l, 'leading'))
			.join('\n');
		expect(result).toBe(expected);
	});

	it('should trim trailing only', () => {
		const initial = '  line 1  \n  line 2\t\t';
		const expected = '  line 1\n  line 2';
		const result = initial
			.split('\n')
			.map((l) => applyTrimMode(l, 'trailing'))
			.join('\n');
		expect(result).toBe(expected);
	});
});
