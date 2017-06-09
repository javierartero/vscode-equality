'use strict';

import * as vscode from 'vscode';

import * as faker from 'faker';

const
    config = vscode.workspace.getConfiguration(),
    e = config.get('equality.vars'),
    equal = String(config.get('equality.symbol'));

    faker.locale = String(config.get('faker.locale'));

export function activate() {
	console.log('Congratulations, your extension "EQUALITY" is now active!');
	vscode.commands.registerCommand('extension.equality', equality);
}

function equality(){
    const
        editor = vscode.window.activeTextEditor;

    var
        position = editor.selection.active,
        lineText = editor.document.getText(
            new vscode.Selection(
                position.line, 0,
                position.line, position.character
            )
        ),
        result,
        equalPosition = lineText.lastIndexOf(equal);

    if(equalPosition > -1 && lineText.length > 3){
        var
            contentSelection = new vscode.Selection(
                position.line, equalPosition,
                position.line, position.character
            ),
            contentText = editor.document.getText(contentSelection);

        if(result = evaluate(contentText)){
            editor.edit(function (edit) {
                edit.replace(contentSelection, String(result));
            });
        }
    }

    return "😎 Hi neo welcome to matrix";
}

function evaluate(str){
    try {
        let evalue = eval(str.substr(1));

        if(typeof(evalue) == 'object') {
            console.log(evalue)
            vscode.window.showInputBox({prompt: 'Are you calling an object,'+
            'do you want help about the plugin?'})
                .then(function(val){
                    let v = val.toLowerCase();
                    if(v.includes('yes') || v == 'y' ) {
                        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://github.com/javierartero/equality'));
                    }
                });
            return false;
        }

        return evalue;
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.warn(e.message);
        }
        return "I can not evaluate this 😅";
    }
}

export function deactivate() {
    console.log('OPS, your extension "EQUALITY" is not active!');
}
