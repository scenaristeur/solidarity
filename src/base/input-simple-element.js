import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

class InputSimpleElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      type: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "Input Element"
    this.type = ""
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">

<style>
i{
  padding-top:5px;
  padding-right:5px;
}
</style>
    <div class="input-group">

    <!--    <label for="exampleFormControlTextarea1">Example textarea</label>-->
      <div class="col-10">
    <textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <!--  <input type="text" class="form-control"
    placeholder="Recipient's username"
    aria-label="Recipient's username" aria-describedby="basic-addon2">-->

    <div class="col">
    <div class="row text-right">
    <i class="fas fa-check text-success" ?hidden=${this.type != "chatter"}></i>CHAT
    </div>
    <div class="row text-right">
    <i class="fas fa-check text-success" ?hidden=${this.type != "questions"}></i>QUESTION
    </div>
    <div class="row text-right">
    <i class="fas fa-check text-success" ?hidden=${this.type != "topics"}></i>TOPIC
    </div>
    <div class="row text-right">
    <i class="fas fa-check text-success" ?hidden=${this.type != "polls"}></i>POLL
    </div>


    <!--  <button class="btn btn-outline-secondary" type="button">Button</button>-->
    </div>
    </div>

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

customElements.define('input-simple-element', InputSimpleElement);
