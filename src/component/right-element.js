import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

import './people-element.js'
//import './rooms-element.js'
//import './chats-element.js'
//import './profile-element.js'
import './messages-element.js'
//import './friends-element.js'
import './inbox-element.js'


class RightElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
      name: {type: String},
      webId: {type: String}
    };
  }

  constructor() {
    super();
    this.name = ""
    this.webId = null
  }

  render(){
    return html`
    <!--  <friends-element name="Friends"></friends-element>-->
    <!--    <people-element name="People"></people-element>
    <rooms-element name="Rooms"></rooms-element>-->
    <!--  <chats-element name="Chats"  webId="https://solidarity.inrupt.net/profile/card#me"></chats-element>-->
    <!--<profile-element name="Profile"></profile-element>-->
    ${this.webId != null ?
      html`<inbox-element name="Inbox" webId="${this.webId}"></inbox-element>`
      :html``
    }

    <messages-element name="Messages"></messages-element>
    `;
  }

  firstUpdated(){
    var app = this;
    this.agent = new HelloAgent(this.name);
  //  console.log(this.agent)
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
    console.log(webId)
    this.agent.send('Inbox',  {action:"webIdChanged", webId: this.webId});
  }
}
customElements.define('right-element', RightElement);
