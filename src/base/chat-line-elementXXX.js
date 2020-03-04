import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

class ChatLineElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      webId: {type: String},
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
      parentItem: {type: Array},
      discover: {type: Object}
    };
  }

  constructor() {
    super();
    this.url = ""
    this.webId = null
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
    this.discover = {}
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">

<!-- see
https://getbootstrap.com/docs/4.0/layout/media-object/#alignment
<ul class="list-unstyled">
  <li class="media">
    <img class="mr-3" src="..." alt="Generic placeholder image">
    <div class="media-body">
      <h5 class="mt-0 mb-1">List-based media object</h5>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </div>
  </li>
  <li class="media my-4">
    <img class="mr-3" src="..." alt="Generic placeholder image">
    <div class="media-body">
      <h5 class="mt-0 mb-1">List-based media object</h5>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </div>
  </li>
  <li class="media">
    <img class="mr-3" src="..." alt="Generic placeholder image">
    <div class="media-body">
      <h5 class="mt-0 mb-1">List-based media object</h5>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </div>
  </li>
</ul>
-->


    <div class="row">
    <div class="col-1">
    <a href="${this.maker}" target="_blank">
    ${this.makerimg.length > 0 ?
      html`<img class="rounded-circle user_img_msg" src="//images.weserv.nl/?url=${this.makerimg}&w=29&h=29"
      title="${this.makerimg}" alt="no image">`
      :html`<i class="fas fa-user-circle fa-2x" title="${this.makername}"></i>`
    }
    </a>
    </div>

    <div class="col">
    <div style="position:absolute; width:auto; height:auto;  text-align:left;">
    <font face="Arial, Helvetica, sans-serif" style="color:#855FFA;
    font-size:13px;font-weight:bold;">
    <span>${this.makername}
    </span> </font> </div>

    <div style="position:relative;
    padding-top:15px; padding-bottom: 5px; width:auto; height:auto;
    text-align:left;">
    <font face="Arial, Helvetica, sans-serif" style="color:#303030; font-size:13px;font-weight:bold;">
    <span>
    ${this.content}
    </span>
    </font> </div>
    </div>

    <div class="col-2">
    <div class="row">
    <font face="Arial, Helvetica, sans-serif" style="color:#A5A5A5; font-size:13px;font-weight:bold;">
    <div class="col text-left"  style="top:20px">${this.date}</div> </font>
    <div class="col text-right" style="top:20px">
    <i class="fas fa-reply" @click="${this.reply}"></i>
    <i class="fas fa-ellipsis-v"></i></div>
    </div>
    </div>

    <!--
    <div class="col-1">
    <div style="position:absolute;  top:10px; width:auto;height:auto;text-align:left;">

    <br>


    <a class="btn btn-primary btn-sm" href="${this.url}" target="_blank">
    <i class="fas fa-link" ></i></a>
    <a class="btn btn-primary btn-sm"
    href="https://scenaristeur.github.io/spoggy-simple/?source=${this.url}" target="_blank">
    <i class="fas fa-project-diagram"></i>
    </a>

    ${this.types.length > 0 ?
    html `${this.types.map((t, index) =>
    html`<button type="button" class="btn btn-outline-dark btn-sm">${this.localName(t)}</button>
    `)}
    `
    :html``
  }

  ${this.comments.length > 0 ?
  html `
  <div class="row font-weight-light">
  ${this.comments.length} com: ${this.comments.map((c, index) => html`
  <a href="${c}" target="_blank">${index}</a>
  `)}
  </div>
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
</div>-->
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


openmenu(e){
  var cibleName = e.target.getAttribute("menu")
  var menu = this.shadowRoot.getElementById(cibleName)
  menu.classList.contains("d-none") ? menu.classList.remove("d-none") : menu.classList.add("d-none")
}

reply(e){
  console.log(this.url, this.agent, this.maker)
  //this.agent.send("Input", {action: "reply", replyTo: {url: this.url, maker: this.maker}})
  this.agent.send("Dialog", {action : "toggle", params: {action:"reply", replyTo: {url: this.url, maker: this.maker, discover: this.discover}}})
}


async updateDocument(){
  var app = this
  var doc=[]
  try {
    var webid = await data.user
    console.log(`${webid}`)
    this.webId=`${webid}`
  }catch(e){
    this.webId = null
  }


  //filtre les messages
  if (this.url.split('#')[1].startsWith('Msg')){
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
            app.date =  new Date(`${date}`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        break;
        case "http://rdfs.org/sioc/ns#content":
        var content = await data[this.url][`${property}`]
        app.content = `${content}`
        break;
        case "http://www.w3.org/2000/01/rdf-schema#type":
        for await (const type of data[this.url][`${property}`])
        {
          //  console.log("Type",`${type}`)
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
          //  console.log("Comment",`${comment}`)
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