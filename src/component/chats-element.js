import { LitElement, html } from 'lit-element';
import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

class ChatsElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      webId: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "ChatsElement"
  }

  render(){
    return html`
    <b>${this.something}</b>

    <ul>
    <li> bla bla</li>
    <li> bla bla</li>
    <li> bla bla</li>
    <li> bla bla</li>


    </ul>
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

    }else{

    }
  }


}

customElements.define('chats-element', ChatsElement);
