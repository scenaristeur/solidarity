import { LitElement, html, css } from 'lit-element';

import './navbar-element.js'

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
  static get styles() {
    //https://lit-element.readthedocs.io/en/v0.6.5/_guide/styles/
    return css`
    /* Selects the host element */
    :host {
      width: 100%;
    }
    `;
  }

  render(){
    return html`
    <navbar-element name="Navbar"></navbar>
    `;
  }

}

customElements.define('banner-element', BannerElement);
