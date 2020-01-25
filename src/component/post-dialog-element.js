//https://gist.github.com/ErikHellman/9e17f2ea6a78669294ef2af4bc3f5878
//https://vaadin.com/learn/tutorials/lit-element/lit-element-templating-properties-and-events
import { LitElement, html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map'
import { HelloAgent } from '../agents/hello-agent.js';

import data from "@solid/query-ldflex";
import { namedNode } from '@rdfjs/data-model';


class PostDialogElement extends LitElement {

  static get properties () {
    return {
      name: {type: String},
      opened: {type: Boolean},
      webId: {type: String}
    }
  }

  constructor () {
    super()
    this.name = ""
    this.opened = false
    this.webId = null
  }




  render () {
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <style>
    /* The Modal (background) */
    .modal {
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 1050; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      left: -16px;
      top: -16px;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }
    /* Modal Content */
    .modal-content {
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      min-width: 320px
    }
    .content{
      overflow = 'auto';
      maxHeight = '100px'
    }

    /* The Close Button */
    .close {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }

    .opened {
      display: flex;
    }
    .closed {
      display: none;
    }
    .dialog {
      flex-direction: column;
      border: 2px outset black;
      padding: 1em;
      margin: 1em;
    }
    .buttons {
      display: flex;
      flex-direction: row;
    }
    .accept {
      justify-content: space-around;
      align-content: space-around;
    }
    .cancel {
      justify-content: space-around;
      align-content: space-around;
    }

    @media(max-width:767px){
      .dialog {
        padding: 0em;
      }
      .modal-content {
        padding-top: 20px;
        padding-bottom: 20px;
        width: 100%;
      }
    }


    </style>


    <div class="${classMap({dialog: true, opened: this.opened, closed: !this.opened, modal: true})}">
    <div class="modal-content">
    <h6 class="m-0 font-weight-bold text-primary title">New Spog
    <i @click="${() => this.dispatchEvent(new CustomEvent('dialog.cancel'))}" class="close fas fa-window-close"></i>
    </h6>
    <div>
    <!--  <post-tabs-element name="PostTabs"></post-tabs-element>-->

    <div id="writePan">

    <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">Recipient</span>
  </div>
  <input type="text" id="to" placeholder="Recipient" class="form-control"  aria-label="Recipient" aria-describedby="basic-addon1">
</div>

<div class="input-group mb-3">
<div class="input-group-prepend">
<span class="input-group-text" id="basic-addon1">Title</span>
</div>
<input type="text" id="title" placeholder="Title" class="form-control" aria-label="Title" aria-describedby="basic-addon1">
</div>
<!--
<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">With textarea</span>
  </div>-->
  <textarea id="messageContent" class="form-control" aria-label="With textarea" placeholder="Say something..."></textarea>
<!--</div>-->



  <!--  <input id="to" placeholder="Recipient" size="51"></input><br>
    <input id="title" placeholder="Title" size="51"></input><br>
    <textarea  rows="4" cols="50" placeholder="Content"></textarea><br>-->
    <button class="btn btn-primary" @click=${this.send}>Send</send>

    </div>


    </div>
    </div>
    </div>`
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
          case "mailTo":
          app.mailTo(message.pod)
          break;
          default:
          console.log("Unknown action ",message)
        }
      }
    };
  }

  mailTo(pod){
    console.log(pod)
    //this.shadowRoot.getElementById("writePan").style.display = "block"
    this.shadowRoot.getElementById("to").value=pod.inbox
  }



  async send(){
    console.log("send")
    var message = {}

    message.recipient = this.shadowRoot.getElementById("to").value.trim()
    message.content = this.shadowRoot.getElementById("messageContent").value.trim()
    message.title = this.shadowRoot.getElementById("title").value.trim()
    if(message.content.length > 0 && message.title.length > 0 && message.recipient.length > 0){
      message.date = new Date(Date.now())
      message.id = message.date.getTime()
      message.sender = this.webId
      message.url = message.recipient+message.id+".ttl"
      this.buildMessage(message)
    }else{
      alert("Recipient or title or content is empty")
    }

  }

  async   buildMessage(message){
    var mess = message.url
    console.log(message)
    try{
      await data[mess].schema$text.add(message.content);
      await data[mess].rdfs$label.add(message.title)
      await data[mess].schema$dateSent.add(message.date.toISOString())
      await data[mess].rdf$type.add(namedNode('https://schema.org/Message'))
      await data[mess].schema$sender.add(namedNode(this.webId))
      var notif = message.recipient+"log.ttl#"+message.id
      await data[notif].schema$message.add(namedNode(mess))
      this.agent.send("Dialog", {action: "close"})
      this.shadowRoot.getElementById("to").value = ""
      this.shadowRoot.getElementById("title").value = ""
      this.shadowRoot.getElementById("messageContent").value = ""
    }catch(e){
      alert(e)
    }
  }

  webIdChanged(webId){
    this.webId = webId
  }


}

customElements.define('post-dialog-element', PostDialogElement)
