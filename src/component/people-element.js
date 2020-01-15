import { LitElement, html } from 'lit-element';

import './person-element.js'

class PeopleElement extends LitElement {

  static get properties() {
    return {
      persons: {type: Array},
      something: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "PeopleElement"
    this.persons = [
      {name: "John", img: "./img/4020744.png"},
      {name: "Bob", img: ""},
      {name: "Eric", img: "./img/member_274291645.jpeg"},
      {name: "Flik", img: ""},
      {name: "Flok", img: "./img/member_274291645.jpeg"},
      {name: "Blip", img: "./img/4020744.png"}
    ]
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <b>${this.something}</b>

    <div class = "row">
    ${this.persons.map((p) => html`
      <div class = "col">
      <person-element .person='${p}'><person-element>   <!-- https://stackoverflow.com/questions/50248345/lit-element-with-object-type-properties-->
      </div>
      `
    )}
    </div>
    `;
  }

}

customElements.define('people-element', PeopleElement);
