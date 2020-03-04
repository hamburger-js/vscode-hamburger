const vscode = require("vscode");
const getThemeList = require("./providers/themeProvider");

/**
 *  1. Text().theme(                          普通
 *  2. Text("srerer").theme(                  普通2
 *  3. Text("123").color("red").theme(        链式
 *  4. Button().color(), Text().theme(        叠加
 *  5. Text(Link().theme("sss")).theme(       内嵌
 *  4. Text()                                 换行
 *      .theme(
 *  all return "Text"
 */
// Todo
function getElementName(content) {
  const regex = /[A-Z][a-z]*\(/g;
  const found = content.match(regex);
  if (found && found.length >= 1)
    return found[found.length - 1].replace("(", "");
}

function provideCompletionItems(document, position) {
  // 尝试使用识别前置内容，来自动给出建议

  let linePrefix = document.lineAt(position).text.substr(0, position.character);

  if (linePrefix.endsWith("theme(")) {
    const elementName = getElementName(linePrefix);
    console.log(elementName);
    return getThemeList(elementName.toLowerCase());
  } else if (linePrefix.endsWith("fontSize(")) {
    return [
      { label: "small", kind: vscode.CompletionItemKind.Property },
      { label: "large", kind: vscode.CompletionItemKind.Property }
    ];
  } else {
    return undefined;
  }
}

module.exports = provideCompletionItems;
