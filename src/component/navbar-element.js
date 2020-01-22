//https://www.w3schools.com/bootstrap4/bootstrap_navbar.asp
import { LitElement, html, css} from 'lit-element';

import './login-element.js'

class NavbarElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "NavBar"
  }

  static get styles() {
    return css`
    /* Selects the host element */
    :host {
      background-color: blue;
    }

    `;
  }


  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="css/offcanvas.css" rel="stylesheet">

    <!-- A grey horizontal navbar that becomes vertical on small screens -->

    <!-- Black with white text -->
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <a class="navbar-brand" href="#">Solidarity</a>

    <!-- Toggler/collapsibe Button -->
    <button class="navbar-toggler p-0 border-0" type="button" @click="${this.toggleOffCanvas.bind(this)}">
    <span class="navbar-toggler-icon"></span>
    </button>

    <!--<a class="navbar-brand" href="#">
    <img src="bird.jpg" alt="Logo" style="width:40px;">
    </a>-->

    <!-- Navbar links -->
    <div class="navbar-collapse offcanvas-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
    <li class="nav-item">
    <a class="nav-link" href="#" @click="${this.clickmenu.bind(this)}">Link</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#" @click="${this.clickmenu.bind(this)}">Link</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#" @click="${this.clickmenu.bind(this)}">Link</a>
    </li>
    </ul>
    </div>
    </nav>


    <ul class="nav">
    <li class="nav-item">
    <a class="nav-link active" href="#">Accueil</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="#">A propos</a>
    </li>
    <li class="nav-item">
    <login-element name="Login"></login-element>
    </li>
    </ul>


    `;
  }
  clickmenu(e){
    console.log(e)
  }
  toggleOffCanvas(e){
    //  console.log(e) //
    //  console.log(this.shadowRoot.getElementById("navbarsExampleDefault").className)
    this.shadowRoot.getElementById("collapsibleNavbar").classList.toggle("open");
  }
}

customElements.define('navbar-element', NavbarElement);
