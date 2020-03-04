// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "hamburger-js-support" is now active!'
  );

  // Playground START

  vscode.languages.registerCompletionItemProvider(
    "javascript",
    {
      provideCompletionItems(document, position) {
        return [
          {
            label: "Text",
            insertText: new vscode.SnippetString(
              "Good ${1|morning,afternoon,evening|}. It is ${1}, right?"
            )
          },
          { label: "VStack", insertText: "color(" }
        ];
      }
    },
    "."
  );

  vscode.languages.registerCompletionItemProvider(
    "javascript",
    {
      provideCompletionItems(document, position) {
        // 尝试使用识别前置内容，来自动给出建议

        let linePrefix = document
          .lineAt(position)
          .text.substr(0, position.character);

        console.log(linePrefix);

        if (linePrefix.endsWith("color(")) {
          console.log("here");
          return [
            {
              label: "themeColor",
              kind: vscode.CompletionItemKind.Color,
              insertText: `"themeColor"`,
              documentation: "#268785"
            }
          ];
        } else if (linePrefix.endsWith("fontSize(")) {
          return [
            { label: "small", kind: vscode.CompletionItemKind.Property },
            { label: "large", kind: vscode.CompletionItemKind.Property }
          ];
        } else {
          return undefined;
        }
      }
    },
    "("
  );

  vscode.languages.registerHoverProvider("javascript", {
    provideHover(document, position, token) {
      // console.log(position);
      return {
        contents: ["why", "something", "here"]
      };
    }
  });

  // END

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    function() {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
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
