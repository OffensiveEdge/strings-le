"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextEdit = exports.TextEditorEdit = exports.StatusBarAlignment = exports.Position = exports.Range = exports.CancellationToken = exports.ProgressLocation = exports.CodeActionKind = exports.languages = exports.mockExtensionContext = exports.ViewColumn = exports.commands = exports.window = exports.workspace = exports.Uri = void 0;
const vitest_1 = require("vitest");
exports.Uri = {
    file: vitest_1.vi.fn((path) => ({
        fsPath: path,
        path,
        scheme: "file",
        toString: () => `file://${path}`,
    })),
    parse: vitest_1.vi.fn((str) => ({
        fsPath: str.replace("file://", ""),
        path: str.replace("file://", ""),
        scheme: "file",
        toString: () => str,
    })),
};
exports.workspace = {
    getConfiguration: vitest_1.vi.fn(() => ({
        get: vitest_1.vi.fn(),
        update: vitest_1.vi.fn(),
        has: vitest_1.vi.fn(),
    })),
    openTextDocument: vitest_1.vi.fn(),
    applyEdit: vitest_1.vi.fn(),
    createFileSystemWatcher: vitest_1.vi.fn(() => ({
        onDidCreate: vitest_1.vi.fn(),
        onDidDelete: vitest_1.vi.fn(),
        onDidChange: vitest_1.vi.fn(),
        dispose: vitest_1.vi.fn(),
    })),
    workspaceFolders: [
        {
            uri: exports.Uri.file("/root/folder"),
            name: "test-workspace",
            index: 0,
        },
    ],
    env: {
        clipboard: {
            writeText: vitest_1.vi.fn(),
        },
    },
    onDidChangeConfiguration: vitest_1.vi.fn(() => ({
        dispose: vitest_1.vi.fn(),
    })),
};
exports.window = {
    activeTextEditor: undefined,
    showInformationMessage: vitest_1.vi.fn(),
    showWarningMessage: vitest_1.vi.fn(),
    showErrorMessage: vitest_1.vi.fn(),
    showQuickPick: vitest_1.vi.fn().mockResolvedValue(undefined),
    showTextDocument: vitest_1.vi.fn(),
    withProgress: vitest_1.vi.fn((options, task) => task({}, exports.CancellationToken.None)),
    setStatusBarMessage: vitest_1.vi.fn(),
    createStatusBarItem: vitest_1.vi.fn(() => ({
        show: vitest_1.vi.fn(),
        hide: vitest_1.vi.fn(),
        dispose: vitest_1.vi.fn(),
    })),
    createOutputChannel: vitest_1.vi.fn(() => ({
        appendLine: vitest_1.vi.fn(),
        show: vitest_1.vi.fn(),
        dispose: vitest_1.vi.fn(),
    })),
};
exports.commands = {
    registerCommand: vitest_1.vi.fn(),
    executeCommand: vitest_1.vi.fn(),
};
exports.ViewColumn = {
    One: 1,
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Active: -1,
    Beside: -2,
};
exports.mockExtensionContext = {
    subscriptions: {
        push: vitest_1.vi.fn(),
    },
};
exports.languages = {
    registerCodeActionsProvider: vitest_1.vi.fn(),
};
exports.CodeActionKind = {
    QuickFix: "quickfix",
    Refactor: "refactor",
    Source: "source",
    Empty: "",
};
exports.ProgressLocation = {
    SourceControl: 1,
    Window: 10,
    Notification: 15,
};
exports.CancellationToken = {
    None: {
        isCancellationRequested: false,
        onCancellationRequested: vitest_1.vi.fn(),
    },
};
exports.Range = vitest_1.vi.fn((startLine, startChar, endLine, endChar) => ({
    start: { line: startLine, character: startChar },
    end: { line: endLine, character: endChar },
}));
exports.Range.create = vitest_1.vi.fn();
exports.Position = {
    create: vitest_1.vi.fn(),
};
exports.StatusBarAlignment = {
    Left: 1,
    Right: 2,
};
exports.TextEditorEdit = vitest_1.vi.fn();
exports.TextEdit = {
    replace: vitest_1.vi.fn(),
    insert: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn(),
};
// Mock for editor.edit functionality
const mockEdit = vitest_1.vi.fn((callback) => {
    const edit = {
        replace: vitest_1.vi.fn(),
        insert: vitest_1.vi.fn(),
        delete: vitest_1.vi.fn(),
    };
    callback(edit);
    return Promise.resolve(true);
});
// Mock document positionAt function
const mockPositionAt = vitest_1.vi.fn((offset) => ({
    line: Math.floor(offset / 10), // Simple mock calculation
    character: offset % 10,
}));
