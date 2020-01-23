import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";
import { namedNode } from '@rdfjs/data-model';

class InboxElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      webId: {type: String},
      friends: {type: Array},
      messagesFiles: {type: Array},
      messages: {type: Array},
      lang: {type: String},
    };
  }

  constructor() {
    super();
    this.something = "Inbox"
    this.webId = null
    this.friends = []
    this.messages = []
    this.messagesFiles = []
    this.lang=navigator.language
  }

  render(){

    const friendList = (friends) => html`
    <h5>Friends (${friends.length})</h5>
    ${friends.map((f) => html`${this.templateFriend(f)}`)}
    `;

    const messageList = (messages) => html`
    <h5>Messages (${messages.length}/${this.messagesFiles.length})</h5>
    <table id="messages"  style="height: 250px">
    <tr>
    <th><div>Sender</div></th>
    <th><div>Title</div></th>
    <th><div>Content</div></th>
    <th><div>Date</div></th>
    </tr>


    ${this.messages.length == 0 ?
      html`<tr><td colspan="4">Inbox Loading... (${this.messagesFiles.length} messages)</td></tr>`
      :html `${messages.reverse().map((m) => html`${this.templateMessageEntete(m)}`)}
      `
    }

    </table>
    `;
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">

    <style>
    #writePan{
      display:none;
      padding: 20px;
    }
    #writePan input, #writePan textarea{
      padding: 5px;
      margin: 5px;
    }
    #messages {
      font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    #messages td, #messages th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    #messages tr:nth-child(even){background-color: #f2f2f2;}
    #messages tr:hover {background-color: #ddd;}
    #messages th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #4CAF50;
      color: white;
    }
    /* scrolltable rules */
    table  { margin-top:  20px; display: inline-block; overflow: auto; }
    th div { margin-top: -20px; position: absolute; }

    /* design */
    table { border-collapse: collapse; }
    </style>



    <h4>${this.something}</h4>
    ${this.webId == null ?
      html`You must login to acces your inbox`
      :html`
      <h6>${this.webId}</h6>

      <button @click="${this.notifyMe}">Notify me!</button>

      ${messageList(this.messages)}

      <!------------------->

      ${friendList(this.friends)}
      <div id="writePan">

      <input id="to" placeholder="Recipient" size="51"></input><br>
      <input id="title" placeholder="Title" size="51"></input><br>
      <textarea id="messageContent" rows="4" cols="50" placeholder="Content"></textarea><br>
      <button @click=${this.send}>Send</send>
      </div>

      `
    }


    `;
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

  webIdChanged(webId){
    this.webId = webId
    if (webId != null){
      this.updateInbox();
    }else{
      this.inbox = ""
      this.friends = []
      this.messages = []
      this.socket = null
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
    app.socket.onmessage = function(msg) {
      if (msg.data && msg.data.slice(0, 3) === 'pub') {
        app.notification("nouveau message Socialid")
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

  templateMessageEntete(m){
    return html`
    <tr>
    <td><a href="${m.sender}" target="_blank">${m.senderName}</a></td>
    <td><a href="${m.url}" target="_blank">${m.label}</a></td>
    <td>${m.text}</td>
    <td>${m.date}</td>
    </tr>
    `
  }

  write(e){
    this.recipient = e.target.getAttribute("inbox")
    this.shadowRoot.getElementById("writePan").style.display = "block"
    this.shadowRoot.getElementById("to").value=this.recipient
  }

  mailTo(pod){
    console.log(pod)
    this.shadowRoot.getElementById("writePan").style.display = "block"
    this.shadowRoot.getElementById("to").value=pod.inbox
  }

  async send(){
    var message = {}
    message.date = new Date(Date.now())
    message.id = message.date.getTime()
    message.sender = this.webId
    message.recipient = this.shadowRoot.getElementById("to").value.trim()
    message.content = this.shadowRoot.getElementById("messageContent").value.trim()
    message.title = this.shadowRoot.getElementById("title").value.trim()
    message.url = message.recipient+message.id+".ttl"
    this.shadowRoot.getElementById("to").value = ""
    this.shadowRoot.getElementById("title").value = ""
    this.shadowRoot.getElementById("messageContent").value = ""
    this.shadowRoot.getElementById("writePan").style.display = "none"
    if(message.content.length > 0 && message.title.length > 0 && message.recipient.length > 0){

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
    }catch(e){
      alert(e)
    }
  }

  notification(notificationMessage){
    var notification = new Notification(notificationMessage);
  }

  async readInbox(){
    this.messagesFiles = []
    for await (const mess of data[this.inbox]['ldp$contains']){
      //  console.log("YEAR",`${year}`);
      if ( `${mess}`.endsWith('/log.ttl') == false){
        var message = `${mess}`
        //messages.push(message)
        this.messagesFiles = [... this.messagesFiles, message]
      }
    }
    this.messagesFiles.sort(function(a, b) { //tri par date
      return a - b;
    });
    //console.log(messages)
    //  let inboxFolder = await this.fc.readFolder(`${this.inbox}`)
    //this.messagesFiles = messages
    //  this.messagesFiles = inboxFolder.files;
    await this.getMessagePreview()
  }

  async getMessagePreview(){
    var app = this
    //  var messages = []
    for await (const url of this.messagesFiles){
      console.log(`${url}`)
      var m = {}
      /*  if (m.name != "log.ttl"){
      const url = m.url*/
      m.url = url

      m.dateSent = new Date(await data[url].schema$dateSent)
      m.date = m.dateSent.toLocaleString(app.lang)
      m.label = await data[url].rdfs$label
      m.sender = await data[url].schema$sender

      m.text = await data[url].schema$text
      m.senderName = await data[m.sender].vcard$fn;
      m.filename = m.url.split("/").pop().split('.')[0]
      //  console.log(m)
      this.messages = [... this.messages, m]


      //  }*/
    }
    this.messages.sort(function(a, b) { //tri par date
      var a = parseInt(a.filename);
      var b = parseInt(b.filename);
      //  console.log(a,b, a-b)
      return a - b;
    });
    //this.messages = messages
  }

}

customElements.define('inbox-element', InboxElement);
