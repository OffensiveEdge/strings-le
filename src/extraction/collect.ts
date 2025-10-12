// Maximum recursion depth to prevent stack overflow
const MAX_DEPTH = 1000;

// Recursively collect trimmed string leaf values from JSON-like structures
export function collectStrings(
	value: unknown,
	out: string[] = [],
	depth = 0,
): string[] {
	if (depth > MAX_DEPTH) {
		// Silently stop recursion instead of throwing
		// (user gets partial results rather than crash)
		return out;
	}

	if (value == null) return out;
	if (typeof value === 'string') {
		const trimmed = value.trim();
		if (trimmed) out.push(trimmed);
		return out;
	}
	if (Array.isArray(value)) {
		for (const item of value) {
			collectStrings(item, out, depth + 1);
		}
		return out;
	}
	if (typeof value === 'object') {
		for (const v of Object.values(value as Record<string, unknown>)) {
			collectStrings(v, out, depth + 1);
		}
		return out;
	}
	return out;
}
