import * as path from 'node:path';

/**
 * Detect file type from filename.
 * Treats any ".env*" file as "env" type.
 * Returns extension without the leading dot.
 */
export function detectEnvExtension(fileName: string): string {
	const baseName = path.basename(fileName);

	if (isEnvFile(baseName)) {
		return 'env';
	}

	return extractExtension(fileName);
}

function isEnvFile(baseName: string): boolean {
	return baseName === '.env' || baseName.startsWith('.env');
}

function extractExtension(fileName: string): string {
	const extension = path.extname(fileName);
	return extension.slice(1); // Remove leading dot
}
