import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

class NewChannelElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},

    };
  }

  constructor() {
    super();
    this.something = "New Channel Element"
  }

  render(){
    return html`
    <h4>${this.something}</h4>
    <button @click=${this.newChannel}>New Channel</button>
    `;
  }


newChannel(){
  console.log("new channel")
  this.agent.send("Dialog", {action : "toggle", params: {action:"newChannel"}})

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
          app.webIdChanged(message.webId)
          break;
          default:
          console.log("Unknown action ",message)
        }
      }
    };
  }

  webIdChanged(webId){
    this.webId = webId
    if (webId != null){
      this.updateProfile();
    }else{

    }
  }

}

customElements.define('new-channel-element', NewChannelElement);
