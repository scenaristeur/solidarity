import { LitElement, html } from 'lit-element';



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
     Bla bla

    `;
  }

}

customElements.define('footer-element', FooterElement);
