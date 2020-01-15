import { LitElement, html } from 'lit-element';

import './banner-element.js'
import './left-element.js'
import './right-element.js'
import './footer-element.js'
import './main-element.js'


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

    <div class="container-fluid">

    <div id="banner" class="row">
    <banner-element name="Banner"></banner-element>
    </div>

    <div id="main" class="row">
    <div id="main" class="col">
    col 1
    <left-element name="Left"></left-element>
    </div>
    <div id="main" class="col-6">
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

    </div>

    `;
  }

}

customElements.define('app-element', AppElement);
