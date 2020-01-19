import { LitElement, html } from 'lit-element';
import './messages-element.js'
class FooterElement extends LitElement {
  static get properties() {
    return {
      something: {type: String},
    };
  }
  constructor() {
    super();
    this.something = "Footer Element"
  }
  render(){
    return html`
    <b>${this.something}</b>
        <messages-element name="Messages"></messages-element>
    `;
  }
}
customElements.define('footer-element', FooterElement);
