import { LitElement, html } from 'lit-element';

import './chat-select-element.js'
import './flow-element.js'


class AppElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "world"
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">

    <style>
    body {
      padding-top:54px;
      height:100%;
      width:100%;
    }
    #content {
      margin-top: 0px;
      overflow-y: scroll;
      height: calc(100vh - 104px);
    }
    #page-wrapper {
      height: calc(100vh - 54px);
    }
    </style>
<!--
    <div id="banner" class="row">
    <banner-element name="Banner"></banner-element>
    </div>
    -->
    <div class="container-fluid">


    <nav class="navbar navbar-expand-sm navbar-dark fixed-top">
    <ul class="navbar-nav">
    <li class="nav-item active">
    <a id="HeaderLink" class="nav-link btn-raised">
    <span id="HeaderLinkSpan">
    App Name two
    </span>
    </a>
    </li>
    </ul>
    <div class="collapse navbar-collapse justify-content-end">
    <div class="dropdown dropdown-menu-right text-right">
    <button class="btn btn-secondary dropdown-toggle btn-raised" type="button"
    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown:
    </button>
    <div class="dropdown-menu center-dropdown" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Dropdown Item 1</a>
    <a class="dropdown-item" href="#">Dropdown Item 2</a>
    <a class="dropdown-item" href="#">Dropdown Item 3</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="?logout">Logout</a>
    </div>
    </div>
    </div>
    </nav>


    <div id="page-wrapper">
    <div class="container-fluid h-100">
    <div class="row h-100">
    <div class="col-2" id="LeftSidebar" style="background-color:blue">
    </div>
    <div class="col-8">
    <div class="row" id="content">
    <flow-element name="Flow"></flow-element.js>
    </div>
    <div class="row no-gutters" style="height:40px;padding-top:7px;">
    <div class="col-10 no-gutters">
    <input type="text" class="form-control" style="width:100%">
    </div>
    <div class="col-2">
    <input type="button" class="btn btn-primary" style="width:100%"></div>
    </div>
    </div>
    <div class="col-2" id="RightSidebar" style="background-color:greenyellow">
    <chat-select-element name="ChatSelect" source="https://localtest.localhost:8443/profile/card#me"></chat-select-element>
    </div>
    </div>
    </div>
    </div>

    <!--
    <div id="banner" class="row">
    <banner-element name="Banner"></banner-element>
    </div>

    <div id="main" class="row">
    <div id="main" class="col col-3">
    col 1
    <left-element name="Left"></left-element>
    </div>
    <div id="main" class="col col-md-6">
    col 2
    <main-element name="Main"></main-element>
    </div>
    <div id="main" class="col">
    col 3
    <right-element name="Right"></right-element>
    </div>
    </div>

    <div id="footer" class="row">
    Footer
    <footer-element name="Footer"></footer-element>
    </div>
    -->

    </div>

    `;
  }

}

customElements.define('app-element', AppElement);
