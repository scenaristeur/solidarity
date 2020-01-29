import { LitElement, html } from 'lit-element';
import { HelloAgent } from '../agents/hello-agent.js';

import './news-element.js'
import './events-element.js'
import './people-element.js'
import './activity-element.js'
import "./input-side-element.js"


class SideElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      tab: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "Side Element"
    this.tab = "events"
    this.name = ""
  }

  render(){
    return html`
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">

    <div class="row">
    <ul class="nav nav-tabs">
    <li class="nav-item">
    <a class="nav-link" href="#" tab="news" @click=${this.changeTab}>NEWS</a>
    </li>
    <li class="nav-item">
    <a class="nav-link active" href="#" tab="events" @click=${this.changeTab}>EVENTS</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#" tab="people" @click=${this.changeTab}>PEOPLE</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#" tab="activity" @click=${this.changeTab}>ACTIVITY</a>
    </li>
    </ul>
    </div>

    <div id="scroller" class="col overflow-auto" style="height: 60vh;">
    <news-element ?hidden=${this.tab != 'news'} name="News"></news-element>
    <events-element ?hidden=${this.tab != 'events'} name="Events"></events-element>
    <people-element ?hidden=${this.tab != 'people'} name="People"></people-element>
    <activity-element ?hidden=${this.tab != 'activity'} name="Activity"></activity-element>
    </div>

    <div class="col overflow-auto" style="height: 15vh;">
    <input-side-element name="InputSide" type="${this.tab}"></input-side-element>
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
  }

  webIdChanged(webId){
    this.webId = webId
    if (webId != null){
      this.updateProfile();
    }else{

    }
  }

}

customElements.define('side-element', SideElement);
