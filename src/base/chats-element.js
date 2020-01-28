import { LitElement, html } from 'lit-element';
import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

//import './new-channel-element.js'

class ChatsElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      webId: {type: String},
      pod: {type: Object},
      discover: {type: Object},
    };
  }

  constructor() {
    super();
    this.something = "Channels"
    this.webId = "https://solidarity.inrupt.net/profile/card#me"
    this.pod = {instances: []}
    this.discover = {years:[], months:[], days: []}
  }

  render(){
    return html`
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/fontawesome/css/all.css" rel="stylesheet">

    ${this.webId != "https://solidarity.inrupt.net/profile/card#me" ?
    html`<button class="btn btn-primary btn-sm" @click="${this.restore}">
    Back to default Channels</button>`
    :html``}

    ${this.pod.instances.length>0 ?
      html `
      <h5>${this.something}</h5>
      <!--
      <new-channel-element name="NewChannel"></new-channel-element>-->

      <ul class="nav nav-pills">
      ${this.pod.instances.map((i) => html`
        <li class="active">
        <button type="button"
        class="btn btn-info btn-sm instance"
        url="${i.object}"
        classe = "${i.classe}"
        @click="${this.open}">
        ${this.cutStorage(i.object)}<!--<br>
        ${i.shortClasse.toLowerCase()}-->
        </button>
        </li>
        ` )}
        </ul>
        `
        :html`
        <i class="fas fa-hourglass-half"></i> Loading instances... Please wait & if it's too long refresh...
        `
      }

      `;
    }

    open(e){

      this.resetDiscover()
      this.discover.url = e.target.getAttribute("url")
      this.discover.classe = e.target.getAttribute("classe")
      this.discover.folder = this.discover.url.substring(0,this.discover.url.lastIndexOf('/')+1)
      this.agent.send("Flow", {action: "discoverChanged", discover: this.discover})
      this.agent.send("Chat", {action: "discoverChanged", discover: this.discover})
      this.agent.send("InputSimple", {action: "discoverChanged", discover: this.discover})

    }

    restore(){
      this.webIdChanged("https://solidarity.inrupt.net/profile/card#me")
    }

    resetDiscover(){
      var dateObj = new Date();
      var month = ("0" + dateObj.getUTCMonth() + 1).slice(-2); //months from 1-12
      var day = ("0" + dateObj.getUTCDate()).slice(-2);
      var year = dateObj.getUTCFullYear();
      this.discover.year = year
      this.discover.month = month
      this.discover.day = day
      this.discover.years = []
      this.discover.months = []
      this.discover.days = []
      this.discover.loop = 10
    }

    firstUpdated(){
      var app = this;
      this.init();
      this.agent = new HelloAgent(this.name);
      this.agent.receive = function(from, message) {
        //  console.log("messah",message)
        if (message.hasOwnProperty("action")){
          //  console.log(message)
          switch(message.action) {
            case "webIdChanged":
            app.webIdChanged(message.webId)
            break;
            case "podChanged":
            app.podChanged(message.pod)
            break;
            default:
            console.log("Unknown action ",message)
          }
        }
      };
    }

    webIdChanged(webId){
      this.webId = webId
      console.log(webId)
      if (this.webId != null){
        this.init()
      }
    }

    async    init(){
      var p = {}
      console.log(this.webId)
      if (this.webId != null){
        //https://github.com/solid/query-ldflex/blob/master/demo/user.html
        p.webId = `${this.webId}`
        //  console.log("###",p)
        const n = await data[this.webId].vcard$fn || p.webId.split("/")[2].split('.')[0];
        const img = await data[this.webId].vcard$hasPhoto || "";
        const inbox = await data[this.webId].inbox;
        const storage = await data[this.webId].storage;
        p.name = `${n}`
        p.img = `${img}`
        p.inbox = `${inbox}`
        p.storage = `${storage}`
        //  p.publicIndex = `${publicTypeIndex}`
        //  this.pod = p
        const publicTypeIndex = await data[this.webId].publicTypeIndex || "undefined"
        //  console.log(`${publicTypeIndex}`);

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
                    s.shortClasse = this.localName(s.classe)
                  }
                }
                if(s.shortClasse == "LongChat"){
                  instances.push(s)
                }

              }
            }
          }
        }catch(e){
          console.log(e)
        }

        instances.sort(function(a, b) { //tri par date
          console.log(a.shortClasse,b.shortClasse)
          return a.shortClasse - b.shortClasse;
        });
        p.instances = instances
        this.pod = p
        console.log(this.pod)

      }
    }

    cutStorage(str){
      var splitted = str.split("/")
      return splitted[4]
    }

    localName(str){
      var ln = str.substring(str.lastIndexOf('#')+1);
      //console.log(ln)
      ln == str ? ln = str.substring(str.lastIndexOf('/')+1) : "";
      return ln
    }

  }

  customElements.define('chats-element', ChatsElement);
