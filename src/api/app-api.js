import { LitElement, html } from 'lit-element';

import './login-shighl.js'
import './friends-shighl.js'
import './publictypeindex-shighl.js'


class AppApi extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "App Api"
  }

  render(){
    return html`
    <h4>${this.something}</h4>
    <login-shighl name="Login"></login-shighl>
    <friends-shighl name="Friends"></friends-shighl>
    <publictypeindex-shighl name="PublicTypeIndex"></publictypeindex-shighl>
    `;
  }

  firstUpdated(){

  }

}

customElements.define('app-api', AppApi);
