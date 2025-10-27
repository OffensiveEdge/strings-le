import * as vscode from 'vscode';
import type { Telemetry } from '../telemetry/telemetry';
import type { Notifier } from '../ui/notifier';
import type { StatusBar } from '../ui/statusBar';

export function registerHelpCommand(
	context: vscode.ExtensionContext,
	deps: Readonly<{
		telemetry: Telemetry;
		notifier: Notifier;
		statusBar: StatusBar;
	}>,
): void {
	const command = vscode.commands.registerCommand('string-le.help', () =>
		executeHelp(deps),
	);

	context.subscriptions.push(command);
}

async function executeHelp(
	deps: Readonly<{
		telemetry: Telemetry;
		notifier: Notifier;
		statusBar: StatusBar;
	}>,
): Promise<void> {
	deps.telemetry.event('command-help');

	const helpContent = buildHelpContent();
	await displayHelpDocument(helpContent);
}

function buildHelpContent(): string {
	return `
# String-LE Help & Troubleshooting

## Commands
- **Extract Strings** (Ctrl+Alt+E / Cmd+Alt+E): Extract strings from the current document
- **Deduplicate Strings**: Remove duplicate strings from extracted results
- **Sort Strings**: Sort strings alphabetically (ascending or descending)
- **Toggle CSV Streaming**: Enable/disable streaming for large CSV files
- **Open Settings**: Configure String-LE settings
- **Help**: Open this help documentation

## Supported File Types
- JSON/JSONC - Property names, string values
- YAML - Keys and string values
- CSV - String columns
- TOML - Keys and string values
- INI - Property names and values
- ENV - Variable names and values
- JavaScript/TypeScript - String literals, template literals
- HTML - Text content, attributes
- CSS - String values, selectors

## String Formats Supported
- Double-quoted strings: "hello world"
- Single-quoted strings: 'hello world'
- Template literals: \`hello \${name}\`
- Multi-line strings
- Escaped characters

## Post-Processing

### Deduplicate
Removes duplicate strings, keeping only unique values.

### Sort
Sorts strings alphabetically:
- **Ascending (A-Z)**: apple, banana, cherry
- **Descending (Z-A)**: cherry, banana, apple

## CSV Features
For large CSV files (>10MB), enable streaming mode:
- Command: "String-LE: Toggle CSV Streaming"
- Setting: \`string-le.csv.streamingEnabled\`
- Allows column selection for targeted extraction

## Troubleshooting

### No strings found
- Ensure the file contains valid string values
- Check that the file type is supported
- Verify string format is recognized (quoted strings)

### Performance issues
- Large files may take time to process
- Enable CSV streaming for files >10MB
- Use safety settings to limit processing
- Consider breaking large files into smaller chunks

### Incorrect extraction
- Verify file syntax is valid
- Check for proper string delimiters (quotes)
- Enable parse error notifications in settings

## Settings
Access settings via Command Palette: "String-LE: Open Settings"

Key settings:
- **Copy to clipboard**: Auto-copy results (default: false)
- **Deduplication**: Automatically remove duplicates (default: false)
- **Sorting**: Automatically sort results (default: false)
- **Side-by-side view**: Open results beside source (default: false)
- **CSV streaming**: Enable for large CSV files (default: false)
- **Safety checks**: File size warnings (default: 1MB threshold)
- **Notification levels**: silent, important, or all (default: silent)
- **Status bar**: Show/hide status bar item (default: true)
- **Telemetry**: Local logging only (default: false)

## Performance Tips
- Enable CSV streaming for large files
- Disable automatic processing for faster extraction
- Use clipboard mode for large outputs
- Adjust safety thresholds for regular large file work

## Support
- GitHub Issues: https://github.com/OffensiveEdge/string-le/issues
- Documentation: https://github.com/OffensiveEdge/string-le#readme
	`.trim();
}

async function displayHelpDocument(content: string): Promise<void> {
	const document = await vscode.workspace.openTextDocument({
		content,
		language: 'markdown',
	});

	await vscode.window.showTextDocument(document, {
		preview: false,
		viewColumn: vscode.ViewColumn.Beside,
	});
}
