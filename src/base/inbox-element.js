import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";
import { namedNode } from '@rdfjs/data-model';
import auth from 'solid-auth-client';

class InboxElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      messages: {type: Array},
      lang: {type: String},
    };
  }

  constructor() {
    super();
    this.webId = null
    this.messages = []
    this.lang=navigator.language
  }

  render(){
    const messageList = (messages) => html`
    <div class="tableFixHead table-striped table-hover table-sm">
    <table>
    <thead>
    <tr><th>Sender</th><th>Title</th><th>Content</th><th>Date</th><th>Action</th></tr>
    </thead>
    <tbody>
    ${messages.reverse().map((m) => html`${this.templateMessage(m)}`)}
    </tbody>
    </table>
    </div>
    `;
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <style>
    .tableFixHead          { overflow-y: auto; height: 400px; }
    .tableFixHead thead th { position: sticky; top: 0; }

    /* Just common table stuff. Really. */
    table  { border-collapse: collapse; width: 100%; }
    th, td { padding: 8px 16px; }
    th     { background:#eee; }
    </style>
    <h3>${this.name} (${this.messages.length})</h3>

    ${this.webId == null ?
      html`You must login to acces your inbox`
      :html`
      <div class="col alert alert-primary" role="alert">
      <small>${this.webId}</small>
      <br>
      <button  type="button" class="btn btn-primary btn-sm" @click="${this.notifyMe}">Notify me!</button>

      <a href="https://forum.solidproject.org/t/solidarity-first-shot-for-a/2581/5?u=smag0"
      target="_blank">How to get Inbox notification</a>
      </div>
      <!--
      <button type="button" class="btn btn-primary btn-sm" @click="${this.toggleWrite}"><i class="fa fa-pen"></i></button>
      -->

      ${messageList(this.messages)}
      `
    }
    `;
  }

  toggleWrite(){
    this.agent.send("Dialog", {action : "toggle", params: "toggleWrite"})
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
    this.webIdChanged(this.webId)
  }

  webIdChanged(webId){
    this.webId = webId
    if (webId != null){
      this.updateInbox();
    }else{
      this.inbox = ""
      //  this.friends = []
      this.messages = []
      this.socket = null
      this.agent.send('Base', {action:"updateInboxBtn", messagesLength: 0})
    }
  }

  async updateInbox(){
    var websocket = this.webId.split('/')[2];
    this.inbox = await data.user.inbox
    this.readInbox()
    //  this.readFriends()
    this.subscribe("wss://"+websocket)
  }

  subscribe(websocket){
    var app = this
    var log = this.inbox+"log.ttl"
    app.socket = new WebSocket(websocket);
    app.socket.onopen = function() {
      const d = new Date();
      var now = d.toLocaleTimeString(app.lang)
      this.send('sub '+log);
      app.agent.send('Messages',  {action:"info", info: now+"[souscription] "+log});
    };
    app.socket.onmessage = async function(msg) {
      if (msg.data && msg.data.slice(0, 3) === 'pub') {
        await data.clearCache()
        app.notification("Solidarity message")
        app.readInbox()
      }
    };
  }

  async readFriends(){
    var app = this
    this.friends = []
    var developper = {webid: "https://spoggy.solid.community/profile/card#me", name: "Spoggy", inbox: "https://spoggy.solid.community/inbox"}
    app.friends = [... app.friends, developper]
    for await (const friend of data.user.friends){
      const f = {}
      const n = await data[friend].vcard$fn;
      const inbox = await data[friend].inbox;
      f.webId= `${friend}`
      f.name = `${n}`
      f.inbox = `${inbox}`
      if (n ==undefined){
        f.name = `${friend}`
      }
      app.friends = [... app.friends, f]
    }
  }

  templateFriend(f){
    return html`
    <div class="friend">
    <a href="${f.webId}" target="_blank">${f.name}</a> inbox : ${f.inbox}
    ${f.inbox != "undefined" ?
    html`<button inbox="${f.inbox}" @click=${this.write}>Write</button>`
    :html``}
    </div>
    `
  }

  templateMessage(m){
    return html`

    <tr>
    <td><a href="${m.sender}" target="_blank">${m.senderName}</a></td>
    <td><a href="${m.url}" target="_blank">${m.label}</a></td>
    <td>${m.text}</td>
    <td>${m.date}</td>
    <td>
    <button class="btn btn-primary btn-sm"  url="${m.url}" @click=${this.delete}>
    <i url="${m.url}" class="far fa-trash-alt"></i></button>
    </td>
    </tr>
    `
  }


  write(e){
    this.recipient = e.target.getAttribute("inbox")
    this.shadowRoot.getElementById("writePan").style.display = "block"
    this.shadowRoot.getElementById("to").value=this.recipient
  }

  async delete(e){
    var url = e.target.getAttribute("url")
    console.log("delete",url)

    //https://github.com/inrupt/generator-solid-react/blob/1902a0483754f6b2df4d3eb040c9991cc2c92663/generators/app/templates/src/utils/ldflex-helper.js#L20
    try {
      try{
        var id = url.split("/").pop().split('.')[0]
        console.log(this.log, id)
        var path = this.log+"#"+id
        await data.from(this.log)[path]['schema:message'].delete(namedNode(url))
      }catch (e) {
        throw e;
      }
      return await auth.fetch(url, { method: 'DELETE' });
    } catch (e) {
      throw e;
    }




    /**
    * Deletes a game from a contains predicate in a specific url
    * @param {String} gameUrl Game to delete
    * @param {String} documentUrl URL of the document with a contains predicate
    */
    //  const deleteGameFromContains = async (gameUrl, documentUrl) => {
    //    await ldflex[documentUrl]['schema:hasPart'].delete(namedNode(gameUrl));
    //  };


    // https://github.com/inrupt/generator-solid-react/blob/1902a0483754f6b2df4d3eb040c9991cc2c92663/generators/app/templates/src/containers/TicTacToe/GameListPage/children/List/list.component.js#L106
    //  await data[documentUrl]['schema:hasPart'].delete(namedNode(gameUrl));
    //https://github.com/inrupt/generator-solid-react/blob/1902a0483754f6b2df4d3eb040c9991cc2c92663/generators/app/templates/src/containers/TicTacToe/GameListPage/children/List/list.component.js#L161
    //else await ldflexHelper.deleteFile(url);
    //console.log(  await data.from(url)[url]['http://schema.org/sender'].delete().pathExpression); //.pathExpression
    //  <https://spoggy.solid.community/inbox/1579788273324.ttl> <http://schema.org/sender> <https://spoggy.solid.community/profile/card#me>.


  }



  mailTo(pod){
    console.log(pod)
    this.shadowRoot.getElementById("writePan").style.display = "block"
    this.shadowRoot.getElementById("to").value=pod.inbox
  }


  notification(notificationMessage){
    var notification = new Notification(notificationMessage);
  }

  async readInbox(){

    var messages = []
    for await (const url of data[this.inbox]['ldp$contains']){
      //  console.log("YEAR",`${year}`);
      if ( `${url}`.endsWith('/log.ttl') == false){
        var m = {}
        m.url = `${url}`
        m.dateSent = new Date(await data[url].schema$dateSent)
        m.date = m.dateSent.toLocaleString(this.lang)
        m.label = await data[url].rdfs$label
        m.sender = await data[url].schema$sender

        m.text = await data[url].schema$text
        m.senderName = await data[m.sender].vcard$fn;
        //  m.filename = m.url.split("/").pop().split('.')[0]
        //  console.log(m)

        //messages.push(message)
        messages = [... messages, m]
        this.messages = messages
        this.requestUpdate()
      }else{
        this.log = `${url}`
      }
    }
    this.agent.send('Base', {action:"updateInboxBtn", messagesLength: this.messages.length})
    /*this.messages.sort(function(a, b) { //tri par date
    return a - b;
  });*/
  //console.log(messages)
  //  let inboxFolder = await this.fc.readFolder(`${this.inbox}`)
  //this.messagesFiles = messages
  //  this.messagesFiles = inboxFolder.files;
  //  await this.getMessagePreview()
}

}

customElements.define('inbox-element', InboxElement);
