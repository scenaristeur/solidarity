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
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <h4>Log</h4>
    <!--  <pre class="pre-scrollable">-->
    <ul id="messageslist" style="height: 30vh; overflow: auto" class="list-group">
    ${this.messages.map((m) => html`
      <li class="list-group-item small"><b>${m.from}</b>: "${m.message}"</li>
      `)}
    </ul>

    <!--  </pre>-->
    `;
  }

  firstUpdated(){
    var app = this;
    this.agent = new HelloAgent(this.name);
    this.agent.receive = function(from, message) {
    //  console.log(message)
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
    this.messages = [... this.messages, {message: JSON.stringify(message.info), from: from}]
    this.messages.reverse()
  }

}

customElements.define('messages-element', MessagesElement);
