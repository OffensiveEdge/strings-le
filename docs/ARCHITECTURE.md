# String-LE Architecture

This document describes the architectural patterns, design decisions, and code standards used in the String-LE extension.

## Design Philosophy

String-LE follows Fortune 10 enterprise-grade code quality standards with emphasis on:

- **Readability**: Code should be self-documenting with clear, singular function names
- **Composition**: Factory functions over classes for better testability and flexibility
- **Early Returns**: Guard clauses and fail-fast patterns to reduce nesting
- **Type Safety**: Full TypeScript strict mode with comprehensive null guards
- **Immutability**: Frozen objects and readonly types throughout
- **Consistency**: Repeatable patterns across all modules

## Core Principles

### 1. Early Returns and Fail-Fast

Functions use guard clauses at the top to handle edge cases and invalid inputs:

```typescript
function extractValueFromLine(rawLine: string): string | null {
  const line = rawLine.trim();

  // Guard: Empty line or comment
  if (!line || line.startsWith("#")) {
    return null;
  }

  // Guard: No equals sign (invalid env line)
  if (equalsIndex === -1) {
    return null;
  }

  // ... main logic
}
```

### 2. Singular Function Names

Functions have clear, descriptive names that communicate their single responsibility:

- `extractValueFromLine` - extracts value from a single line
- `removeQuotes` - removes quotes from a string
- `isEnvFile` - checks if a file is an env file
- `buildStatusBarText` - builds status bar text

### 3. Composition Over Inheritance

The codebase uses factory functions and composition instead of classes:

```typescript
export function createNotifier(): Notifier {
  return Object.freeze({
    info(message: string): void {
      showInfo(message);
    },
    warn(message: string): void {
      showWarning(message);
    },
    // ...
  });
}
```

**Exception**: `PerformanceMonitor` class is used for stateful performance tracking where the class pattern provides clear encapsulation of mutable state.

### 4. Minimal Try-Catch

Try-catch blocks are only used for external APIs that can throw:

- JSON/YAML/TOML parsers
- File system operations
- VS Code API calls that may fail

Internal logic uses guard clauses and early returns instead of defensive try-catch.

### 5. Immutability

All exports are frozen to communicate immutability:

```typescript
const EMPTY_RESULT: readonly string[] = Object.freeze([]);

export function dedupe(strings: readonly string[]): readonly string[] {
  const uniqueStrings = Array.from(new Set(strings));
  return Object.freeze(uniqueStrings);
}
```

## Module Organization

### `/src/extension.ts`

Minimal activation logic. Only registers commands, providers, and creates dependencies.

### `/src/commands/`

Command registration and execution logic:

- `index.ts` - Centralized command registration
- `extract.ts` - Main string extraction command
- `dedupe.ts` - Deduplication command
- `sort.ts` - Sorting command
- `help.ts` - Help documentation command
- `toggleCsvStreaming.ts` - CSV streaming toggle
- `postProcessHelper.ts` - Shared post-processing logic

**Pattern**: Each command follows the same structure:

1. Registration function that creates and registers the command
2. Execution function with early returns for validation
3. Helper functions for specific operations
4. Clear separation of concerns

### `/src/extraction/`

Core string extraction logic:

- `extract.ts` - Main extraction dispatcher
- `collect.ts` - Recursive string collection from structured data
- `formats/` - Format-specific extractors

**Pattern**: Each extractor:

1. Validates input with guard clauses
2. Parses the format (with try-catch only for parser)
3. Extracts strings using pure functions
4. Returns frozen array

### `/src/config/`

Configuration management:

- `config.ts` - Configuration reading with frozen return types
- `fileTypes.ts` - File type detection and validation
- `settings.ts` - Settings command registration

**Pattern**: Configuration is read once per operation and returned as frozen objects.

### `/src/ui/`

User interface components:

- `notifier.ts` - Notification management with level filtering
- `statusBar.ts` - Status bar item with flash functionality
- `prompts.ts` - User input prompts for CSV options
- `largeOutput.ts` - Large output warnings and confirmations

**Pattern**: Factory functions return frozen interfaces with clear methods.

### `/src/utils/`

Utility functions:

- `text.ts` - String deduplication and sorting
- `csv.ts` - CSV line parsing
- `filename.ts` - File name and extension detection
- `performance.ts` - Performance monitoring (class-based)

**Pattern**: Pure functions with guard clauses and frozen return values.

### `/src/providers/`

VS Code providers:

- `codeActions.ts` - Code action provider for Quick Fix

**Pattern**: Provider registration with clear separation of concerns.

### `/src/telemetry/`

Local-only telemetry:

- `telemetry.ts` - Output channel logging (never sent over network)

## Type Safety

### Strict TypeScript Configuration

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true
}
```

### Null Safety Patterns

All array/object access is guarded:

```typescript
const row = rows[i] ?? [];
const cell = row[columnIndex] ?? "";
```

### Type Guards

Custom type guards for validation:

```typescript
export function isValidSortMode(value: unknown): value is SortMode {
  const validModes: readonly SortMode[] = [
    "off",
    "alpha-asc",
    "alpha-desc",
    "length-asc",
    "length-desc",
  ];

  return validModes.includes(value as SortMode);
}
```

## Error Handling

### External API Errors

Try-catch only for external APIs:

```typescript
function parseJson(
  text: string,
  onError?: (message: string) => void
): unknown | null {
  try {
    return JSON.parse(text);
  } catch (error) {
    if (onError && error instanceof Error) {
      onError(`Invalid JSON: ${error.message}`);
    }
    return null;
  }
}
```

### Internal Logic Errors

Guard clauses and early returns:

```typescript
function extractFromColumn(
  rows: ReadonlyArray<ReadonlyArray<string>>,
  startIndex: number,
  columnIndex: number
): string[] {
  const results: string[] = [];

  for (let i = startIndex; i < rows.length; i++) {
    const row = rows[i] ?? [];
    const cellValue = (row[columnIndex] ?? "").trim();

    if (cellValue.length > 0) {
      results.push(cellValue);
    }
  }

  return results;
}
```

## Performance Considerations

### CSV Streaming

Large CSV files use async generators to avoid loading entire file into memory:

```typescript
export async function* streamCsvStrings(
  text: string,
  options?: ExtractorOptions
): AsyncGenerator<string, void, unknown> {
  // Stream processing with cleanup
}
```

### Safety Thresholds

Configurable thresholds for:

- File size warnings
- Large output confirmations
- Many documents warnings

### Memory Management

- No caching of large data structures
- Frozen arrays prevent accidental mutations
- Cleanup handlers for streams and timers

## Testing Strategy

### Pure Functions

Most functions are pure and easily testable:

```typescript
describe("dedupe", () => {
  it("removes duplicates", () => {
    const result = dedupe(["a", "b", "a", "c"]);
    expect(result).toEqual(["a", "b", "c"]);
  });
});
```

### Test Organization

- Unit tests colocated with source files (`*.test.ts`)
- Test data in `__data__/` directories
- Performance benchmarks in `*.bench.ts` files

## Localization

### Message Format

Uses `vscode-nls` with `MessageFormat.file`:

```typescript
const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

const message = localize("runtime.error.message", "Error: {0}", details);
```

### Manifest vs Runtime

- **Manifest**: `manifest.*` prefix for package.json strings
- **Runtime**: `runtime.*` prefix for runtime strings

## Dependency Injection

### Factory Pattern

Dependencies are injected via factory functions:

```typescript
export function registerExtractStringsCommand(
  context: vscode.ExtensionContext,
  deps: Readonly<{
    telemetry: Telemetry;
    notifier: Notifier;
    statusBar: StatusBar;
  }>
): void {
  // Use deps throughout
}
```

### Benefits

- Easy testing with mock dependencies
- Clear dependency graph
- No hidden global state

## Code Standards

### Naming Conventions

- **Functions**: `camelCase` with descriptive verb (e.g., `extractStrings`, `buildStatusBarText`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_RECURSION_DEPTH`, `EMPTY_RESULT`)
- **Types**: `PascalCase` (e.g., `StatusBarConfig`, `NotificationLevel`)
- **Interfaces**: `PascalCase` (e.g., `Notifier`, `StatusBar`)

### File Organization

1. Imports
2. Constants
3. Types/Interfaces
4. Main export function
5. Helper functions (most specific first)

### Comments

- Minimal inline comments (code should be self-documenting)
- JSDoc for public APIs and complex logic
- Guard clauses labeled with `// Guard: <reason>`

### Formatting

- Tabs for indentation
- Trailing commas
- Single quotes for strings
- Semicolons required

## Build and Tooling

### TypeScript

- Target: ES2020
- Module: CommonJS (for VS Code compatibility)
- Strict mode enabled

### Testing

- Vitest for unit tests
- Istanbul for coverage
- Node.js test runner for performance tests

### Linting

- Biome for formatting and linting
- Consistent rules across all extensions

## Security and Privacy

### Privacy-First

- No data collection by default
- Telemetry is local-only (Output channel)
- No network requests

### Input Validation

- All user inputs validated
- File operations use VS Code APIs
- No eval or dynamic code execution

## Future Considerations

### Potential Improvements

1. **Incremental Parsing**: For very large files, parse incrementally
2. **Worker Threads**: Offload heavy parsing to worker threads
3. **Caching**: Add optional caching for repeated extractions
4. **Custom Extractors**: Plugin system for custom format extractors

### Maintaining Quality

1. Run tests before each commit
2. Use strict TypeScript settings
3. Follow established patterns
4. Document architectural decisions
5. Keep functions small and focused

## Summary

String-LE demonstrates enterprise-grade code quality through:

- **Clear patterns**: Early returns, guard clauses, singular functions
- **Type safety**: Full strict mode, null guards, type guards
- **Composition**: Factory functions, dependency injection
- **Immutability**: Frozen objects, readonly types
- **Testability**: Pure functions, clear dependencies
- **Performance**: Streaming, safety thresholds, memory management
- **Consistency**: Same patterns across all modules

The codebase is designed to be maintainable, extensible, and professional - suitable for Fortune 10 enterprise environments.
