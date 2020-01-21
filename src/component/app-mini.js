import { LitElement, html } from 'lit-element';

import './login-element.js'
import './chats-element.js'
import './messages-element.js'
import './flow-element.js'
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

    <login-element name="Login"></login-element>
    <chats-element name="Chats" webId="https://solidarity.inrupt.net/profile/card#me"></chats-element>
    <flow-element name="Flow"></flow-element>
    <messages-element name="Messages"></messages-element>
    </div>

    `;
  }

}

customElements.define('app-element', AppElement);
