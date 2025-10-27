# Changelog

All notable changes to String-LE will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.8.0] - 2025-10-26

### Changed

- Updated README with corrected marketplace links and improved image positioning
- Enhanced documentation for better user experience

## [1.7.0] - 2025-01-27

### Initial Public Release

String-LE brings zero-hassle string extraction to VS Code. Simple, reliable, focused.

#### Supported File Types

- **JSON** - API responses and configuration files
- **YAML** - Configuration and data files
- **CSV** - Data exports and analysis files
- **TOML** - Configuration files
- **INI** - Configuration files
- **ENV** - Environment files

#### Features

- **Multi-language support** - Comprehensive localization for 12+ languages
- **Intelligent string detection** - Identifies user-visible text while filtering out numbers, IDs, URLs, and technical noise
- **Automatic cleanup built-in**:
  - **Sort** for stable diffs and reviews
  - **Dedupe** to eliminate noise
- **Stream processing** - Work with millions of rows without locking VS Code
- **High-performance** - Efficiently processes large datasets
- **One-command extraction** - `Ctrl+Alt+E` (`Cmd+Alt+E` on macOS)
- **Developer-friendly** - 92 passing tests (93.64% function coverage, 91.76% line coverage), TypeScript strict mode, functional programming, MIT licensed

#### Use Cases

- **i18n & Localization** - Extract user-visible strings for translation files and language packs
- **Content Management** - Pull titles, descriptions, and messages from CMS exports for auditing
- **API Validation** - Extract user-facing messages and errors from API responses for documentation
- **Documentation Audits** - Get all text content from docs for reviews and updates
