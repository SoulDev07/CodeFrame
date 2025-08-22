# CodeFrame

📸 **CodeFrame** is your go-to extension for creating stunning screenshots of your code directly within Visual Studio Code. Whether you're sharing snippets with your team, showcasing your work, or creating content for blogs and tutorials, CodeFrame makes it effortless and beautiful.

## Features

- **Quick and Easy Screenshots**: Capture your code snippets in seconds.
- **Clipboard Integration**: Copy screenshots directly to your clipboard for instant sharing.
- **Customizable Appearance**: Adjust background color, padding, shadows, and more to match your style.
- **Line Numbers**: Optionally include line numbers for better context.
- **Window Controls**: Add macOS style window buttons and titles for a polished look.
- **Flexible Output**: Save screenshots to disk or copy them to the clipboard.
- **External CSS Support**: Use a custom CSS file to style the snippet container (backgrounds, gradients, images and more).

## Getting Started

1. **Install CodeFrame**: Search for "CodeFrame" in the VS Code Extensions Marketplace and click "Install."
2. **Activate CodeFrame**: Open the command palette (Ctrl+Shift+P on Windows/Linux, Cmd+Shift+P on macOS) and search for `CodeFrame`.
3. **Select Your Code**: Highlight the code you want to capture.
4. **Capture the Screenshot**: Adjust settings if needed, then click the shutter button to save or copy your screenshot.

## Usage Instructions

1. Open the command palette (Ctrl+Shift+P on Windows/Linux, Cmd+Shift+P on macOS) and search for `CodeFrame`.
2. Select the code you'd like to screenshot.
3. Adjust the width of the screenshot if desired.
4. Click the shutter button to save the screenshot to your disk or copy it to your clipboard.

**Tips**:

- Start CodeFrame by selecting code, right-clicking, and choosing CodeFrame.
- Bind CodeFrame to a hotkey by opening your keyboard shortcut settings and assigning a custom keybinding to `codeframe.start`.
- To copy to clipboard instead of saving, click the image and press the copy keyboard shortcut (Ctrl+C on Windows/Linux, Cmd+C on macOS), or set `codeframe.shutterAction` to `copy` in your settings.

## Examples

[Material Theme](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme) + [Operator Mono](https://www.typography.com/fonts/operator/styles/operatormono)

![Example 1](https://raw.githubusercontent.com/SoulDev07/CodeFrame/main/examples/material_operator-mono.png)

[Nord](https://github.com/arcticicestudio/nord-visual-studio-code) + [Cascadia Code](https://github.com/microsoft/cascadia-code)

![Example 2](https://raw.githubusercontent.com/SoulDev07/CodeFrame/main/examples/nord_cascadia-code.png)

Monokai + [Fira Code](https://github.com/tonsky/FiraCode)

![Example 3](https://raw.githubusercontent.com/SoulDev07/CodeFrame/main/examples/monokai_fira-code.png)

## Configuration

CodeFrame is highly configurable. Here's a list of settings you can change to tune the way your screenshots look:

### Background

- `useExternalCss` (boolean, default: `false`) - When true, CodeFrame will load an external CSS file and apply it. This allows complex backgrounds and full CSS control over the container.
- `externalCssPath` (string, default: `""`) - Path to the external CSS file to apply when `useExternalCss` is enabled. Accepts absolute paths or workspace-relative paths.
- `backgroundColor` (string, default: `#abb8c3`) - Fallback background color for the snippet container (used when `useExternalCss` is `false`). Examples: `#ffffff`, `rgba(0,0,0,0.5)`.
- `transparentBackground` (boolean, default: `false`) - When true, the snapshot will use a transparent background (where supported).

Note: When `useExternalCss` is enabled, the external CSS takes precedence over `backgroundColor`.

### Container

- `boxShadow` (string, default: `rgba(0, 0, 0, 0.55) 0px 20px 68px`) - The CSS `box-shadow` applied to the snippet container.
- `containerPadding` (string, default: `3em`) - Padding around the snippet content. Examples: `16px`, `1em`, `3em`.
- `roundedCorners` (boolean, default: `true`) - Use rounded corners for the window/container.
- `showWindowControls` (boolean, default: `true`) - Display macOS style window buttons (close, minimize, maximize).
- `showWindowTitle` (boolean, default: `false`) - Show a window title with the open folder or file name.

### Code

- `showLineNumbers` (boolean, default: `true`) - Display line numbers inside the snippet.
- `realLineNumbers` (boolean, default: `false`) - Start line numbering from the real file line number instead of 1.

### Action

- `target` (string, default: `container`) - Either `container` to capture the snippet including the container or `window` to capture just the window area.
- `shutterAction` (string, default: `save`) - Behavior of the shutter button: `save` writes the image to disk, `copy` copies the image to the clipboard.

## Acknowledgements

The great [Polacode](https://github.com/octref/polacode), for the initial concept and inspiration for creating code screenshots.

[Carbon](https://carbon.now.sh/) for its elegant design and feature inspiration.

Special thanks to [Kufii](https://github.com/kufii) for developing the [CodeSnap](https://github.com/kufii/CodeSnap) extension.
