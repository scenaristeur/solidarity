import { LitElement, html } from 'lit-element';
import { HelloAgent } from '../agents/hello-agent.js';

class MessagesElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      messages: {type: Array}
    };
  }

  constructor() {
    super();
    this.name = "unknown"
    this.messages =  []
  }
  render(){
    return html`
    <p>${this.name}</p>
  <!--  <pre class="pre-scrollable">-->
    <ul id="messageslist" style="height: 20vh; overflow: auto">
    ${this.messages.map((m) => html`<li><b>Agent ${m.from}</b> say "${m.message}"</li>`)}
    </ul>

  <!--  </pre>-->
    `;
  }

  firstUpdated(){
    var app = this;
    this.agent = new HelloAgent(this.name);
    this.agent.receive = function(from, message) {

      if (message.hasOwnProperty("action")){
        switch(message.action) {
          case "info":
          app.addInfo(from, message)
          break;
          default:
          console.log("Unknown action ",message)
        }
      }
    };
  }

  addInfo(from, message){
    this.messages.reverse()
    this.messages = [... this.messages, {message: JSON.stringify(message), from: from}]
    this.messages.reverse()
  }

}

customElements.define('messages-element', MessagesElement);
