import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

import './main-element.js'
import './inbox-element.js'
import './login-element.js'
import './dialog-element.js'

class AppElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      tab: {type: String},
      messagesLength: {type: Number},
      webId: {type: String},
      fullname: {type: String},
      img: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "Flow Element"
    this.tab = "main"
    this.messagesLength = 0
    this.webId = null
    this.fullname = ""
    this.img = null
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">

    <style>


    /* Extra small devices (portrait phones, less than 576px)*/
    @media (max-width: 575.98px) {
      .nav-brand{
        /*font-size: 80px;*/
      }
    }

    /*Small devices (landscape phones, 576px and up)*/
    @media (min-width: 576px) {
      .nav-brand{
      /*  font-size: 80px;*/
      }
    }

    /*Medium devices (tablets, 768px and up)*/
    @media (min-width: 768px) {
      /*div{
      border: 10px solid #ccc;
      height: 200px;
      }*/
    }


    /*Large devices (desktops, 992px and up)*/
    @media (min-width: 992px) {
      /*div{
      border: 10px solid #ccc;
      height: 200px;
      }*/
    }


    /* Extra large devices (large desktops, 1200px and up)*/
    @media (min-width: 1200px) {
      /*div{
      border: 10px solid #ccc;
      height: 200px;
      }*/
    }


    #collapsibleNavbar{
      background-color:  #CCCCCC;
      z-index:2
    }
    .fa-1x {
      font-size: 1.5rem;
    }
    .navbar-toggler.toggler-example {
      cursor: pointer;
    }
    .user_img{
      height: 32px;
      width: 32px;
      border:1.5px solid #f5f6fa;
    }
    .border-10 {
      border-width:10px !important;
    }
    </style>
    <div class="container-fluid" >
    <div class="col shadow-lg p-3 mt-3 ml-n1 mr-n1 bg-white" style="height:96vh;width:100vw;border-radius: 25px;">
    <div class="row shadow-lg p-3 mt-n3 bg-white"
    style="box-shadow: inset 0px 5px 45px -35px #000000;height:64px;border-radius: 25px 25px 0px 0px;">
    <!--https://developer.mozilla.org/fr/docs/Web/CSS/Mod%C3%A8le_de_bo%C3%AEte_CSS/G%C3%A9n%C3%A9rateur_box-shadow-->

    <!-- Navbar brand -->
    <div class="col">
    <a class="navbar-brand" href="#">Solidarity / Chat</a>
    </div>

    <!--Navbar-->
    <nav class="navbar navbar-light light-blue lighten-4">



    <div class="col text-right">

    <!-- Collapse button -->
    <span style="padding:5px">
    ${this.fullname}
    <login-element ?hidden="${this.webId != null}" name="Login"></login-element>
    </span>

    ${this.img != null ?
      html`
      <!-- REduce the profile image https://images.weserv.nl/docs/-->
      <img class="rounded-circle user_img" src="//images.weserv.nl/?url=${this.img}&w=32&h=32" title="${this.webId}" alt="Can not access image profile">
      `
      :html`<i class="fas fa-user-circle fa-1x" title="${this.webId}"></i>`
    }

    <button class="navbar-toggler toggler-example"
    type="button"
    @click="${this.toggleOffCanvas.bind(this)}">
    <i class="fas fa-bars fa-1x"></i></button>
    </div>


    <!-- Navbar links -->
    <div class="collapse navbar-collapse offcanvas-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
    <li class="nav-item">
    <a class="nav-link" href="#" @click="${this.clickmenu.bind(this)}">Friends</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#" @click="${this.clickmenu.bind(this)}">Link</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#" @click="${this.clickmenu.bind(this)}">Link</a>
    </li>
    <li class="nav-item" ?hidden="${this.webId == null}">
    <a class="nav-link" action="logout" href="#" @click="${this.clickmenu.bind(this)}">Logout</a>
    </li>
    </ul>
    </div>
    <!-- Collapsible content -->

    </nav>
    <!--/.Navbar-->


    </div>
    <div class="row p-3">

    <div class="col-1 shadow-sm btn-group-vertical d-none d-sm-block"  style="height:30vh;text-align:left">
    <button type="button"
    class="btn mt-1 border-10 border-right-0 border-top-0 border-bottom-0"
    style="color:purple;border-color:purple;text-align:left"
    tab="main" @click=${this.changeTab}>
    <i class="fas fa-users" tab="main"></i>
    <span style="vertical-align:1px" tab="main">Chatter</span></button>
    <button type="button"
    class="btn mt-1 border-10 border-danger border-right-0 border-top-0 border-bottom-0 text-danger"
    tab="main" @click=${this.changeTab}
    style="text-align:left">
    <i class="fas fa-comment-alt" tab="main"></i>
    <span style="vertical-align:1px" tab="main">Chat</span></button>
    <button type="button"
    class="btn mt-1 border-10 border-success border-right-0 border-top-0 border-bottom-0 text-success"
    tab="inbox" @click=${this.changeTab}
    style="text-align:left">
    <i class="fas fa-envelope" tab="inbox"></i> <span style="vertical-align:1px" tab="inbox">Inbox</span>
    <span class="badge badge-light" ?hidden="${this.messagesLength == 0}" tab="inbox">${this.messagesLength}</span>
    </button>
    </div>

    <div class="col shadow-sm p-3 m-1" style="height:80vh">
    <main-element ?hidden="${this.tab != 'main'}" name="Main"></main-element>
    <inbox-element ?hidden="${this.tab != 'inbox'}" name="Inbox"></inbox-element>
    </div>

    <div class="col-4 shadow-sm p-3  m-1  d-none d-sm-block">
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

    <dialog-element name="Dialog"></dialog-element>
    </div>


    </div>
    </div>

    </div>

    `;
  }


  changeTab(e){
    this.tab = e.target.getAttribute("tab")
    //  console.log(this.tab)
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
          app.webIdChanged(message)
          break;
          case "updateInboxBtn":
          app.updateInboxBtn(message.messagesLength)
          break;
          default:
          console.log("Unknown action ",message)
        }
      }
    };
  }

  updateInboxBtn(ml){
    this.messagesLength = ml
  }

  webIdChanged(mess){
    this.webId = mess.webId
    this.fullname = mess.fullname
    this.img = mess.img
    console.log(mess)
  }

  clickmenu(e){
    console.log(e)
    this.toggleOffCanvas(e)
    var action = e.target.getAttribute("action")
    console.log(action)
    switch(action) {
      case "logout":
      this.agent.send("Login", {action: "logout"})
      break;
      default:
      console.log("action inconnue", action)
    }
  }
  toggleOffCanvas(e){
    //  console.log(e) //
    this.shadowRoot.getElementById("collapsibleNavbar").classList.toggle("collapse");
  }
}

customElements.define('app-element', AppElement);
