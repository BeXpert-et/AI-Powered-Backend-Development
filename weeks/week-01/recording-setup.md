# VS Code teaching setup

These lessons use two formats within a single VS Code workspace:

1. **Small snippets in Markdown** — runnable code chunks using [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced).
2. **Complete examples in JavaScript files** — run with the integrated terminal: `node examples/data-processing.js`.

## Prepare the workspace

1. Install a supported Node.js LTS release; verify with `node --version`.
2. Install VS Code and **Markdown Preview Enhanced** (extension ID `shd101wyy.markdown-preview-enhanced`).
3. Open this course folder as a *trusted workspace*, then open one of the lesson files.
4. Open **Markdown Preview Enhanced: Open Preview to the Side**.
5. In VS Code Settings, explicitly enable the extension's `markdown-preview-enhanced.enableScriptExecution` setting, and reload the preview if necessary.
6. Place the cursor in a code block marked `javascript {cmd="node"}`, then use **Shift+Enter** / **Markdown Preview Enhanced: Run Code Chunk**. Read the output in the preview.
7. For larger examples, use **Terminal > New Terminal** and run `node weeks/week-01/examples/data-processing.js` from the repository root.

## Security note

Executable Markdown runs programs on your computer. **Script execution is off by default for a reason.** Enable it only when working with trusted course material. Never run code chunks from an unknown Markdown file. Turn the setting off outside your recording environment.

The fenced examples are still legible in GitHub and in ordinary Markdown viewers; execution is specific to the VS Code extension. No online code runner or paid service is required.

## Recording arrangement

Keep the lesson Markdown preview and source open side by side. When the example grows beyond a short snippet, switch to the connected JavaScript file in the same VS Code window and explain how its functions work together.
