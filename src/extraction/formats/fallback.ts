import type { Extractor } from '../../types';

// Fallback extractor for simple quoted strings across unknown formats
export const extractFallback: Extractor = (
	text,
	_options,
): readonly string[] => {
	// Match double quotes, single quotes, and backticks with escaped characters
	const regex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
	const matches = text.match(regex) ?? [];
	const strings = matches
		.map((s): string => s.slice(1, -1)) // Remove surrounding quotes
		.map((s): string => s.trim())
		.filter(Boolean); // Remove empty strings
	return Object.freeze(strings);
};
