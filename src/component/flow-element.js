import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

import './document-element.js'

class FlowElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      person: {type: Object},
      documents:  {type: Object}
    };
  }

  constructor() {
    super();
    this.something = "Flow Element"
    this.person = {instances: []}
    this.documents = []
  }

  render(){
    return html`
    <h4>${this.something}</h4>
    ${this.person.name}


    ${this.person.instances.map((i) => html`
      <div class = "row">
      <div class = "col">

      <button type="button"
      class="btn btn-primary btn-sm"
      url="${i.object}"
      @click="${this.open}">${this.cutStorage(i.object)}</button>(${this.localName(i.classe)})
      </div>
      </div>
      `
    )}

    ${this.documents.length} documents

    ${this.documents.map((d, index) => html`
      <document-element url="${d}" name="Document${index}">.</document-element>
      `)}
      `;
    }

    async open(e){
      var url = e.target.getAttribute("url")
      console.log(url)
      let documents = []
        this.documents = []
      for await (const subject of data[url].subjects){
        console.log(`${subject}`);
        const doc = `${subject}`
        documents.push(doc)
      }

      this.documents = documents
    }

    cutStorage(str){
      return str.replace(this.person.storage,"/")
    }

    localName(str){
      var ln = str.substring(str.lastIndexOf('#')+1);
      console.log(ln)
      ln == str ? ln = str.substring(str.lastIndexOf('/')+1) : "";
      return ln
    }

    firstUpdated(){
      var app = this;
      this.agent = new HelloAgent(this.name);
      console.log(this.agent)
      this.agent.receive = function(from, message) {
        //  console.log("messah",message)
        if (message.hasOwnProperty("action")){
          //  console.log(message)
          switch(message.action) {
            case "webIdChanged":
            app.webIdChanged(message.webId)
            break;
            case "personChanged":
            app.personChanged(message.person)
            break;
            default:
            console.log("Unknown action ",message)
          }
        }
      };
    }

    personChanged(person){
      this.person = person
    }

    webIdChanged(webId){
      this.webId = webId
      if (webId != null){
        this.updateProfile();
      }else{

      }
    }

  }

  customElements.define('flow-element', FlowElement);
