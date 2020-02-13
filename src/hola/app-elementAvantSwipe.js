import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

import './main-element.js'
import './side-element.js'
//import './inbox-element.js'
//import './contacts-element.js'
//import './login-element.js'
import './dialog-element.js'
//import './chats-element.js'

class AppElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      tab: {type: String},
      messagesLength: {type: Number},
      webId: {type: String},
      fullname: {type: String},
      img: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "Flow Element"
    this.tab = "main"
    this.messagesLength = 0
    this.webId = null
    this.fullname = ""
    this.img = null
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/hola.css" rel="stylesheet">

    <div class="row p-3">

    <div class="col-1 shadow-sm btn-group-vertical d-none d-sm-block"  style="height:30vh;text-align:left">
    <button type="button"
    class="btn mt-1 border-10 border-right-0 border-top-0 border-bottom-0"
    style="color:purple;border-color:purple;text-align:left"
    tab="main" @click=${this.changeTab}>
    <i class="fas fa-users" tab="main"></i>
    <span style="vertical-align:1px" tab="main">Chatter</span></button>
    <button type="button"
    class="btn mt-1 border-10 border-danger border-right-0 border-top-0 border-bottom-0 text-danger"
    tab="main" @click=${this.changeTab}
    style="text-align:left">
    <i class="fas fa-comment-alt" tab="main"></i>
    <span style="vertical-align:1px" tab="main">Chat</span></button>
    <button type="button"
    class="btn mt-1 border-10 border-success border-right-0 border-top-0 border-bottom-0 text-success"
    tab="inbox" @click=${this.changeTab}
    style="text-align:left">
    <i class="fas fa-envelope" tab="inbox"></i> <span style="vertical-align:1px" tab="inbox">Inbox</span>
    <span class="badge badge-light" ?hidden="${this.messagesLength == 0}" tab="inbox">${this.messagesLength}</span>
    </button>
  <!--  <chats-element name="Chats"></chats-element>-->
    </div>



    <div class="col shadow-sm p-3 m-1" style="height:80vh">
    <main-element ?hidden="${this.tab != 'main'}" name="Main"></main-element>
<!--    <inbox-element ?hidden="${this.tab != 'inbox'}" name="Inbox"></inbox-element>-->
    </div>

    <div class="col-4 shadow-sm p-3  m-1" >
    <side-element ?hidden="${this.tab != 'main'}" name="Side"></side-element>
  <!--  <contacts-element ?hidden="${this.tab != 'inbox'}" name="Contacts"></contacts-element>-->
    </div>

    <dialog-element name="Dialog"></dialog-element>

    </div>

    `;
  }


  changeTab(e){
    this.tab = e.target.getAttribute("tab")
    //  console.log(this.tab)
  }


  firstUpdated(){
    var app = this;
    this.agent = new HelloAgent(this.name);
    console.log(this.agent)
    this.agent.receive = function(from, message) {
      //  console.log("messah",message)
      if (message.hasOwnProperty("action")){
        //  console.log(message)
        switch(message.action) {
          case "webIdChanged":
          app.webIdChanged(message)
          break;
          case "updateInboxBtn":
          app.updateInboxBtn(message.messagesLength)
          break;
          default:
          console.log("Unknown action ",message)
        }
      }
    };
  }

  updateInboxBtn(ml){
    this.messagesLength = ml
  }

  webIdChanged(mess){
    this.webId = mess.webId
    this.fullname = mess.fullname
    this.img = mess.img
    console.log(mess)
  }


}

customElements.define('app-element', AppElement);
