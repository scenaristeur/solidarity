import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

import './banner-element.js'
import './right-element.js'
//import './right-element.js'
import './footer-element.js'
import './main-element.js'
import './contacts-element.js'
import './chats-element.js'
import './dialog-element.js'



class AppElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
      name: {type: String},
      webId: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "world"
    this.name = "Maillappe"
    this.webId = null
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">

    <div class="container-fluid">

    <div id="banner" class="row">
    <banner-element name="Banner"></banner-element>
    </div>

    <div  class="row">
    <div class="col">
    <div>
    <chats-element name="Chats"  webId="https://solidarity.inrupt.net/profile/card#me"></chats-element>
    </div>

    ${this.webId != null ?
      html`
      <contacts-element name="Contacts" webId="${this.webId}"></contacts-element>`
      :html``
    }
    </div>




    <div  class="col col-md-6">
    <main-element name="Main"></main-element>
    </div>

    <div  class="col  col-md-3">
    <!-- left element passé à droite ???
    <right-element name="Right"></right-element> -->
    <right-element name="Right"></right-element>
    </div>
    </div>

    <div id="footer" class="row-12">
    <footer-element name="Footer"></footer-element>
    </div>

    </div>
    <dialog-element name="Dialog"></dialog-element>

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
  }


}

customElements.define('app-element', AppElement);
