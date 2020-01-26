import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

import "./chatter-element.js"
import "./questions-element.js"
import "./topics-element.js"
import "./polls-element.js"
import "./input-element.js"

class MainElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      tab: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "Main Element"
    this.tab = "chatter"
    this.name = ""
  }

  render(){
    return html`
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <div class="row">
    <ul class="nav nav-tabs">
    <li class="nav-item">
    <a class="nav-link active" href="#" tab="chatter" @click=${this.changeTab}>CHATTER</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#" tab="questions" @click=${this.changeTab}>QUESTIONS</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#" tab="topics" @click=${this.changeTab}>TOPICS</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#" tab="polls" @click=${this.changeTab}>POLLS</a>
    </li>
    </ul>
    </div>

    <div id="scroller" class="col overflow-auto" style="height: 60vh;">
    <chatter-element ?hidden="${this.tab != "chatter"}" name="Chatter"></chatter-element>
    <questions-element ?hidden="${this.tab != "questions"}" name="Questions"></questions-element>
    <topics-element ?hidden="${this.tab != "topics"}" name="Topics"></topics-element>
    <polls-element ?hidden="${this.tab != "polls"}" name="Polls"></polls-element>
    </div>

    <div class="col overflow-auto" style="height: 15vh;">
    <input-element name="Input" type="${this.tab}"></input-element>
    </div>

    `;
  }


  changeTab(e){
    this.shadowRoot.querySelectorAll(".nav-link").forEach((l, i) => {
      l.classList.remove("active")
    });
    this.tab = e.target.getAttribute("tab")
    e.target.classList.add("active")
    console.log(this.tab)
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
  /*  var elem = this.shadowRoot.getElementById('scroller');
  elem.scrollTop = elem.scrollHeight;*/
  }

  webIdChanged(webId){
    this.webId = webId
    if (webId != null){
      this.updateProfile();
    }else{

    }
  }

}

customElements.define('main-element', MainElement);
