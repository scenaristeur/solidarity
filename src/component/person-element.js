import { LitElement, html, css } from 'lit-element';

class PersonElement extends LitElement {

  static get properties() {
    return {
      person: {type: Object},
    };
  }

  constructor() {
    super();
    this.person = {img:""}
  }
  static get styles() {
    //https://lit-element.readthedocs.io/en/v0.6.5/_guide/styles/
    return css`
    /* Selects the host element */
    :host, .row{
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
    ${this.person.img.length > 0 ?
      html`
      <img src="${this.person.img}" alt="${this.person.name}" >
      `
      :html`
      <i class="fas fa-user-circle fa-2x"></i>`
    }
    <small>${this.person.name}</small>
    `;
  }

}

customElements.define('person-element', PersonElement);
