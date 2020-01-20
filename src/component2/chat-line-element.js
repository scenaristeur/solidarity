import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

class ChatLineElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      url: {type: String},
      doc: {type: Array},
            lang: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "Doc Element"
    this.url = ""
    this.doc = []
      this.lang=navigator.language
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">

    <li class="list-group-item">

    ${this.doc.map((d) => html`

      ${this.localName(d.property) == "created" ?
      html`Date : ${new Date(d.values[0]).toLocaleTimeString(this.lang)}`
      :html``
    }
    ${this.localName(d.property) == "maker" ?
    html`${this.maker(d.values[0])}`
    :html``
  }
  ${this.localName(d.property) == "content" ?
  html`${this.localName(d.values[0])}`
  :html``
}

<p class="card-text">
${d.values.map((v) => html`


  ${((this.localName(d.property) != "content") && (this.localName(d.property) != "created") && (this.localName(d.property) != "maker")) ?
  html` <!--   ${this.localName(d.property)} :
  <a href="${v}" target="_blank">${this.localName(v)}</a>-->
  1 ${d.property} : ${v}
  <br>
  `
  :html`

  `
}

`)}
</p>

`)}

</li>
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


maker(webId){
/*  <!--${this.getName(webId)} -->*/
  return html  `
  <small><a href=${webId} target="_blank">${webId}</a></small>

  `
}


async getName(webId){
  const n = await data[webId].vcard$fn || webId.split("/")[2].split('.')[0];
  console.log("Nom", `${n}`)
  return `${n}`
}

async updateDocument(){
  var doc = []
  this.doc=[]
  for await (const property of data[this.url].properties)
  {
    var values = []
    for await (const val of data[this.url][`${property}`])
    {
      /*if(`${val}` == "http:/schema.org/AgreeAction" && `${val}` == "http:/schema.org/DisagreeAction"){
      d.likeAction = true
    }*/

    values.push(`${val}`)
  }
  var d = {property: `${property}` , values: values}
  doc.push(d)
}
this.doc = doc
}

localDate(d){
//  console.log(d)
  d = new Date(d).toLocaleTimeString(this.lang)
//  console.log(d)
  return d
}
localName(str){
  if(str != undefined){
    var ln = str.substring(str.lastIndexOf('#')+1);
    ln == str ? ln = str.substring(str.lastIndexOf('/')+1) : "";
    //  ln == "me" ? ln =  : "";
  }else{
    ln = "--"
  }
  return ln
}


}

customElements.define('chat-line-element', ChatLineElement);
