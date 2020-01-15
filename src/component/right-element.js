import { LitElement, html } from 'lit-element';

import './news-element.js'
import './events-element.js'
import './announcements-element.js'
import './activity-element.js'
import './friends-element.js'


class RightElement extends LitElement {

  static get properties() {
    return {
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "Right Element"
  }

  render(){
    return html`
    <b>${this.something}</b>
    <friends-element name="Friends"></friends-element>
    <news-element name="News"></news-element>
    <events-element name="Events"></events-element>
    <announcements-element name="Announcements"></announcements-element>
    <activity-element name="Activity"></activity-element>

    `;
  }

}

customElements.define('right-element', RightElement);
