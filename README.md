# CodeFrame

📸 **CodeFrame** is your go-to extension for creating stunning screenshots of your code directly within Visual Studio Code. Whether you're sharing snippets with your team, showcasing your work, or creating content for blogs and tutorials, CodeFrame makes it effortless and beautiful.

## Features

- **Quick and Easy Screenshots**: Capture your code snippets in seconds.
- **Clipboard Integration**: Copy screenshots directly to your clipboard for instant sharing.
- **Customizable Appearance**: Adjust background color, padding, shadows, and more to match your style.
- **Line Numbers**: Optionally include line numbers for better context.
- **Window Controls**: Add OS X-style window buttons and titles for a polished look.
- **Flexible Output**: Save screenshots to disk or copy them to the clipboard.

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

- **`codeframe.backgroundColor`**: The background color of the snippet's container. Example: `#ffffff` or `rgba(0,0,0,0.5)`.
- **`codeframe.boxShadow`**: The CSS box-shadow for the snippet. Example: `0px 4px 6px rgba(0,0,0,0.1)`.
- **`codeframe.containerPadding`**: The padding for the snippet's container. Example: `16px` or `1em`.
- **`codeframe.roundedCorners`**: Use rounded corners (`true`) or square corners (`false`).
- **`codeframe.showWindowControls`**: Show or hide OS X-style window buttons (`true` or `false`).
- **`codeframe.showWindowTitle`**: Show or hide the window title (`true` or `false`).
- **`codeframe.showLineNumbers`**: Show or hide line numbers (`true` or `false`).
- **`codeframe.realLineNumbers`**: Start from the real line number of the file instead of 1 (`true` or `false`).
- **`codeframe.transparentBackground`**: Use a transparent background when taking the screenshot (`true` or `false`).
- **`codeframe.target`**: Either `container` to take the screenshot with the container, or `window` to only take the window.
- **`codeframe.shutterAction`**: Either `save` to save the screenshot into a file, or `copy` to copy the screenshot into the clipboard.

## Acknowledgements

The great [Polacode](https://github.com/octref/polacode), for the initial concept and inspiration for creating code screenshots.

[Carbon](https://carbon.now.sh/) for its elegant design and feature ideas.

