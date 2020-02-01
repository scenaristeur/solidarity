import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

import './scroller-shighl.js'

class MainShighl extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      instance: {type: String},
      classe: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "MainSighl"
    this.instance = null
    this.classe = null
  }

  render(){
    return html`
    <h4>${this.something}</h4>
    ${this.instance}<br>
    ${this.classe}

    <scroller-shighl ?hidden="${this.classe!='LongChat'}" name="Scroller"></scroller-shighl>

    `;
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
          case "instanceChanged":
          app.instanceChanged(message)
          break;
          default:
          console.log("Unknown action ",message)
        }
      }
    };
  }

  instanceChanged(message){
    console.log(message)
    this.instance = message.instance;
    this.classe = message.classe
    if (this.classe == "LongChat"){
      this.agent.send("Scroller", {action: "instanceChanged", instance: this.instance, classe: this.classe})
    }
  }

}

customElements.define('main-shighl', MainShighl);
