import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    pool: "threads",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/coverage/**",
        "**/release/**",
        "**/docs/**",
        "**/*.config.*",
        "**/__mocks__/**",
        "**/test/**",
      ],
    },
    include: ["src/**/*.test.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "**/release/**",
      "**/docs/**",
      "**/__mocks__/**",
      "**/test/**",
    ],
  },
  resolve: {
    alias: {
      vscode: path.resolve(__dirname, "src/test-utils/vscode.mock.ts"),
    },
  },
});
