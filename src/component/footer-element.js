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
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/fontawesome/css/all.css" rel="stylesheet">

    <style>
    #footer{
      height: 100%;
      margin: 0;
      background: #7F7FD5;
      background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
      background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
    }
    </style>
    <div class="row" id="footer">
    <h4>Solidarity</h4>
    <div class="col">

    <a href="https://github.com/scenaristeur/solidarity" target="_blank">Source</a><br>
    <a href="index-mini.html" target="_blank">Solidarity-mini</a><br>
    </div>
    <div class="col">
    Solid<br>
    Inrupt<br>
    </div>
    <div class="col">
    Forum Solid<br>
    Talks<br>
    </div>
    </div>
    `;
  }
}
customElements.define('footer-element', FooterElement);
