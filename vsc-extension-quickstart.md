# Getting started

## Installation
* Clone this repo
* In the Extensions tab, click the `…` menu and select `Install from .VSIX`
* Navigate to the file locally to install

## Setup
* In VSCode Settings (`Code > Preferences > Settings` or `cmd` + `,`), search for "Theme Reference"
* In the `Theme Object` field, paste your JSON object.
  * Each key must have a value. So, when copying the `theme` object from ThemeProvider.js, first delete the `colors` and `contrastingColors` keys since they don't have explicit values.
  * JSON objects can be lazily formatted, so object keys do not need quotes.

## Usage

* In VSCode, open the command palette (`shift` + `cmd` + `P`) and search for "Theme Reference"
* Search within the quick pick list to find a specific token