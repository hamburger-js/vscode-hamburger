const { documents } = require("./providers/mock");
function isLetter(char) {
  return char.toUpperCase() !== char.toLowerCase();
}
function provideHover(document, position, token) {
  // console.log(position);
  let line = document.lineAt(position).text;
  let firstPos = position.character,
    lastPos = position.character;
  while (isLetter(line[firstPos])) firstPos--;
  while (isLetter(line[lastPos])) lastPos++;

  const target = line.substring(firstPos + 1, lastPos).toLowerCase();
  if (documents[target])
    return {
      contents: [documents[target]]
    };
}

module.exports = provideHover;
