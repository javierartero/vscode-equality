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

  constructor(error:string, defaultMessage:string = 'equality documentation 🤓') {
		this.error = error;
    this.defaultMessage = defaultMessage;
    this.errors = [
      new Error("vscode", "View docs vscode",
       "https://code.visualstudio.com/docs/extensionAPI/vscode-api"),
      new Error("faker", "View docs faker.js",
       "https://github.com/marak/Faker.js/"),
      new Error("e.", "View equality custom variables",
       "https://github.com/javierartero/equality"),
      new Error("=", this.defaultMessage,
       "https://github.com/javierartero/equality")
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
