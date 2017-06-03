'use strict';

import * as vscode from 'vscode';


export function activate() {
	console.log('Congratulations, your extension "EQUALITY" is now active!');
	vscode.commands.registerCommand('extension.equality', equality);
}

function equality(){
    var
        editor = vscode.window.activeTextEditor,
        position = editor.selection.active,
        equal = '=',
        lineSelection = new vscode.Selection(
            position.line, 0,
            position.line, position.character
        ),
        lineText = editor.document.getText(lineSelection),
        equalPosition = lineText.lastIndexOf(equal);

    if(equalPosition){
        var
            contentSelection = new vscode.Selection( position.line,equalPosition,
                position.line, position.character),
            contentText = editor.document.getText(contentSelection),
            result = eval(contentText.substr(1));

        editor.edit(function (edit) {
            edit.replace(contentSelection, result);
            console.log(contentSelection);
            console.log(result);
        });
    }
}

export function deactivate() {
    console.log('OPS, your extension "EQUALITY" is not active!');
}
