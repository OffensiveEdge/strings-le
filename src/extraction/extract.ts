import type { Extractor, ExtractorOptions } from '../types';
import { extractCsv } from './formats/csv';
import { extractDotenv } from './formats/dotenv';
import { extractFallback } from './formats/fallback';
import { extractJson } from './formats/json';

const EXTRACTORS: Readonly<Record<string, Extractor>> = Object.freeze({
	json: extractJson,
	csv: extractCsv,
	env: extractDotenv,
	fallback: extractFallback,
});

export function extractStrings(
	text: string,
	fileType: string,
	options?: ExtractorOptions,
): readonly string[] {
	const trimmed = text.trim();
	// Empty input produces empty, frozen result to prevent mutation.
	if (trimmed.length === 0) return Object.freeze([] as string[]);
	const normalizedFileType = fileType.trim().toLowerCase();
	const extractor = EXTRACTORS[normalizedFileType];
	if (!extractor) return extractFallback(trimmed);
	return extractor(trimmed, options);
}
