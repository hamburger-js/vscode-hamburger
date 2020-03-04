const vscode = require("vscode");
const { bootstrapTheme } = require("./mock");

function getThemeList(componentType) {
  if (!(componentType in bootstrapTheme)) return;
  if (!bootstrapTheme[componentType].variant) return;

  const result = [];
  for (const variant in bootstrapTheme[componentType].variant) {
    result.push({
      label: variant,
      kind: vscode.CompletionItemKind.Property,
      insertText: `"${variant}"`,
      documentation: variant
    });
  }
  return result;
}

module.exports = getThemeList;
