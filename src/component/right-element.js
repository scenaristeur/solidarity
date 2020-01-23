import { LitElement, html } from 'lit-element';

import './people-element.js'
//import './rooms-element.js'
//import './chats-element.js'
//import './profile-element.js'
import './messages-element.js'
//import './friends-element.js'
import './inbox-element.js'


class RightElement extends LitElement {

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
  <!--  <friends-element name="Friends"></friends-element>-->
    <!--    <people-element name="People"></people-element>
    <rooms-element name="Rooms"></rooms-element>-->
  <!--  <chats-element name="Chats"  webId="https://solidarity.inrupt.net/profile/card#me"></chats-element>-->
    <!--<profile-element name="Profile"></profile-element>-->

    <inbox-element name="Inbox"></inbox-element>
    <messages-element name="Messages"></messages-element>
    `;
  }
}
customElements.define('right-element', RightElement);
