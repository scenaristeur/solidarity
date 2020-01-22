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
      type: {type: Array},
      makername: {type: String},
      makerimg: {type: String},
      comments: {type: Array},
      parentItem: {type: Array}
    };
  }

  constructor() {
    super();
    this.something = "Doc Element"
    this.url = ""
    this.other = []
    this.lang=navigator.language
    this.maker = ""
    this.date = ""
    this.content = ""
    this.types = []
    this.makername = ""
    this.makerimg = ""
    this.comments = []
    this.parentItem = ""
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">


    <li class="list-group-item small" id="${this.url}">

    <div class="row">
    <div class="col-1">
    <a href="${this.maker}" target="_blank">
    ${this.makerimg.length > 0 ?
      html`<img src="//images.weserv.nl/?url=${this.makerimg}&w=32&h=32" title="${this.makerimg}" alt="no image">`
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
  ${this.types.length > 0 ?
    html `
    ${this.types.map((t, index) => html`
      ${this.localName(t)}<br>
      `
    )}
    `
    :html``
  }
  <button class="btn btn-primary btn-sm" @click="${this.reply}">
  <i class="fas fa-reply" ></i></button>
  <a class="btn btn-primary btn-sm" href="${this.url}" target="_blank">
  <i class="fas fa-link" ></i></a>
  </div>
  </div>
  <div class="row">
  <div class="col">
  ${this.comments.length > 0 ?
    html `
     ${this.comments.length} comment(s)
    ${this.comments.map((c, index) => html`
      <a href="${c}" target="_blank">${index}</a>
      `)}
    `
    :html``
  }
  </div>
  <div class="col">
  ${this.parentItem != "" && this.parentItem != "undefined" ?
  html `<a href="${this.parentItem}" target="_blank">Parent</a><br>`
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


reply(e){
  console.log(this.url)
  this.agent.send("Input", {action: "reply", replyTo: this.url})
}


async updateDocument(){
  var app = this
  var doc=[]

  //filtre les messages
  if (this.url.split('#')[1].startsWith('Msg')){
    for await (const property of data[this.url].properties)
    {
      console.log("Prop",`${property}`)
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
        for await (const type of data[this.url][`${property}`])
        {
          console.log("Type",`${type}`)
          app.types = [... app.types, `${type}`]
        }
        break;
        case "http://schema.org/parentItem":
        case "http://schema.org/target":
        var parentItem = await data[this.url][`${property}`]
        app.parentItem = `${parentItem}`
        break;
        case "http://schema.org/comment":
        for await (const comment of data[this.url][`${property}`])
        {
          console.log("Comment",`${comment}`)
          app.comments = [... app.comments, `${comment}`]
        }
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
else{
  console.log("je ne traite pas encore les messages document de type",this.url)
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
