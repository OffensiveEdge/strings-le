# Changelog

All notable changes to String-LE will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1] - 2025-10-12

### 🐛 Bug Fixes

- **Removed webview help system**: Eliminated unnecessary webview panel that caused memory leaks on repeated help command invocations
- **Code cleanup**: Removed unused help command registration and related infrastructure

### 🔧 Technical Improvements

- Improved extension activation by removing redundant help webview code
- Better memory management with simplified command structure
- Reduced bundle size by removing webview HTML and related utilities

### 📝 Documentation

- Updated package.json to remove help command references
- Cleaned up test suite to reflect current command structure

## [1.3.0] - 2025-10-11

### 🎉 Initial Public Release

**Strings-LE** - Zero Hassle String Extraction from structured files.

### ✨ Features

#### Core Extraction

- **Multi-format support**: JSON, YAML, CSV, TOML, INI, and .env files
- **One-command extraction**: `Ctrl+Alt+E` (Windows/Linux) or `Cmd+Alt+E` (macOS)
- **Multiple access methods**: Context menu, status bar, Quick Fix (Code Actions)
- **Smart processing**: Automatic deduplication and configurable sorting
- **Trim whitespace**: Configurable leading, trailing, or both ends trimming

#### CSV Advanced Features

- **CSV streaming**: Handle massive files (500k+ lines) without memory issues
- **Column selection**: Extract from specific columns or all at once
- **Header detection**: Automatic header row handling
- **Multi-column fan-out**: Process multiple columns into separate documents

#### Post-Processing Commands

- **Deduplicate**: Remove duplicate strings from any text
- **Sort**: Multiple modes (A→Z, Z→A, by length)
- **Trim**: Clean whitespace with configurable modes
- **Toggle CSV Streaming**: Switch between normal and streaming modes

#### Performance & Safety

- **Large file warnings**: Smart detection before processing
- **Progress indicators**: Visual feedback for long-running operations
- **Cancellation support**: Stop operations mid-process
- **Memory efficient**: Streaming mode for extreme data sets

#### Enterprise Ready

- **13 languages supported**: Full internationalization (EN, ES, FR, DE, JA, ZH-CN, KO, RU, UK, IT, ID, PT-BR, VI)
- **Virtual workspace support**: Compatible with GitHub Codespaces, Gitpod
- **Untrusted workspace handling**: Safe operation in restricted environments
- **Local-only telemetry**: Privacy-focused with configurable logging

#### User Experience

- **Comprehensive configuration**: 14+ settings for customization
- **Status bar integration**: Quick access and mode indicators
- **Side-by-side results**: Open results next to source files
- **Copy to clipboard**: Automatic clipboard integration (configurable)
- **Accessibility compliant**: Full keyboard navigation and screen reader support

### 🔒 Security & Quality

- **Resource management**: Proper cleanup of streams, timers, and channels
- **Error handling**: Comprehensive error handling with user feedback throughout
- **Race condition prevention**: TOCTOU and polling-based issues eliminated
- **Memory safety**: Stack overflow protection and bounded memory usage
- **Code quality**: Zero linter warnings, 138 passing tests, strict TypeScript

### 📊 Performance Benchmarks

- **CSV**: 400k+ lines/sec (3M strings from 501k lines in ~1.25s)
- **JSON**: 1.76M lines/sec (1.76M strings from 351k lines in ~200ms)
- **ENV**: 3.27M lines/sec (5k strings from 5k lines in ~1.5ms)

### 🚀 Part of the LE Family

Strings-LE is part of a growing family of developer productivity tools:

- [EnvSync-LE](https://open-vsx.org/extension/nolindnaidoo/envsync-le) - .env file synchronization
- [Numbers-LE](https://open-vsx.org/extension/nolindnaidoo/numbers-le) - Numeric data extraction
- [Colors-LE](https://open-vsx.org/extension/nolindnaidoo/colors-le) - Color analysis
- [Dates-LE](https://open-vsx.org/extension/nolindnaidoo/dates-le) - Date extraction
- [Paths-LE](https://open-vsx.org/extension/nolindnaidoo/paths-le) - File path analysis
- [URLs-LE](https://open-vsx.org/extension/nolindnaidoo/urls-le) - URL extraction

Each tool follows the same philosophy: **Zero Hassle, Maximum Productivity**.
