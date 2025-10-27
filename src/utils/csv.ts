const EMPTY_RESULT: readonly string[] = Object.freeze([]);

/**
 * Split a single CSV line into trimmed cells with basic quote handling.
 * Handles escaped quotes (double quotes) within quoted values.
 */
export function splitCsvLine(line: string): readonly string[] {
	// Guard: Empty line
	if (line.length === 0) {
		return EMPTY_RESULT;
	}

	const cells = parseCsvCells(line);
	return Object.freeze(cells);
}

function parseCsvCells(line: string): string[] {
	const cells: string[] = [];
	let currentCell = '';
	let isInsideQuotes = false;

	for (let i = 0; i < line.length; i++) {
		const char = line[i];

		if (isQuoteCharacter(char)) {
			if (isEscapedQuote(line, i, isInsideQuotes)) {
				currentCell += '"';
				i++; // Skip next quote
				continue;
			}

			isInsideQuotes = !isInsideQuotes;
			continue;
		}

		if (isDelimiter(char, isInsideQuotes)) {
			cells.push(currentCell.trim());
			currentCell = '';
			continue;
		}

		currentCell += char;
	}

	cells.push(currentCell.trim());
	return cells;
}

function isQuoteCharacter(char: string | undefined): boolean {
	return char === '"';
}

function isEscapedQuote(
	line: string,
	currentIndex: number,
	isInsideQuotes: boolean,
): boolean {
	const nextChar = line[currentIndex + 1];
	return isInsideQuotes && nextChar === '"';
}

function isDelimiter(
	char: string | undefined,
	isInsideQuotes: boolean,
): boolean {
	return char === ',' && !isInsideQuotes;
}
