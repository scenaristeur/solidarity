import { LitElement, html } from 'lit-element';
import * as auth from 'solid-auth-client';
import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

class LoginElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      webId: {type: String},
      fullname: {type: String}
    };
  }

  constructor() {
    super();
    this.webId = null
    this.fullname = ""
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <!-- if this.webId == null , login button is diaplayed -->
    ${this.webId == null ?
      html`
      <button type="button" class="btn btn-primary" @click=${this.login}>Login</button>
      `
      : html`
      <!-- else logout button is displayed -->
      <button type="button" class="btn btn-primary" @click=${this.logout}>Logout</button>
      <span class="text-light bg-dark">${this.fullname}</span>
      `
    }
    `;
  }

  firstUpdated(){
    var app = this
    this.agent = new HelloAgent(this.name);
    auth.trackSession(async function(session) {
      if (!session){
        app.webId=null
        app.agent.send('Messages',  {action:"info", info:"Not logged"});

        app.agent.sendMulti(['App', /*'Friends',*/ 'Contacts', 'Inbox', 'Fab', 'PostDialog', 'Right', 'Chat'],  {action:"webIdChanged", webId: app.webId});
        app.fullname = ""
        //  this.agent.send('Chat',  {action:"webIdChanged", webId: this.webId});
        //  this.agent.send('Profile',  {action:"webIdChanged", webId: this.webId});
      }
      else{
        app.webId = session.webId
        app.agent.send('Messages',  {action:"info", info:"Login "+app.webId});
        app.agent.sendMulti(['App', /*'Friends',*/ 'Contacts', 'Inbox', 'Fab', 'PostDialog', 'Right', 'Chat'], {action:"webIdChanged", webId: app.webId});
        app.fullname = await data[app.webId].vcard$fn || app.webId.split("/")[2].split('.')[0];
        //  this.agent.send('Chat',  {action:"webIdChanged", webId: this.webId});
        //this.agent.send('Profile',  {action:"webIdChanged", webId: this.webId});
      }
    })
  }

  login(event) {
    this.popupLogin();
  }

  logout(event) {
    auth.logout().then(() => alert('Goodbye!'));
  }

  async popupLogin() {
    let session = await auth.currentSession();
    let popupUri = './dist-popup/popup.html';
    if (!session)
    session = await auth.popupLogin({ popupUri });
  }

}

customElements.define('login-element', LoginElement);
