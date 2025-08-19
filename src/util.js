'use strict';

const vscode = require('vscode');
const path = require('path');
const { readFile, writeFile } = require('fs').promises;

/**
 * Reads and processes an HTML file for use in a webview.
 * Replaces placeholders with appropriate values for the webview.
 * @param {string} htmlPath - The path to the HTML file.
 * @param {vscode.WebviewPanel} panel - The webview panel.
 * @returns {Promise<string>} The processed HTML content.
 */
const readHtml = async (htmlPath, panel) => {
  const htmlContent = await readFile(htmlPath, 'utf-8');

  const processedHtml = htmlContent
    .replace(/%CSP_SOURCE%/gu, panel.webview.cspSource)
    .replace(/(src|href)="([^"]*)"/gu, (_, type, src) => {
      const resourcePath = path.resolve(path.dirname(htmlPath), src);
      const webviewUri = panel.webview.asWebviewUri(vscode.Uri.file(resourcePath));
      return `${type}="${webviewUri}"`;
    });

  return processedHtml;
};

/**
 * Retrieves settings from the VS Code configuration.
 * Supports language-specific overrides.
 * @param {string} group - The configuration group (e.g., 'editor').
 * @param {string[]} keys - The keys to retrieve from the configuration.
 * @returns {Object} An object containing the requested settings.
 */
const getSettings = (group, keys) => {
  const settings = vscode.workspace.getConfiguration(group);
  const editor = vscode.window.activeTextEditor;
  const language = editor?.document?.languageId;
  const languageSettings = language
    ? vscode.workspace.getConfiguration(null).get(`[${language}]`)
    : null;

  return keys.reduce((acc, key) => {
    acc[key] = languageSettings?.[`${group}.${key}`] ?? settings.get(key);
    return acc;
  }, {});
};

module.exports = { readHtml, getSettings, writeFile };
