import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

class ChatSelectElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      source: {type:String},
      instances: {type: Array},
      discover: {type: Object}
    };
  }

  constructor() {
    super();
    this.something = "ChatSelectElement"
    this.source= ""
    this.instances = []
    this.discover = {}
  }

  render(){
    return html`
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <h4>${this.something}</h4>
    ${this.source}
    ${this.instances.map((i) => html`
      ${i.classe == "http://www.w3.org/ns/pim/meeting#LongChat" ?
      html`
      <div class = "row">
      <button type="button"
      class="btn btn-primary btn-sm"
      url="${i.object}"
      classe = "${i.classe}"
      @click="${this.open}">${this.cutStorage(i.object)}</button>(${this.localName(i.classe)})
      </div>
      `
      :html``
    }`
  )}`;
}


open(e){
  this.discover.url = e.target.getAttribute('url')
  this.discover.classe = e.target.getAttribute('classe')
  this.agent.send("Flow", {action: "discoverChanged", discover:this.discover})
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
        default:
        console.log("Unknown action ",message)
      }
    }
  };
  this.loadData()
}


async loadData(){
  console.log(this.source)
  this.storage = await data[this.source].storage;
  const publicTypeIndex = await data[this.source].publicTypeIndex || "undefined"
  console.log(publicTypeIndex)
  let instances = []
  try{
    if (`${publicTypeIndex}` != "undefined"){

      for await (const subject of data[publicTypeIndex].subjects){
        //  console.log(`${subject}`);
        if (`${publicTypeIndex}` != `${subject}`) {
          const s = {subject: `${subject}`}
          for await (const property of subject.properties)
          {
            if (`${property}` == "http://www.w3.org/ns/solid/terms#instance")    {
              //  console.log( "--",`${property}`);
              const instance = await data[subject][`${property}`]
              const classe = await data[subject].solid$forClass
              //  console.log( "--nn",`${instance}`);
              s.predicate = `${property}`
              s.object = `${instance}`
              s.classe = `${classe}`
            }
          }
          instances.push(s)
        }
      }
    }
  }catch(e){
    console.log(e)
  }
  console.log(instances)

  this.instances = instances

}


webIdChanged(webId){
  this.webId = webId
  if (webId != null){
    this.updateProfile();
  }else{

  }
}

cutStorage(str){
  return str.replace(this.storage,"/")
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

customElements.define('chat-select-element', ChatSelectElement);
