import { LitElement, html, css } from 'lit-element';

import data from "@solid/query-ldflex";

class FriendElement extends LitElement {

  static get properties() {
    return {
      webId: {type: String},
      person: {type: Object}
    };
  }

  constructor() {
    super();
    this.webId = null
    this.person = {img:""}
  }
  static get styles() {
    //https://lit-element.readthedocs.io/en/v0.6.5/_guide/styles/
    return css`
    /* Selects the host element */
    :host{
      background-color: rgba(128, 255, 255, .5);
    }
    img{
      height:32px;
      width:32px;
      border-radius: 50%;
    }
    `;
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">

    <a href="${this.webId}" target="_blank">
    ${this.person.img.length > 0 ?
      html`<img src="${this.person.img}" alt="image">`
      :html`<i class="fas fa-user-circle fa-2x"></i>`
    }
    </a>
    <small>${this.person.name}</small>
    `;
  }

  async firstUpdated(){
    var p = {}
    if (this.webId != null){
      p.webId = `${this.webId}`
      const n = await data[this.webId].vcard$fn || p.webId;
      const img = await data[this.webId].foaf$img || "";
      const inbox = await data[this.webId].inbox;
      p.name = `${n}`
      p.img = `${img}`
      p.inbox = `${inbox}`
      this.person = p
    //  console.log(this.person)
    }
  }

}

customElements.define('friend-element', FriendElement);
