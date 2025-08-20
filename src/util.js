'use strict';

const vscode = require('vscode');
const path = require('path');
const { homedir } = require('os');
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
 * Read and resolve an external CSS file when enabled in config.
 *
 * @param {Object} cfg - Config with `useExternalCss` and `externalCssPath`.
 * @returns {Promise<{externalCss:string|null, externalCssError:string|null, externalCssResolvedPath:string|null}>}
 */
const readExternalCss = async (cfg) => {
  if (cfg.useExternalCss && cfg.externalCssPath) {
    try {
      const resolved = cfg.externalCssPath.startsWith('~')
        ? path.resolve(homedir(), cfg.externalCssPath.slice(1))
        : path.isAbsolute(cfg.externalCssPath)
          ? cfg.externalCssPath
          : path.resolve(
              vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || process.cwd(),
              cfg.externalCssPath
            );

      const css = await readFile(resolved, 'utf8');

      return {
        externalCss: css,
        externalCssError: null,
        externalCssResolvedPath: resolved
      };
    } catch (e) {
      const attempted = typeof resolved !== 'undefined' ? resolved : null;
      return {
        externalCss: null,
        externalCssError: String(e),
        externalCssResolvedPath: attempted
      };
    }
  }

  return { externalCss: null, externalCssError: null, externalCssResolvedPath: null };
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

module.exports = { readHtml, readExternalCss, getSettings, writeFile };
