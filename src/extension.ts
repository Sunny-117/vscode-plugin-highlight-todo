// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "highlight-todo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.workspace.onDidOpenTextDocument((document)=>{
		console.log(document, 'document')
		highlightTodos(document)
	})

	context.subscriptions.push(disposable);
}

function highlightTodos(document: vscode.TextDocument) {

	const text = document.getText();
    const todoRegex = /\/\/.*?(TODO|FIXME|XXX):/g;
    const decorations: vscode.DecorationOptions[] = [];

    let match;
    while ((match = todoRegex.exec(text)) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);

        const decoration = {
            range: new vscode.Range(startPos, endPos),
            hoverMessage: 'Todo comment: ' + match[0],
        };

        decorations.push(decoration);
    }

    const decorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(255, 255, 0, 0.2)',
    });

    vscode.window.activeTextEditor?.setDecorations(decorationType, decorations);
}
