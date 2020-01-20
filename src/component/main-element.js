import { LitElement, html } from 'lit-element';

import './flow-element.js'



class MainElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "Main element"
  }

  render(){
    return html`
    <b>${this.something}</b>
    <flow-element name="Flow" webId="https://solidarity.inrupt.net/profile/card#me"></flow-element>


    `;
  }

}

customElements.define('main-element', MainElement);
