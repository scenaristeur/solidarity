import { LitElement, html, css } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

import './friend-element.js'

class FriendsElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      friendsWebIds: {type: Array},
      something: {type: String},
      webId: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "Friends"
    this.friendsWebIds = []
    this.webId = null
  }

  static get styles() {
    //https://lit-element.readthedocs.io/en/v0.6.5/_guide/styles/
    return css`
    /* Selects the host element */
    :host, .row{
      background-color: rgba(255, 255, 128, .5);
    }
    `;
  }
  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <!--<style>
    :host, .row{
    background-color: rgba(255, 255, 128, .5);
  }

  </style>-->
  <b>${this.something}</b>

  <div class = "row">
  ${this.friendsWebIds.map((fwi,index) => html`
    <div class = "col">
    <friend-element .webId='${fwi}' name="Friend${index}"><friend-element>
    </div>
    `
  )}
  </div>
  `;
}

firstUpdated(){
  var app = this;
  this.agent = new HelloAgent(this.name);
  this.agent.receive = function(from, message) {
  //  console.log("messah",message)
    if (message.hasOwnProperty("action")){
    //  console.log(message)
      switch(message.action) {
        case "webIdChanged":
        app.webIdChanged(message.webId)
        break;
        default:
        console.log("Unknown action ",message)
      }
    }
  };
}

async webIdChanged(webId){
  this.webId = webId
  if (webId != null){
    this.friendsWebIds = []
    for await (const friend of data.user.friends){
      this.friendsWebIds = [... this.friendsWebIds, friend]
    }
  }else{
    this.friendsWebIds = []
  }
}


}

customElements.define('friends-element', FriendsElement);
