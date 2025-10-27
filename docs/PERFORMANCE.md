# Stringle Performance Test Results

**Test Environment:**
- Node.js: v24.3.0
- Platform: darwin arm64
- Date: 2025-10-15T18:17:34.664Z

## Summary

- **Total Files Tested:** 5
- **Total Extraction Time:** 264.04ms
- **Average Extraction Time:** 52.81ms
- **Fastest Format:** ENV
- **Slowest Format:** JSON

## Detailed Results

| Format | File | Size | Lines | Time (ms) | Extracted | Lines/sec | MB/sec | Memory (MB) |
|--------|------|------|-------|-----------|-----------|-----------|--------|-----------|
| JSON | 100kb.json | 0.13MB | 5,362 | 1.14 | 2,144 | 4,703,509 | 114.73 | 0 |
| ENV | 5k.env | 0.01MB | 332 | 0.29 | 331 | 1,144,828 | 34.44 | 0 |
| JSON | 1mb.json | 1.31MB | 53,682 | 8.47 | 21,472 | 6,337,898 | 154.62 | 0 |
| JSON | 5mb.json | 6.55MB | 268,402 | 43.42 | 107,360 | 6,181,529 | 150.82 | 0 |
| JSON | 20mb.json | 26.19MB | 1,073,642 | 210.72 | 429,456 | 5,095,112 | 124.31 | 0 |

## Performance Analysis

**JSON:** Average 65.94ms extraction time, 140,108 strings extracted on average.

**ENV:** Average 0.29ms extraction time, 331 strings extracted on average.