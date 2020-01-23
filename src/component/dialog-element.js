import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

import './post-dialog-element.js'

class DialogElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      lang: {type: String},
      postVisible: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.something = "Dialog"
    this.lang=navigator.language
    this.postVisible = false

  }

  render(){
    return html`
    <h4>${this.something}</h4>

    <!-- Dialog -->
    ${this.postVisible}
    <post-dialog-element
    name="PostDialog"
    ?opened="${this.postVisible}"
    @dialog.accept="${this.close.bind(this)}"
    @dialog.cancel="${this.close.bind(this)}">
    </post-dialog-element>
    <!--fin dailog -->


    `;
  }


  toggle(params = null) {
        console.log(params)
    this.postVisible = !this.postVisible
    //  console.log(this.postVisible)
  //  var messRep = {action:"setReplyTo" }
 this.agent.send("PostDialog", params)
  }

  close () {
    //  console.log(e)
    this.postVisible = false
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
