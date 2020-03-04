const provideCompletionItems = require("./src/intellisense");
const provideHover = require("./src/hover");
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */

const supportLanguages = [
  "typescript",
  "javascript",
  "typescriptreact",
  "javascriptreact"
];

function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)

  vscode.languages.registerCompletionItemProvider(
    supportLanguages,
    { provideCompletionItems },
    "("
  );
  vscode.languages.registerHoverProvider(supportLanguages, { provideHover });

  // END

  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    function() {
      vscode.window.showInformationMessage("Hello World!");
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
