'use strict';

const vscode = require('vscode');
const path = require('path');
const { homedir } = require('os');
const { readHtml, writeFile, getSettings } = require('./util');

/**
 * Retrieves the configuration settings for the CodeFrame extension.
 * Combines editor settings and extension-specific settings.
 * @returns {Object} Configuration object containing settings and metadata.
 */
const getConfig = () => {
  const editorSettings = getSettings('editor', ['fontLigatures', 'tabSize']);
  const editor = vscode.window.activeTextEditor;
  if (editor) editorSettings.tabSize = editor.options.tabSize;

  const extensionSettings = getSettings('codeframe', [
    'backgroundColor',
    'boxShadow',
    'containerPadding',
    'roundedCorners',
    'showWindowControls',
    'showWindowTitle',
    'showLineNumbers',
    'realLineNumbers',
    'transparentBackground',
    'target',
    'shutterAction'
  ]);

  const selection = editor?.selection;
  const startLine = extensionSettings.realLineNumbers ? (selection?.start.line ?? 0) : 0;

  let windowTitle = '';
  if (editor && extensionSettings.showWindowTitle) {
    const activeFileName = editor.document.uri.path.split('/').pop();
    windowTitle = `${vscode.workspace.name} - ${activeFileName}`;
  }

  return {
    ...editorSettings,
    ...extensionSettings,
    startLine,
    windowTitle
  };
};

/**
 * Creates a webview panel for the CodeFrame extension.
 * @param {vscode.ExtensionContext} context - The extension context.
 * @returns {Promise<vscode.WebviewPanel>} The created webview panel.
 */
const createPanel = async (context) => {
  const panel = vscode.window.createWebviewPanel(
    'codeframe',
    'CodeFrame 📸',
    { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
    {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(path.join(context.extensionPath, 'webview')),
        vscode.Uri.file(path.join(context.extensionPath, 'node_modules'))
      ]
    }
  );

  const htmlPath = path.join(context.extensionPath, 'webview', 'index.html');
  panel.webview.html = await readHtml(htmlPath, panel);

  return panel;
};

let lastUsedImageUri = vscode.Uri.file(path.resolve(homedir(), 'Desktop/code.png'));
const saveImage = async (data) => {
  const uri = await vscode.window.showSaveDialog({
    filters: { Images: ['png'] },
    defaultUri: lastUsedImageUri
  });
  lastUsedImageUri = uri;
  if (uri) await writeFile(uri.fsPath, Buffer.from(data, 'base64'));
};

const hasOneSelection = (selections) => selections?.length === 1 && !selections[0].isEmpty;

const runCommand = async (context) => {
  const panel = await createPanel(context);

  const update = async () => {
    await vscode.commands.executeCommand('editor.action.clipboardCopyWithSyntaxHighlightingAction');
    panel.webview.postMessage({ type: 'update', ...getConfig() });
  };

  const flash = () => panel.webview.postMessage({ type: 'flash' });

  panel.webview.onDidReceiveMessage(async ({ type, data }) => {
    if (type === 'save') {
      flash();
      await saveImage(data);
    } else {
      vscode.window.showErrorMessage(`CodeFrame 📸: Unknown shutterAction "${type}"`);
    }
  });

  const selectionHandler = vscode.window.onDidChangeTextEditorSelection(
    (e) => hasOneSelection(e.selections) && update()
  );
  panel.onDidDispose(() => selectionHandler.dispose());

  const editor = vscode.window.activeTextEditor;
  if (editor && hasOneSelection(editor.selections)) update();
};

exports.activate = (context) => {
  context.subscriptions.push(
    vscode.commands.registerCommand('codeframe.start', () => runCommand(context))
  );
};
