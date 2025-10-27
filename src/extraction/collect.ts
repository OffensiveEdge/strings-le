const MAX_RECURSION_DEPTH = 1000;

/**
 * Recursively collect trimmed string leaf values from JSON-like structures.
 * Silently stops at MAX_RECURSION_DEPTH to prevent stack overflow.
 */
export function collectStrings(
	value: unknown,
	out: string[] = [],
	depth = 0,
): string[] {
	// Guard: Prevent stack overflow
	if (depth > MAX_RECURSION_DEPTH) {
		return out;
	}

	// Guard: Skip null/undefined
	if (value == null) {
		return out;
	}

	// Base case: String value
	if (typeof value === 'string') {
		const trimmed = value.trim();
		if (trimmed) {
			out.push(trimmed);
		}
		return out;
	}

	// Recursive case: Array
	if (Array.isArray(value)) {
		for (const item of value) {
			collectStrings(item, out, depth + 1);
		}
		return out;
	}

	// Recursive case: Object
	if (typeof value === 'object') {
		for (const v of Object.values(value as Record<string, unknown>)) {
			collectStrings(v, out, depth + 1);
		}
		return out;
	}

	// Default: Non-string primitive (number, boolean, etc.)
	return out;
}
