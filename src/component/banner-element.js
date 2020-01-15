import { LitElement, html } from 'lit-element';

import './login-element.js'

class BannerElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "Banner Element"
  }

  render(){
    return html`
     <b>${this.something}</b>
     <login-element name="Login"></login-element>
    `;
  }

}

customElements.define('banner-element', BannerElement);
