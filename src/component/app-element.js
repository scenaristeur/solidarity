import { LitElement, html } from 'lit-element';

import './banner-element.js'
import './left-element.js'
//import './right-element.js'
import './footer-element.js'
import './main-element.js'
import './contact-element.js'


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

    <div  class="row">
    <div  class="col col-3">
      <contact-element name="Contact"></contact-element>
    </div>
    <div  class="col col-md-6">

    <main-element name="Main"></main-element>
    </div>
    <div  class="col  col-3">

<!-- left element passé à droite ???
<right-element name="Right"></right-element> -->
  <left-element name="Left"></left-element>

    </div>
    </div>

    <div id="footer" class="row">

    <footer-element name="Footer"></footer-element>
    </div>

    </div>

    `;
  }

}

customElements.define('app-element', AppElement);
