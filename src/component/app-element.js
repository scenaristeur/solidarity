import { LitElement, html } from 'lit-element';

import './login-element.js'
import './messages-element.js'

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
    Hello <b>${this.something}</b> from app-element !
    <login-element name="Login"></login-element>
    <messages-element name="Messages"></messages-element>
    `;
  }

}

customElements.define('app-element', AppElement);
