'use strict';

import * as vscode from 'vscode';

class Error {
  constructor(public name: string,
              public message: string,
              public url: string){}
}

export class Help {
  private error: string;
  private defaultMessage: string;
  private errors:any;
  private equal: string = String(
    vscode.workspace.getConfiguration().get('equality.symbol'));


  constructor(error:string, defaultMessage:string = 'equality documentation 🤓') {
		this.error = error;
    this.defaultMessage = defaultMessage;
    this.errors = [
      new Error("vscode", "View docs vscode",
       "https://code.visualstudio.com/docs/extensionAPI/vscode-api"),
      new Error("faker", "View docs faker.js",
       "https://github.com/marak/Faker.js/"),
      new Error(this.equal+"e.", "View equality custom variables",
       "https://github.com/javierartero/vscode-equality#custom-vars"),
      new Error("rand", "View equality rand",
       "https://github.com/javierartero/vscode-equality#rand"),
      new Error("rgb", "View equality rgb",
       "https://github.com/javierartero/vscode-equality#rgb"),
      new Error("hex", "View equality hex",
       "https://github.com/javierartero/vscode-equality#hex"),
      new Error(this.equal, this.defaultMessage,
       "https://github.com/javierartero/vscode-equality")
    ];

    this.evalue();
	}

  private evalue() {
    console.log("evalue errors");
    let message = [];
    let url = [];

    if(this.error == 'all'){
      let errorsReverse = this.errors.reverse();
      for (let e of this.errors) {
        message.push(e.message);
        url.push(e.url);
      }
    }else{
      for (let e of this.errors) {
        if(this.error.includes(e.name)){
          message.push(e.message);
          url.push(e.url);
        }
      }
    }

    vscode.window.showQuickPick(message)
      .then(function(val){
        if(val && url){
          let index = message.indexOf(val);
          vscode.commands.executeCommand('vscode.open',
           vscode.Uri.parse(url[index]));
        }
      });
  }
}
