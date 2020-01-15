import { LitElement, html } from 'lit-element';

class PeopleElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "People Element"
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

customElements.define('people-element', PeopleElement);
