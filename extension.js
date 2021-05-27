// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const unitLookup = {
  fontSizes: 'px',
  space: 'px',
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "themepreview" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'themepreview.previewTheme',
    function () {
      const configuration = vscode.workspace.getConfiguration('themePreview');
      let theme;
      if (configuration.theme) {
        let themeConfigurationString = configuration.theme;
        themeConfigurationString = themeConfigurationString.replace(
          'colors,',
          ''
        );
        themeConfigurationString = themeConfigurationString.replace(
          'contrastingColors: mapValues(colors, findContrastingColor),',
          ''
        );
        theme = eval(`(${themeConfigurationString})`);
      } else {
        theme = {};
        vscode.window.showInformationMessage(
          'No theme found. Please configure one in your user settings.'
        );
      }

      const tokens = Object.keys(theme);
      const expandedTheme = [];
      tokens.forEach((t) => {
        const unit = unitLookup[t] || '';
        console.log(t, unit);
        const tokenList = theme[t];
        if (Array.isArray(tokenList)) {
          tokenList.forEach((tokenAtIndex, idx) => {
            expandedTheme.push({
              label: `${tokenAtIndex.toString()}${unit}`,
              description: `${t}[${idx}]`,
            });
          });
        } else if (typeof tokenList === 'object' && tokenList !== null) {
          Object.keys(tokenList).forEach((tokenKey) => {
            const tokenAtKey = tokenList[tokenKey];
            expandedTheme.push({
              label: `${tokenAtKey.toString()}${unit}`,
              description: `${t}.${tokenKey}`,
            });
          });
        }
      });

      if (expandedTheme.length) {
        vscode.window.showQuickPick(expandedTheme, {
          matchOnDescription: true,
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
