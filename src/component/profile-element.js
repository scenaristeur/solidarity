import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

class ProfileElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      webId: {type: String},
      person: {type: Object}
    };
  }

  constructor() {
    super();
    this.something = "ProfileElement"
    this.person = {instances:[]}
  }

  render(){
    return html`
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <br>
    <b>${this.something}</b>
    <br>
    Nom :   ${this.person.name} <br>
    my indexes :
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

    `;
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
          default:
          console.log("Unknown action ",message)
        }
      }
    };
  }

  webIdChanged(webId){
    this.webId = webId
    if (webId != null){
      this.updateProfile();
    }else{

    }
  }

  open(e){
    var url = e.target.getAttribute("url")
    console.log(url)
    this.agent.send("Messages", {action:"info", info: url})
  }

  async updateProfile(){
    var p = {}
    if (this.webId != null){
      //https://github.com/solid/query-ldflex/blob/master/demo/user.html
      p.webId = `${this.webId}`
      const n = await data[this.webId].vcard$fn || p.webId;
      const img = await data[this.webId].foaf$img || "";
      const inbox = await data[this.webId].inbox;
      const storage = await data[this.webId].storage;
      p.name = `${n}`
      p.img = `${img}`
      p.inbox = `${inbox}`
      p.storage = `${storage}`
      //  p.publicIndex = `${publicTypeIndex}`


      const publicTypeIndex = await data[this.webId].publicTypeIndex
      //  console.log(`${publicTypeIndex}`);

      let instances = []
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
                s.classe = `${classe}` || null
              }
            }
            instances.push(s)
          }
        }
      }
      p.instances = instances
      this.person = p
      console.log(this.person)
    }
  }
}

customElements.define('profile-element', ProfileElement);
