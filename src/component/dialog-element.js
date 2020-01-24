import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

import './post-dialog-element.js'
import './input-dialog-element.js'

class DialogElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      lang: {type: String},
      postVisible: {type: Boolean},
      inputVisible : {type: Boolean},
      discover: {type: Object}
    };
  }

  constructor() {
    super();
    this.something = "Dialog"
    this.lang=navigator.language
    this.postVisible = false
    this.inputVisible = false
    this.discover = {}

  }

  render(){
    return html`
    <post-dialog-element
    name="PostDialog"
    ?opened="${this.postVisible}"
    @dialog.accept="${this.close.bind(this)}"
    @dialog.cancel="${this.close.bind(this)}">
    </post-dialog-element>

    <input-dialog-element
    name="InputDialog"
    ?opened="${this.inputVisible}"
    .discover= "${this.discover}"
    @dialog.accept="${this.close.bind(this)}"
    @dialog.cancel="${this.close.bind(this)}">
    </input-dialog-element>



    `;
  }


  toggle(params = null) {
    console.log(params)
    switch(params.action) {
      case "mailTo":
      this.postVisible = !this.postVisible
      this.agent.send("PostDialog", params)
      break;
      case "reply":
      this.inputVisible = !this.inputVisible
      this.agent.send("Input", params)
      break;
      default:
      console.log(params, "non pris en compte")
    }

  }

  toggleWrite(discover){
    this.inputVisible = !this.inputVisible
    console.log("DISCOVER", discover)
  this.discover = discover
  }

  close () {
    this.postVisible = false
    this.inputVisible = false
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
          case "toggle":
          app.toggle(message.params)
          break;
          case "toggleWrite":
          app.toggleWrite(message.discover)
          break;
          case "close":
          app.close()
          break;
          default:
          console.log("Unknown action ",message)
        }
      }
    };
  }



}

customElements.define('dialog-element', DialogElement);
