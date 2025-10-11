import type { Extractor } from '../../types'

// .env extractor that trims, ignores comments, and unquotes values
export const extractDotenv: Extractor = (text, _options): readonly string[] => {
	const strings: string[] = []
	for (const raw of text.split(/\r?\n/)) {
		const line = raw.trim()
		if (!line || line.startsWith('#')) continue
		const content = line.startsWith('export ') ? line.slice(7).trim() : line
		const equals = content.indexOf('=')
		if (equals === -1) continue
		let value = content.slice(equals + 1).trim()
		if (!value) continue

		// Strip inline comments (but not from quoted values)
		if (!value.startsWith('"') && !value.startsWith("'")) {
			const commentIndex = value.indexOf('#')
			if (commentIndex !== -1) {
				value = value.slice(0, commentIndex).trim()
			}
		}

		// Unquote if quoted
		const unquoted =
			(value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))
				? value.slice(1, -1)
				: value

		// Don't trim again - preserve spaces inside quotes
		if (unquoted) strings.push(unquoted)
	}
	return Object.freeze(strings)
}
