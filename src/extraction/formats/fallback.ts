import type { Extractor } from '../../types';

const QUOTED_STRING_REGEX = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
const EMPTY_RESULT: readonly string[] = Object.freeze([]);

/**
 * Fallback extractor for quoted strings in unknown formats.
 * Matches double quotes, single quotes, and backticks with escaped characters.
 */
export const extractFallback: Extractor = (
	text,
	_options,
): readonly string[] => {
	const matches = findQuotedStrings(text);

	if (matches.length === 0) {
		return EMPTY_RESULT;
	}

	const strings = extractStringsFromMatches(matches);
	return Object.freeze(strings);
};

function findQuotedStrings(text: string): string[] {
	return text.match(QUOTED_STRING_REGEX) ?? [];
}

function extractStringsFromMatches(matches: string[]): string[] {
	return matches.map(removeQuotes).map(trimString).filter(isNonEmpty);
}

function removeQuotes(quotedString: string): string {
	return quotedString.slice(1, -1);
}

function trimString(str: string): string {
	return str.trim();
}

function isNonEmpty(str: string): boolean {
	return str.length > 0;
}
