import { LitElement, html } from 'lit-element';

class ChatsElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "ChatsElement"
  }

  render(){
    return html`
    <b>${this.something}</b>

    <ul>
    <li> bla bla</li>
    <li> bla bla</li>
    <li> bla bla</li>
    <li> bla bla</li>


    </ul>
    `;
  }

}

customElements.define('chats-element', ChatsElement);
