import { LitElement, html } from 'lit-element';

import './people-element.js'
import './rooms-element.js'
import './chats-element.js'
//import './profile-element.js'

class LeftElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "Left Element"
  }

  render(){
    return html`
    <b>${this.something}</b>
    <people-element name="People"></people-element>
    <rooms-element name="Rooms"></rooms-element>
    <chats-element name="Chats"></chats-element>
    <!--<profile-element name="Profile"></profile-element>-->
    `;
  }
}
customElements.define('left-element', LeftElement);
