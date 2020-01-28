import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

class SideElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "Flow Element"
  }

  render(){
    return html`
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">

    <div class="row">
    <ul class="nav nav-tabs">
    <li class="nav-item">
    <a class="nav-link" href="#">NEWS</a>
    </li>
    <li class="nav-item">
    <a class="nav-link active" href="#">EVENTS</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#">PEOPLE</a>
    </li>
    <li class="nav-item">
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">ACTIVITY</a>
    </li>
    </ul>
    </div>

    <div class="col overflow-auto" style="height: 70vh;">
    <ul class="list-group  list-group-flush">
    <li class="list-group-item">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Amet tellus cras adipiscing enim eu turpis. Sem integer vitae justo eget. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Vel eros donec ac odio tempor orci dapibus. Viverra justo nec ultrices dui sapien eget mi proin sed. Augue neque gravida in fermentum et. Ac tortor vitae purus
    </li>
    <li class="list-group-item">
    Praesent tristique magna sit amet purus gravida. Quis hendrerit dolor magna eget. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Imperdiet dui accumsan sit amet. Mauris commodo quis imperdiet massa tincidunt nunc. Nunc id cursus metus aliquam eleifend mi in. Ultricies lacus sed turpis tincidunt id. Sagittis vitae et leo duis ut diam quam. Leo vel fringilla est ullamcorper eget nulla. Pellentesque nec nam aliquam sem et tortor consequat id porta. Proin sed libero enim sed
    </li>
    <li class="list-group-item">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Amet tellus cras adipiscing enim eu turpis. Sem integer vitae justo eget. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Vel eros donec ac odio tempor orci dapibus. Viverra justo nec ultrices dui sapien eget mi proin sed. Augue neque gravida in fermentum et. Ac tortor vitae purus
    </li>
    <li class="list-group-item">
    Praesent tristique magna sit amet purus gravida. Quis hendrerit dolor magna eget. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Imperdiet dui accumsan sit amet. Mauris commodo quis imperdiet massa tincidunt nunc. Nunc id cursus metus aliquam eleifend mi in. Ultricies lacus sed turpis tincidunt id. Sagittis vitae et leo duis ut diam quam. Leo vel fringilla est ullamcorper eget nulla. Pellentesque nec nam aliquam sem et tortor consequat id porta. Proin sed libero enim sed
    </li>
    <li class="list-group-item">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Amet tellus cras adipiscing enim eu turpis. Sem integer vitae justo eget. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Vel eros donec ac odio tempor orci dapibus. Viverra justo nec ultrices dui sapien eget mi proin sed. Augue neque gravida in fermentum et. Ac tortor vitae purus
    </li>
    <li class="list-group-item">
    Praesent tristique magna sit amet purus gravida. Quis hendrerit dolor magna eget. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Imperdiet dui accumsan sit amet. Mauris commodo quis imperdiet massa tincidunt nunc. Nunc id cursus metus aliquam eleifend mi in. Ultricies lacus sed turpis tincidunt id. Sagittis vitae et leo duis ut diam quam. Leo vel fringilla est ullamcorper eget nulla. Pellentesque nec nam aliquam sem et tortor consequat id porta. Proin sed libero enim sed
    </li>
    </ul>
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

customElements.define('side-element', SideElement);
