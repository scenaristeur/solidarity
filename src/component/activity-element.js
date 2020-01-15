import { LitElement, html } from 'lit-element';

class ActivityElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "ActivityElement"
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

customElements.define('activity-element', ActivityElement);
