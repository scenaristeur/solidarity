import { LitElement, html } from 'lit-element';
import { HelloAgent } from '../agents/hello-agent.js';
import './login-element.js'

class BannerElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "BannerElement"
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/hola.css" rel="stylesheet">

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

customElements.define('banner-element', BannerElement);
