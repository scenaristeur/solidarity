import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

class AppElement extends LitElement {

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
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <style>
    .border-10 {
      border-width:10px !important;
    }
    </style>
    <div class="container-fluid" >
    <div class="col shadow-lg p-3 m-4 bg-white" style="height:94vh;width:94vw;border-radius: 25px;">
    <div class="row shadow-lg p-3 mt-n3 bg-white"
     style="box-shadow: inset 0px 5px 45px -35px #000000;height:80px;border-radius: 25px 25px 0px 0px;">
    <!--https://developer.mozilla.org/fr/docs/Web/CSS/Mod%C3%A8le_de_bo%C3%AEte_CSS/G%C3%A9n%C3%A9rateur_box-shadow-->
  <a class="navbar-brand" href="#">Solidarity / Chat</a>

    </div>
    <div class="row p-3">

    <div class="col-1 shadow-sm btn-group-vertical"  style="height:30vh">
    <button type="button" class="btn mt-1 border-10 border-right-0 border-top-0 border-bottom-0" style="color:purple;border-color:purple">
    <i class="fas fa-users"></i>Chatter</button>
    <button type="button" class="btn mt-1 border-10 border-danger border-right-0 border-top-0 border-bottom-0 text-danger">
    <i class="fas fa-comment-alt"></i>Chat</button>
    <button type="button" class="btn  mt-1 border-10 border-success border-right-0 border-top-0 border-bottom-0 text-success">
    <i class="fas fa-envelope"></i>Inbox</button>
    </div>

    <div class="col shadow-sm p-3 m-1" style="height:80vh">
    <div class="row">
    <ul class="nav nav-tabs">
    <li class="nav-item">
    <a class="nav-link active" href="#">CHATTER</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#">QUESTIONS</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#">TOPICS</a>
    </li>
    <li class="nav-item">
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">POOLS</a>
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
    </div>

    <div class="col-4 shadow-sm p-3  m-1">
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
    </div>


    </div>
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

customElements.define('app-element', AppElement);
