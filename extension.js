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
  let disposable = vscode.commands.registerCommand(
    'themereference.themeReference',
    function () {
      const configuration = vscode.workspace.getConfiguration('themeReference');
      const configurationThemeObject = configuration.themeObject;

      let theme;
      if (configurationThemeObject) {
        theme = eval(`(${configurationThemeObject})`);
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
