import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

class ChatLineElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      url: {type: String},
      other: {type: Array},
      lang: {type: String},
      maker: {type: String},
      date: {type: String},
      content: {type: String},
      type: {type: String},
      makername: {type: String},
      makerimg: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "Doc Element"
    this.url = ""
    this.other = []
    this.lang=navigator.language
    this.maker = "http://xmlns.com/foaf/0.1/maker"
    this.date = "http://purl.org/dc/terms/created"
    this.content = "http://rdfs.org/sioc/ns#content"
    this.type = "rdfs:type"
    this.makername = "webid.vcard$fn"
    this.makerimg = ""
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">


    <li class="list-group-item small">

    <div class="row">
    <div class="col-1">
    <a href="${this.maker}" target="_blank">
    ${this.makerimg.length > 0 ?
      html`<img src="//images.weserv.nl/?url=${this.makerimg}&w=32&h=32" title="${this.makerimg}">`
      :html`<i class="fas fa-user-circle fa-2x" title="${this.makername}"></i>`
    }
    <br>
    ${this.makername}</a>
    </div>

    <div class="col">

    ${this.content}
    <!--  <div class="row">
    ${this.other.map((d) => html`
      Other : ${d.property} ${d.values}<br>`
    )}
    </div>-->
    </div>

    <div class="col-2">
    ${new Date(this.date).toLocaleTimeString(this.lang)}<br>
    ${this.type != "rdfs:type" && this.type != "undefined" ?
    html `${this.localName(this.type)}<br>`
    :html``
  }
  </div>
  </div>


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




async getName(webId){
  const n = await data[webId].vcard$fn || webId.split("/")[2].split('.')[0];
  console.log("Nom", `${n}`)
  return `${n}`
}

async updateDocument(){
  var app = this
  var doc=[]
  for await (const property of data[this.url].properties)
  {
  //  console.log("Prop",`${property}`)
    switch(`${property}`) {
      case "http://xmlns.com/foaf/0.1/maker":
      var maker = await data[this.url][`${property}`]
      var makername = await data[`${maker}`].vcard$fn
      var makerimg = await data[`${maker}`].vcard$hasPhoto || "";
      app.maker = `${maker}`
      app.makername = `${makername}`
      app.makerimg = `${makerimg}`
      break;
      case "http://purl.org/dc/terms/created":
      var date = await data[this.url][`${property}`]
      app.date = `${date}`
      break;
      case "http://rdfs.org/sioc/ns#content":
      var content = await data[this.url][`${property}`]
      app.content = `${content}`
      break;
      case "http://www.w3.org/2000/01/rdf-schema#type":
      var type = await data[this.url][`${property}`]
      app.type = `${type}`
      break;
      default:
    //  console.log("default", this.url)
      var values = []
      for await (const val of data[this.url][`${property}`])
      {
        /*if(`${val}` == "http:/schema.org/AgreeAction" && `${val}` == "http:/schema.org/DisagreeAction"){
        d.likeAction = true
      }*/
      values.push(`${val}`)
      console.log(`${values}`)
    }

    this.other = [... this.other, {property: `${property}` , values: values}]
  }

}

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
