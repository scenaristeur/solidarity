import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

import './main-element.js'
import './side-element.js'
import './inbox-element.js'
import './contacts-element.js'
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
  background-color: #17a2b8;
  z-index:5;
  max-width: 300px;
  width:100%;
  position: fixed;
  top: 80px;
  right:30px;
  overflow-y: auto;
  transition: visibility .3s ease-in-out, -webkit-transform .3s ease-in-out;
  transition: transform .3s ease-in-out, visibility .3s ease-in-out;
  transition: transform .3s ease-in-out, visibility .3s ease-in-out, -webkit-transform .3s ease-in-out;
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
nav {
  width: 100%

}
</style>
<div class="container-fluid" >
<div class="col shadow-lg p-3 mt-3 ml-n1 mr-n1 bg-white" style="height:96vh;width:100vw;border-radius: 25px;">
<div class="row shadow-lg p-3 mt-n3 bg-white"
style="box-shadow: inset 0px 5px 45px -35px #000000;height:64px;border-radius: 25px 25px 0px 0px;">
<!--https://developer.mozilla.org/fr/docs/Web/CSS/Mod%C3%A8le_de_bo%C3%AEte_CSS/G%C3%A9n%C3%A9rateur_box-shadow-->


<nav class="navbar navbar-light bg-white height:50px  p-0 mt-n3">
<a class="navbar-brand" href="#">Solidarity</a>
<!--<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>-->
<div class="navbar-text">
${this.fullname}
${this.img != null ?
  html`
  <!-- REduce the profile image https://images.weserv.nl/docs/-->
  <img class="rounded-circle user_img" src="//images.weserv.nl/?url=${this.img}&w=32&h=32" title="${this.webId}" alt="Can not access image profile">
  `
  :html`<i class="fas fa-user-circle fa-1x" title="${this.webId}"></i>`
}
<login-element ?hidden="${this.webId != null}" name="Login"></login-element>
</div>


<button class="navbar-toggler"
type="button"
@click="${this.toggleOffCanvas.bind(this)}">
<i class="fas fa-bars fa-1x"></i></button>

<!-- Navbar links -->
<div class="collapse navbar-collapse offcanvas-collapse" id="collapsibleNavbar">
<ul class="navbar-nav">
<li class="nav-item">
<a class="nav-link" acton="contacts" href="#" @click="${this.clickmenu.bind(this)}">Friends</a>
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
<!--<span class="navbar-text">
Navbar text with an inline element 2
</span>-->
</nav>



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
<a href="https://github.com/scenaristeur/solidarity/wiki/How-does-LongChat-work-on-Solidarity-%3F" target="_blank">How does it work ?</a>
</div>

<div class="col shadow-sm p-3 m-1" style="height:80vh">
<main-element ?hidden="${this.tab != 'main'}" name="Main"></main-element>
<inbox-element ?hidden="${this.tab != 'inbox'}" name="Inbox"></inbox-element>
</div>

<div class="col-4 shadow-sm p-3  m-1" >
<side-element ?hidden="${this.tab != 'main'}" name="Side"></side-element>
<contacts-element ?hidden="${this.tab != 'inbox'}" name="Contacts"></contacts-element>
</div>

<dialog-element name="Dialog"></dialog-element>

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
