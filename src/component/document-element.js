import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

class DocumentElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      url: {type: String},
      doc: {type: Array}
    };
  }

  constructor() {
    super();
    this.something = "Doc Element"
    this.url = ""
    this.doc = []
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <h4>${this.something}</h4>
    <div class="card" style="width: 18rem;">
    <img src="" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">Card title</h5>
    ${this.doc.map((d) => html`
      <p class="card-text">
      ${d.values.map((v) => html`
        ${this.localName(d.property)} :
        <a href="${v}" target="_blank">${this.localName(v)}</a><br>
        `)}
        </p>
        `)}
        <small>${this.url}</small>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        `;
      }

      firstUpdated(){
        var app = this;
        this.agent = new HelloAgent(this.name);
        this.agent.receive = function(from, message) {
          if (message.hasOwnProperty("action")){
            switch(message.action) {
              case "webIdChanged":
              app.webIdChanged(message.webId)
              break;
              default:
              console.log("Unknown action ",message)
            }
          }
        };
        this.updateDocument()
      }

      async updateDocument(){
        var doc = []
        this.doc=[]
        for await (const property of data[this.url].properties)
        {
          var values = []
          for await (const val of data[this.url][`${property}`])
          { values.push(`${val}`) }
          var d = {property: `${property}` , values: values}
          doc.push(d)
        }
        this.doc = doc
      }

      localName(str){
        var ln = str.substring(str.lastIndexOf('#')+1);
        ln == str ? ln = str.substring(str.lastIndexOf('/')+1) : "";
        ln == "me" ? ln = str : "";
        return ln
      }

    }

    customElements.define('document-element', DocumentElement);
