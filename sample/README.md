# String-LE Sample Files

Test files for String-LE string extraction functionality across all supported formats. Use these files to explore string detection and test various extraction scenarios.

---

## 📋 Sample Files Overview

| File               | Format | Strings | Description                                         |
| ------------------ | ------ | ------- | --------------------------------------------------- |
| `sample.json`      | JSON   | ~80     | Nested objects with UI strings, messages, labels    |
| `sample.yaml`      | YAML   | ~60     | Configuration with localization and error messages  |
| `sample.csv`       | CSV    | ~100    | Product data with descriptions and status messages  |
| `sample.toml`      | TOML   | ~70     | Server config with features and notifications       |
| `sample.ini`       | INI    | ~65     | Application settings with UI labels and messages    |
| `sample.env`       | ENV    | ~70     | Environment variables with application strings      |
| `edge-cases.json`  | JSON   | ~50     | Edge cases: unicode, emojis, special characters     |
| `large-sample.json`| JSON   | ~200+   | Large dataset for performance testing               |

**Total**: ~700+ strings across 8 files demonstrating comprehensive format coverage

---

## 🚀 Quick Start

### 1. Extract Strings from JSON

1. Open `sample/sample.json`
2. Run **Extract Strings** (`Cmd/Ctrl+Alt+E`)
3. See all user-visible strings extracted

### 2. Extract from YAML Configuration

1. Open `sample/sample.yaml`
2. Run **Extract Strings** (`Cmd/Ctrl+Alt+E`)
3. See strings from nested YAML structures

### 3. Extract from CSV Data

1. Open `sample/sample.csv`
2. Run **Extract Strings** (`Cmd/Ctrl+Alt+E`)
3. See text column values extracted

### 4. Test with Large File

1. Open `sample/large-sample.json`
2. Run **Extract Strings** (`Cmd/Ctrl+Alt+E`)
3. Test performance with 200+ strings

---

## 📁 File Details

### sample.json - JSON Application Strings

**Size**: ~2KB  
**Strings**: ~80  
**Purpose**: Standard JSON application strings

**Contents**:
- UI labels and buttons
- Validation messages
- Notifications
- Navigation items
- Error/success messages

**Best For**: Testing nested object extraction, array handling

---

### sample.yaml - YAML Configuration

**Size**: ~1.5KB  
**Strings**: ~60  
**Purpose**: Configuration file with localization

**Contents**:
- Application metadata
- UI theme strings
- Error messages
- Success notifications
- Content sections

**Best For**: Testing YAML parsing, nested structures

---

### sample.csv - CSV Product Data

**Size**: ~1KB  
**Strings**: ~100  
**Purpose**: Tabular data with text columns

**Contents**:
- Product names
- Descriptions
- Categories
- Status messages
- Multiple columns with strings

**Best For**: Testing CSV streaming, column extraction

---

### sample.toml - TOML Server Config

**Size**: ~1.8KB  
**Strings**: ~70  
**Purpose**: Server configuration strings

**Contents**:
- Application metadata
- Feature descriptions
- UI labels and placeholders
- Error and success messages
- Notification templates

**Best For**: Testing TOML parsing, section extraction

---

### sample.ini - INI Application Settings

**Size**: ~1.2KB  
**Strings**: ~65  
**Purpose**: Windows-style INI configuration

**Contents**:
- Application labels
- Dialog messages
- Menu items
- Validation messages
- Status texts

**Best For**: Testing INI section parsing

---

### sample.env - Environment Variables

**Size**: ~2KB  
**Strings**: ~70  
**Purpose**: Environment configuration strings

**Contents**:
- Application metadata
- User messages
- Email templates
- UI labels
- Validation and error messages

**Best For**: Testing .env parsing, key-value extraction

---

### edge-cases.json - Edge Cases

**Size**: ~1.5KB  
**Strings**: ~50  
**Purpose**: Boundary conditions and special cases

**Contents**:
- Empty strings
- Unicode characters (Chinese, Arabic, Hebrew)
- Emojis
- Very long strings
- Special characters
- Whitespace variations
- Escaped characters
- Mixed scripts

**Best For**: Testing robust parsing, unicode handling

---

### large-sample.json - Performance Testing

**Size**: ~4KB  
**Strings**: ~200+  
**Purpose**: Test performance with larger datasets

**Contents**:
- User arrays (10+ users)
- Product arrays (5+ products)
- Multiple message categories
- Translation objects (5 languages)
- Notification arrays
- Feature lists
- FAQ sections

**Best For**: Performance benchmarking, memory usage testing

---

## ⚙️ Configuration Test Cases

### Test 1: Basic Extraction (Default Settings)

**Goal**: Extract all strings in order  
**Steps**:
1. Open any sample file
2. Run **Extract Strings**
3. Verify all strings extracted
4. Check original order preserved

**Expected**: All user-visible strings, one per line, in original order

---

### Test 2: Deduplication Enabled

**Goal**: Remove duplicate strings  
**Settings**: `string-le.dedupeEnabled: true`  
**Steps**:
1. Open `sample.csv` (has duplicate categories)
2. Run **Extract Strings**
3. Verify duplicates removed

**Expected**: Only unique strings appear

---

### Test 3: Sort Alphabetically

**Goal**: Sort strings A-Z  
**Settings**: `string-le.sortEnabled: true`  
**Steps**:
1. Open any sample file
2. Run **Extract Strings**
3. Verify alphabetical ordering

**Expected**: Strings sorted A-Z, case-insensitive

---

### Test 4: CSV Streaming Mode

**Goal**: Test streaming for large CSV  
**Settings**: `string-le.csv.streamingEnabled: true`  
**Steps**:
1. Open `sample.csv`
2. Run **Extract Strings**
3. Select columns when prompted

**Expected**: Column selection dialog, then extraction

---

### Test 5: Side-by-Side Results

**Goal**: Open results beside source  
**Settings**: `string-le.openResultsSideBySide: true`  
**Steps**:
1. Open any sample file
2. Run **Extract Strings**
3. Verify split view

**Expected**: Source and results visible side-by-side

---

### Test 6: Copy to Clipboard

**Goal**: Auto-copy results  
**Settings**: `string-le.copyToClipboardEnabled: true`  
**Steps**:
1. Open any sample file
2. Run **Extract Strings**
3. Paste clipboard (Cmd/Ctrl+V)

**Expected**: Extracted strings in clipboard

---

### Test 7: Notification Levels

**Goal**: Test notification verbosity  
**Settings**: Try each:
- `string-le.notificationsLevel: "silent"` - No notifications
- `string-le.notificationsLevel: "important"` - Important only
- `string-le.notificationsLevel: "all"` - All messages

**Expected**: Notifications match configured level

---

### Test 8: Status Bar Integration

**Goal**: Test status bar functionality  
**Settings**: `string-le.statusBar.enabled: true`  
**Steps**:
1. Run **Extract Strings**
2. Check status bar (bottom right)
3. Verify count appears

**Expected**: Status bar shows extraction count

---

### Test 9: Trim Whitespace

**Goal**: Test whitespace trimming  
**Settings**: `string-le.trimWhitespace: true`  
**Steps**:
1. Open `edge-cases.json` (has whitespace strings)
2. Run **Extract Strings**
3. Verify trimmed output

**Expected**: Leading/trailing whitespace removed

---

### Test 10: Large File Handling

**Goal**: Test performance with large files  
**Settings**: Default  
**Steps**:
1. Open `large-sample.json`
2. Run **Extract Strings**
3. Measure extraction time

**Expected**: < 1 second for ~200 strings

---

## 🧪 Edge Cases & Error Scenarios

### Edge Case 1: Empty File

**File**: Create empty JSON file  
**Expected**: No strings found message

### Edge Case 2: No Strings

**File**: JSON with only numbers/booleans  
**Expected**: No strings found message

### Edge Case 3: Unicode Strings

**File**: `edge-cases.json` → unicode section  
**Expected**: All unicode characters preserved

### Edge Case 4: Emojis

**File**: `edge-cases.json` → emojis  
**Expected**: Emojis extracted and displayed

### Edge Case 5: Very Long Strings

**File**: `edge-cases.json` → very_long_string  
**Expected**: Full string extracted (no truncation)

### Edge Case 6: Empty Strings

**File**: `edge-cases.json` → empty_string  
**Expected**: Empty strings included (unless filtered)

### Edge Case 7: Whitespace Only

**File**: `edge-cases.json` → whitespace_only  
**Expected**: Extracted (unless trim enabled)

### Edge Case 8: Special Characters

**File**: `edge-cases.json` → special_chars  
**Expected**: All special characters preserved

### Edge Case 9: Mixed Scripts

**File**: `edge-cases.json` → mixed_scripts  
**Expected**: All scripts rendered correctly

### Edge Case 10: Deeply Nested JSON

**File**: `edge-cases.json` → nested  
**Expected**: Deep nesting handled correctly

---

## 📊 Performance Benchmarks

### Small Files (< 1KB)

- **All sample files**: ~50-80 strings
- **Expected**: < 100ms extraction

### Medium Files (1KB - 10KB)

- **large-sample.json**: ~200 strings
- **Expected**: < 500ms extraction

### Large Files (10KB - 100KB)

- Duplicate `large-sample.json` 10x
- **Expected**: < 2 seconds

### CSV Streaming

- Files > 10MB
- **Expected**: Streaming mode auto-activates
- **Performance**: Maintains < 2 sec regardless of size

---

## 🛠️ Troubleshooting

### Issue: No Strings Extracted

**Possible Causes**:
1. File type not supported
2. File contains only non-string data
3. Parse error

**Solution**:
- Verify file extension (.json, .yaml, .csv, .toml, .ini, .env)
- Check file contains string values
- Enable `string-le.showParseErrors: true`

---

### Issue: Performance Issues

**Possible Causes**:
1. Very large file (> 100MB)
2. Sorting/deduplication on large output

**Solution**:
- Enable CSV streaming: `string-le.csv.streamingEnabled: true`
- Disable sorting: `string-le.sortEnabled: false`
- Disable deduplication: `string-le.dedupeEnabled: false`

---

### Issue: Unexpected Strings

**Possible Causes**:
1. Numbers or IDs extracted as strings
2. Technical values extracted

**Solution**:
- This is expected behavior - all string values extracted
- Use deduplication to clean results
- Manually filter as needed

---

### Issue: Results Not Appearing

**Possible Causes**:
1. Extension not activated
2. VS Code error

**Solution**:
- Reload VS Code: **Developer: Reload Window**
- Check Output panel → "String-LE"
- Enable telemetry for detailed logs

---

## 💡 Best Practices

### 1. Use Deduplication for Locale Files

```json
{
  "string-le.dedupeEnabled": true,
  "string-le.sortEnabled": true
}
```

✓ Removes duplicate translations  
✓ Alphabetical organization

### 2. Enable CSV Streaming for Large Files

```json
{
  "string-le.csv.streamingEnabled": true
}
```

✓ Prevents memory issues  
✓ Faster processing

### 3. Use Side-by-Side for Review

```json
{
  "string-le.openResultsSideBySide": true
}
```

✓ Compare source and results  
✓ Quick verification

### 4. Trim Whitespace for Clean Output

```json
{
  "string-le.trimWhitespace": true
}
```

✓ Cleaner results  
✓ Better for translation files

### 5. Enable Safety Checks

```json
{
  "string-le.safety.enabled": true
}
```

✓ Prevents performance issues  
✓ Warns before large operations

---

## 🎯 Recommended Workflows

### For i18n/Localization

1. Open locale file (`en.json`, `messages.yaml`)
2. Enable dedupe and sort
3. Run **Extract Strings**
4. Export to translation tool
5. Verify all strings present

### For Content Audit

1. Open content file
2. Enable dedupe
3. Run **Extract Strings**
4. Review for:
   - Inconsistent terminology
   - Spelling errors
   - Duplicate content
   - Missing translations

### For API Response Analysis

1. Open API response JSON
2. Run **Extract Strings**
3. Analyze user-facing messages
4. Verify error messages
5. Check for sensitive data

### For CSV Data Analysis

1. Open CSV file
2. Enable streaming (if large)
3. Run **Extract Strings**
4. Select text columns only
5. Analyze text content

---

## 🚀 Next Steps

1. **Try all sample files** - Get familiar with different formats
2. **Experiment with settings** - Test configurations
3. **Create your own test files** - Add from your projects
4. **Report issues** - [Open an issue](https://github.com/nolindnaidoo/string-le/issues)
5. **Share feedback** - Rate on [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nolindnaidoo.string-le)

---

## 📚 Additional Resources

- **README**: Complete feature documentation
- **CONFIGURATION.md**: Detailed settings guide
- **TROUBLESHOOTING.md**: Common issues and solutions
- **PERFORMANCE.md**: Performance tips and benchmarks

---

**Need Help?** Check [GitHub Issues](https://github.com/nolindnaidoo/string-le/issues) or open a new issue.

**Found a bug?** Report with:
1. Sample file (or minimal reproduction)
2. Expected behavior
3. Actual behavior
4. String-LE version
5. VS Code version

---

Copyright © 2025 @nolindnaidoo. All rights reserved.

