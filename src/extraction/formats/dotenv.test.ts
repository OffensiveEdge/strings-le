import { describe, expect, it } from 'vitest';
import { extractDotenv } from './dotenv';

describe('extractDotenv', () => {
	it('should extract basic key-value pairs', () => {
		const dotenv = `DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=admin
DB_PASSWORD=secret123`;

		const result = extractDotenv(dotenv);
		expect(result).toEqual([
			'localhost',
			'5432',
			'myapp',
			'admin',
			'secret123',
		]);
	});

	it('should extract quoted values', () => {
		const dotenv = `NAME="John Doe"
DESCRIPTION='A great app'
VERSION="1.0.0"`;

		const result = extractDotenv(dotenv);
		expect(result).toEqual(['John Doe', 'A great app', '1.0.0']);
	});

	it('should handle mixed quotes', () => {
		const dotenv = `SINGLE_QUOTES='value with "double quotes"'
DOUBLE_QUOTES="value with 'single quotes'"
MIXED="value with 'mixed' and \\"escaped\\" quotes"`;

		const result = extractDotenv(dotenv);
		// Note: The extractor doesn't unescape quotes for simplicity/reliability
		expect(result).toEqual([
			'value with "double quotes"',
			"value with 'single quotes'",
			'value with \'mixed\' and \\"escaped\\" quotes',
		]);
	});

	it('should handle empty values', () => {
		const dotenv = `EMPTY=
QUOTED_EMPTY=""
SPACE=" "
NULL_VALUE=null
FALSE_VALUE=false`;

		const result = extractDotenv(dotenv);
		expect(result).toEqual([' ', 'null', 'false']);
	});

	it('should handle comments', () => {
		const dotenv = `# Database settings
DB_HOST=localhost
DB_PORT=5432
# API settings
API_URL=https://api.example.com
API_KEY=secret123`;

		const result = extractDotenv(dotenv);
		expect(result).toEqual([
			'localhost',
			'5432',
			'https://api.example.com',
			'secret123',
		]);
	});

	it('should handle inline comments', () => {
		const dotenv = `DB_HOST=localhost # Database host
DB_PORT=5432 # Database port
API_URL=https://api.example.com # API endpoint`;

		const result = extractDotenv(dotenv);
		expect(result).toEqual(['localhost', '5432', 'https://api.example.com']);
	});

	it('should handle boolean values', () => {
		const dotenv = `DEBUG=true
PRODUCTION=false
ENABLE_FEATURE_X=true
ENABLE_FEATURE_Y=false`;

		const result = extractDotenv(dotenv);
		expect(result).toEqual(['true', 'false', 'true', 'false']);
	});

	it('should handle numeric values', () => {
		const dotenv = `PORT=3000
TIMEOUT=5000
MAX_CONNECTIONS=100
RATE_LIMIT=1000`;

		const result = extractDotenv(dotenv);
		expect(result).toEqual(['3000', '5000', '100', '1000']);
	});

	it('should handle special characters', () => {
		const dotenv = `PASSWORD="pass@word#123"
URL="https://api.example.com/v1/endpoint?param=value"
REGEX="^[a-zA-Z0-9]+$"`;

		const result = extractDotenv(dotenv);
		expect(result).toEqual([
			'pass@word#123',
			'https://api.example.com/v1/endpoint?param=value',
			'^[a-zA-Z0-9]+$',
		]);
	});

	it('should handle multiline values', () => {
		const dotenv = `PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----"
CERTIFICATE='-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKoK/OvD8dObMA0GCSqGSIb3DQEBBQUAMEUxCzAJBgNV...
-----END CERTIFICATE-----'`;

		const result = extractDotenv(dotenv);
		expect(result.length).toBe(2);
		expect(result[0]).toContain('BEGIN PRIVATE KEY');
		expect(result[1]).toContain('BEGIN CERTIFICATE');
	});

	it('should handle empty file', () => {
		const result = extractDotenv('');
		expect(result).toEqual([]);
	});

	it('should handle whitespace only', () => {
		const result = extractDotenv('   \n\t  ');
		expect(result).toEqual([]);
	});

	it('should handle comments only', () => {
		const dotenv = `# This is a comment
# Another comment
# Final comment`;

		const result = extractDotenv(dotenv);
		expect(result).toEqual([]);
	});

	it('should handle malformed lines', () => {
		const dotenv = `VALID_KEY=value
INVALID_LINE_WITHOUT_EQUALS
ANOTHER_VALID_KEY=another_value
MALFORMED=`;

		const result = extractDotenv(dotenv);
		expect(result).toEqual(['value', 'another_value']);
	});

	it('should handle large file', () => {
		const lines = Array.from({ length: 1000 }, (_, i) => `KEY_${i}=value_${i}`);
		const dotenv = lines.join('\n');

		const result = extractDotenv(dotenv);

		// Should extract all values
		expect(result.length).toBe(1000);
		expect(result[0]).toBe('value_0');
		expect(result[999]).toBe('value_999');
	});
});
