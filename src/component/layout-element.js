import { LitElement, html } from 'lit-element';
import '@polymer/app-layout/app-layout.js';
import './login-element.js'
import './messages-element.js'

class LayoutElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
    };
  }

  constructor() {
    super();
  }

  render(){
    return html`
    <login-element name="Login"></login-element>
    <messages-element name="Messages"></messages-element>
    `;
  }

}

customElements.define('layout-element', LayoutElement);
