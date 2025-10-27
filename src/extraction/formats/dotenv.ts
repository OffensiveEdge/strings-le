import type { Extractor } from '../../types';

/**
 * Extract values from .env files.
 * Handles comments, export statements, quoted values, and inline comments.
 */
export const extractDotenv: Extractor = (text, _options): readonly string[] => {
	const lines = text.split(/\r?\n/);
	const strings: string[] = [];

	for (const rawLine of lines) {
		const value = extractValueFromLine(rawLine);

		if (value) {
			strings.push(value);
		}
	}

	return Object.freeze(strings);
};

function extractValueFromLine(rawLine: string): string | null {
	const line = rawLine.trim();

	// Guard: Empty line or comment
	if (!line || line.startsWith('#')) {
		return null;
	}

	const content = removeExportPrefix(line);
	const equalsIndex = content.indexOf('=');

	// Guard: No equals sign (invalid env line)
	if (equalsIndex === -1) {
		return null;
	}

	const rawValue = content.slice(equalsIndex + 1).trim();

	// Guard: Empty value
	if (!rawValue) {
		return null;
	}

	const valueWithoutComment = stripInlineComment(rawValue);
	const unquotedValue = unquoteValue(valueWithoutComment);

	return unquotedValue || null;
}

function removeExportPrefix(line: string): string {
	if (line.startsWith('export ')) {
		return line.slice(7).trim();
	}
	return line;
}

function stripInlineComment(value: string): string {
	// Don't strip comments from quoted values
	if (value.startsWith('"') || value.startsWith("'")) {
		return value;
	}

	const commentIndex = value.indexOf('#');

	if (commentIndex !== -1) {
		return value.slice(0, commentIndex).trim();
	}

	return value;
}

function unquoteValue(value: string): string {
	const isDoubleQuoted = value.startsWith('"') && value.endsWith('"');
	const isSingleQuoted = value.startsWith("'") && value.endsWith("'");

	if (isDoubleQuoted || isSingleQuoted) {
		return value.slice(1, -1);
	}

	return value;
}
