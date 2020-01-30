import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

import '@material/mwc-button';

class EventsElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "Events Element"
  }

  render(){
    return html`
    <h4>${this.something}</h4>

    <mwc-button id="myButton" label="Material test!" @click='${this.clicked}'raised></mwc-button>
    <mwc-button id="mySecondButton" label="Another!" @click='${this.clicked}'raised></mwc-button>


    `;
  }

  clicked(e){
    var lab = e.target.getAttribute("label")
    console.log(lab)
    alert('You clicked '+lab)
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

customElements.define('events-element', EventsElement);
