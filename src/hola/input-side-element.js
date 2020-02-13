import { LitElement, html } from 'lit-element';
import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";
import { namedNode } from '@rdfjs/data-model';

class InputSideElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      type: {type: String},
      discover: {type: Object}
    };
  }

  constructor() {
    super();
    this.something = "Input Side Element"
    this.type = ""
    this.discover = {}
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">

    <style>
    i{
      padding-top:5px;
      padding-right:5px;
    }
    #radioBtn .notActive{
      color: #3276b1;
      background-color: #fff;
    }
    </style>
    <div class="input-group">

    <!--    <label for="exampleFormControlTextarea1">Example textarea</label>-->
    <div class="col-10">
    <textarea class="form-control form-control-sm" id="textarea" rows="4"></textarea>
    </div>
    <!--  <input type="text" class="form-control"
    placeholder="Recipient's username"
    aria-label="Recipient's username" aria-describedby="basic-addon2">-->

    <div id="radioBtn" class="btn-group shadow-sm btn-group-vertical">

    <div class="row text-right">
    <i class="fas fa-check text-success" ?hidden=${this.type != "chatter"}></i>
    <a class="btn btn-primary btn-sm notActive" value="News" @click="${this.changePostType}">NEWS</a>
    </div>
    <div class="row text-right">
    <i class="fas fa-check text-success" ?hidden=${this.type != "questions"}></i>
    <a class="btn btn-primary btn-sm notActive" value="Event" @click="${this.changePostType}">EVENT</a>
    </div>
    <div class="row text-right">
    <i class="fas fa-check text-success" ?hidden=${this.type != "topics"}></i>
    <a class="btn btn-primary btn-sm notActive" value="People" @click="${this.changePostType}">PEOPLE</a>
    </div>
    <div class="row text-right">
    <i class="fas fa-check text-success" ?hidden=${this.type != "polls"}></i>
    <a class="btn btn-primary btn-sm notActive" value="Activity" @click="${this.changePostType}">ACTIVITY</a>
    </div>
    <!--  <button class="btn btn-outline-secondary" type="button">Button</button>-->
    </div>




    </div>




    `;
  }


  firstUpdated(){
    var app = this;
    this.agent = new HelloAgent(this.name);
    this.agent.receive = function(from, message) {
      if (message.hasOwnProperty("action")){
        //  console.log(message)
        switch(message.action) {
          case "reply":
          app.reply(message.replyTo)
          break;
          case "discoverChanged":
          app.discover= message.discover
          console.log(this.discover)
          break;

          default:
          console.log("Unknown action ",message)
        }
      }
    };

  }


  async reply(replyTo){
    //  console.log(replyTo)
    this.replyTo = replyTo.url
    var notifDestInbox = await data[replyTo.maker].inbox
    this.notifDestInbox = `${notifDestInbox}`
    //  console.log(this.notifDestInbox)
    this.discover = replyTo.discover
  }

  clearReplyTo(){
    this.replyTo = ""
    this.notifDestInbox =""
  }

  changePostType(e){
    var app = this
    this.postType = e.target.getAttribute("value")
    var buttons = this.shadowRoot.querySelectorAll("#radioBtn a")
    buttons.forEach(function(b){
      var v = b.getAttribute("value")
      if (v == app.postType){
        b.classList.add("active")
        b.classList.remove("notActive")
      }else{
        b.classList.remove("active")
        b.classList.add("notActive")
      }
    })
    this.send()
  }


  async send(){
    console.log(this.discover)
    try {
      var webid = await data.user
      console.log(`${webid}`)
      this.webId = `${webid}`

      var content = this.shadowRoot.getElementById("textarea").value.trim()
      if (content.length > 0){
        var dateObj = new Date();
        var messageId = "#Msg"+dateObj.getTime()
        var month = ("0" + (dateObj.getUTCMonth() + 1)).slice(-2); //months from 1-12
        var day = ("0" + dateObj.getUTCDate()).slice(-2);
        var year = dateObj.getUTCFullYear();
        var path = this.discover.folder+[year, month, day, ""].join("/")
        var url = path+"chat.ttl"+messageId
        var date = dateObj.toISOString()
        var index = this.discover.folder+"index.ttl#this"
        await data[url].dct$created.add(date)
        await data[url].sioc$content.add(content)
        await data[url].foaf$maker.add(namedNode(`${webid}`))
        await data.from(url)[index]['http://www.w3.org/2005/01/wf/flow#message'].add(namedNode(url))
        //  var postType = this.shadowRoot.querySelector('input[name="inlineRadioOptions"]:checked').value
        if (this.postType != "InstantMessage"){
          await data[url].rdfs$type.add(namedNode('http://rdfs.org/sioc/types#'+this.postType))
        }

        if (this.replyTo != undefined && this.replyTo.length >0){
          await data[url].rdfs$type.add(namedNode('https://schema.org/Comment'))
          await data[url].schema$parentItem.add(namedNode(this.replyTo)) // schema$parentItem plante le chat solid
          await data[this.replyTo].schema$comment.add(namedNode(url))

          try{
            // post notification
            var message = {}
            message.recipient =  this.notifDestInbox
            message.title = "Solidarity notification reply"
            message.content = "A new reply has been posted on Solidarity about your post ' "+this.replyTo+" '. \n You can find it here : ' "+url+"."

            if( message.recipient.length > 0){
              message.date = new Date(Date.now())
              message.id = message.date.getTime()
              message.sender = this.webId
              message.url = message.recipient+message.id+".ttl"
              await this.buildMessage(message)
              this.replyTo = ""
            }else{
              alert("Recipient  empty")
            }



          }catch(e){
            alert(e)
          }

        }
        this.agent.send("Dialog", {action:"close"})
        this.shadowRoot.getElementById("textarea").value = ""
        //  this.shadowRoot.getElementById("inlineRadio1").checked = true

      }
      //reinit buttons
      this.postType = "InstantMessage"
      var buttons = this.shadowRoot.querySelectorAll("#radioBtn a")
      buttons.forEach(function(b){
        //  console.log(b)
        b.classList.remove("active")
        b.classList.add("notActive")
      })




    }catch(e){
      alert(e)
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



  keydown(e){
    if (e.keyCode === 13) {
      e.preventDefault();
      this.send()
    }
  }
}

customElements.define('input-side-element', InputSideElement);
