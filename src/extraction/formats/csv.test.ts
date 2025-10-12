import { describe, expect, it } from 'vitest';
import { extractCsv } from './csv';

describe('extractCsv', () => {
	it('should extract from basic CSV with headers', () => {
		const csv = `name,email,role
John Doe,john@example.com,admin
Jane Smith,jane@example.com,user`;

		const result = extractCsv(csv);
		expect(result).toEqual([
			'name',
			'email',
			'role',
			'John Doe',
			'john@example.com',
			'admin',
			'Jane Smith',
			'jane@example.com',
			'user',
		]);
	});

	it('should extract from CSV with quoted values', () => {
		const csv = `"Product Name","Description","Price"
"Widget A","A great widget","$19.99"
"Widget B","Another widget","$29.99"`;

		const result = extractCsv(csv);
		expect(result).toEqual([
			'Product Name',
			'Description',
			'Price',
			'Widget A',
			'A great widget',
			'$19.99',
			'Widget B',
			'Another widget',
			'$29.99',
		]);
	});

	it('should extract from CSV with mixed quotes', () => {
		const csv = `name,description
"John Doe","A person with 'quotes' in name"
Jane Smith,'Another person with "quotes" in description'`;

		const result = extractCsv(csv);
		// Note: Single quotes aren't standard CSV delimiters (only double quotes are)
		// So the CSV parser correctly includes them as part of the value
		expect(result).toEqual([
			'name',
			'description',
			'John Doe',
			"A person with 'quotes' in name",
			'Jane Smith',
			'\'Another person with "quotes" in description\'',
		]);
	});

	it('should handle CSV with empty cells', () => {
		const csv = `name,email,phone
John Doe,john@example.com,
Jane Smith,,555-1234
Bob Johnson,bob@example.com,555-5678`;

		const result = extractCsv(csv);
		expect(result).toEqual([
			'name',
			'email',
			'phone',
			'John Doe',
			'john@example.com',
			'Jane Smith',
			'555-1234',
			'Bob Johnson',
			'bob@example.com',
			'555-5678',
		]);
	});

	it('should handle CSV with empty rows', () => {
		const csv = `name,email
John,john@example.com

Jane,jane@example.com`;

		const result = extractCsv(csv);
		expect(result).toEqual([
			'name',
			'email',
			'John',
			'john@example.com',
			'Jane',
			'jane@example.com',
		]);
	});

	it('should handle CSV with trailing commas', () => {
		const csv = `name,email,,
John,john@example.com,,
Jane,jane@example.com,,`;

		const result = extractCsv(csv);
		expect(result).toEqual([
			'name',
			'email',
			'John',
			'john@example.com',
			'Jane',
			'jane@example.com',
		]);
	});

	it('should handle single row CSV', () => {
		const csv = `name,email,role`;

		const result = extractCsv(csv);
		expect(result).toEqual(['name', 'email', 'role']);
	});

	it('should handle single cell CSV', () => {
		const csv = `hello`;

		const result = extractCsv(csv);
		expect(result).toEqual(['hello']);
	});

	it('should handle empty CSV', () => {
		const result = extractCsv('');
		expect(result).toEqual([]);
	});

	it('should handle whitespace only CSV', () => {
		const result = extractCsv('   \n\t  ');
		expect(result).toEqual([]);
	});

	it('should handle CSV with special characters', () => {
		const csv = `name,description
"Test, with comma","Value with ""quotes"""
"Line\nBreak","Tab\tCharacter"`;

		const result = extractCsv(csv);
		expect(result).toEqual([
			'name',
			'description',
			'Test, with comma',
			'Value with "quotes"',
			'Line\nBreak',
			'Tab\tCharacter',
		]);
	});

	it('should handle large CSV', () => {
		const rows = Array.from(
			{ length: 1000 },
			(_, i) => `Item ${i},"Description for item ${i}",${i * 10}`,
		);
		const csv = `name,description,price\n${rows.join('\n')}`;

		const result = extractCsv(csv);

		// Should extract all values
		expect(result.length).toBe(3003); // 3 columns * (1 header + 1000 data rows)
		expect(result[0]).toBe('name');
		expect(result[1]).toBe('description');
		expect(result[2]).toBe('price');
		expect(result[3]).toBe('Item 0');
		expect(result[4]).toBe('Description for item 0');
		expect(result[5]).toBe('0');
	});
});
