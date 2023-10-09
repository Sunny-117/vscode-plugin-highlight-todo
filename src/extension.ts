import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "highlight-todo" is now active!');

	let disposable = vscode.workspace.onDidOpenTextDocument((document)=>{
		console.log(document, 'document');
		highlightTodos(document);
	});

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
