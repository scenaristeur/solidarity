import { LitElement, html } from 'lit-element';

import './flow-element.js'
import './messages-element.js'

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
     <flow-element name="Flow"></flow-element>
  <messages-element name="Messages"></messages-element>
    `;
  }

}

customElements.define('main-element', MainElement);
