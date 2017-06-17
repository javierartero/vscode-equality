'use strict';

import * as vscode from 'vscode';

import * as faker from 'faker';
import {Help} from './help';

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
    const editor = vscode.window.activeTextEditor;

    editor.edit((edit) => {
        for(let selection of editor.selections){

            let
                position = selection.active,
                lineText = editor.document.lineAt(selection.end.line).text,
                result,
                equalPosition = lineText.lastIndexOf(equal);

            if(equalPosition > -1){
                let
                    contentSelection = new vscode.Selection(
                        position.line, equalPosition,
                        position.line, position.character
                    ),
                    contentText = editor.document.getText(contentSelection);

                if(contentText.length > 3 && (result = evaluate(contentText))){
                    edit.replace(contentSelection, String(result));
                }
            }
        }
    });

    return "😎 Hi neo welcome to matrix";
}

function evaluate(str){
    try {
        let evalue = eval(str.substr(1));
        console.log(typeof(evalue));
        if(typeof(evalue) == 'function'){
            evalue = eval(str.replace(/\s/g,'').substr(1)+'()');
        }
        if(typeof(evalue) == 'object') {
            let help = new Help(str, '🤖 Are you calling an object, do you want help?');
            return false;
        }
        if(typeof(evalue) == 'undefined') {
            let help = new Help(str, "I can't evaluate this 😅");
            return false;
        }
        return evalue;
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.warn(e.message);
        }
        let help = new Help(str, "I can't evaluate this 😅");
        return false;
    }
}

let help = () => {
    new Help('all');
    return false;
}

let rand = (min:number = 0, max:number = 100) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function deactivate() {
    console.log('OPS, your extension "EQUALITY" is not active!');
}
