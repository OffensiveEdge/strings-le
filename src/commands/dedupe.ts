import * as vscode from "vscode";
import * as nls from "vscode-nls";
import { dedupe } from "../utils/text";
import { processAndOutput } from "./postProcessHelper";

const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

export function registerDedupeCommand(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "string-le.postProcess.dedupe",
      async (): Promise<void> => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          vscode.window.showWarningMessage(
            localize("runtime.message.error.no-editor", "No active editor")
          );
          return;
        }
        const values = editor.document.getText().split(/\r?\n/);
        const processed = dedupe(values).join("\n");
        const success = await processAndOutput(editor, processed);
        if (success) {
          vscode.window.showInformationMessage(
            localize("runtime.status.postprocess", "Dedupe/sort applied")
          );
        }
      }
    )
  );
}
