import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

import './document-element.js'
import './chat-line-element.js'
import './input-element.js'

class FlowElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      person: {type: Object},
      documents:  {type: Object},
      classe: {type: String},
      discover: {type: Object},
      info: {type: String},
      lang: {type: String},
      scrolled: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.something = "Flow Element"
    this.person = {instances: []}
    this.documents = []
    this.classe = ""
    this.discover = {years:[], months:[], days: []}
    this.info = "Select a friend to view his feeds ->"
    this.lang=navigator.language
    this.scrolled = false
  }

  render(){
    return html`
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <h4>${this.something}</h4>
    ${this.person.name}<br>

    <div class="alert alert-primary" role="alert">
    ${this.info}
    </div>

    ${this.person.instances.map((i) => html`
      <div class = "row">
      <div class = "col">

      <button type="button"
      class="btn btn-primary btn-sm"
      url="${i.object}"
      classe = "${i.classe}"
      @click="${this.open}">${this.cutStorage(i.object)}</button>(${this.localName(i.classe)})
      </div>
      </div>
      `
    )}

    <br>
    ${this.discover.years.map((y) =>
      html `
      <button type="button"
      class="btn btn-primary btn-sm"
      year="${y}"
      @click="${this.setCurrentYear}">${y}</button>
      `)}
      <br>
      ${this.discover.months.map((m) =>
        html `
        <button type="button"
        class="btn btn-primary btn-sm"
        month="${m}"
        @click="${this.setCurrentMonth}">${m}</button>
        `)}
        <br>
        ${this.discover.days.map((d) =>
          html `
          <button type="button"
          class="btn btn-primary btn-sm"
          day="${d}"
          @click="${this.setCurrentDay}">${d}</button>
          `)}


          ${this.discover.classe != "http://www.w3.org/ns/pim/meeting#LongChat" ?
          html`

          ${this.documents.map((d, index) => html`
            <document-element url="${d}" name="Document${index}">.</document-element>
            `)}
            `
            :html`
            <div id="scroller" @scroll="${this.onScroll}" style="height: 400px; overflow-y: scroll;">
            ${this.documents.map((d, index) => html`
              <ul class="list-group">
              <chat-line-element url="${d}" name="ChatLine${index}">.</chat-line-element>
              </ul>

              `)}
              </div>
              <input-element name="Input" .discover=${this.discover}></input-element>

              `}

              `;
            }

            async  setCurrentYear(e){
              this.info="Updating Year"
              var y = e.target.getAttribute('year')
              this.discover.year = y
              this.documents =[]
              await this.showChat()
            }

            async setCurrentMonth(e){
              this.info="Updating Month"
              var m = e.target.getAttribute('month')
              this.discover.month = m
              this.documents =[]
              await this.showChat()
            }
            async setCurrentDay(e){
              this.info="Updating Day"
              var d = e.target.getAttribute('day')
              this.discover.day = d
              this.documents =[]
              await this.showChat()
            }

            async open(e){
              var app = this
              this.resetDiscover()
              this.discover.url = e.target.getAttribute("url")
              this.discover.classe = e.target.getAttribute("classe")
              this.discover.folder = this.discover.url.substring(0,this.discover.url.lastIndexOf('/')+1)
              //  console.log(this.discover)
              switch(this.discover.classe) {
                case "http://www.w3.org/ns/pim/meeting#LongChat":
                app.socket = null
                await  this.openLongChat()
                app.subscribe()
                break;
                case "http://schema.org/TextDigitalDocument":
                case "http://schema.org/MediaObject":
                case "http://www.w3.org/2002/01/bookmark#Bookmark":
                default:
                await this.openDefault()
              }
              this.info=this.documents.length+" documents of type "+this.discover.classe
            }


            async subscribe(){
              var app = this
              var websocket = "wss://"+this.discover.url.split('/')[2];
              var url = this.discover.folder+[this.discover.year,this.discover.month,this.discover.day,"chat.ttl"].join('/')

              app.socket = new WebSocket(websocket);
              app.socket.onopen = function() {
                const d = new Date();
                var now = d.toLocaleTimeString(app.lang)
                this.send('sub '+url);
                console.log("subscribe to ",websocket, url)
                app.agent.send('Messages',  {action:"info", info: now+"[souscription] "+url});
              };
              app.socket.onmessage = function(msg) {
                console.log(msg)
                if (msg.data && msg.data.slice(0, 3) === 'pub') {
                  //  app.notification("nouveau message Socialid")
                  app.openLongChat()
                }
              };


            }


            async openLongChat(e){
              console.log("openChat")
              var app = this
              var folder = this.discover.folder
              //YEAR
              var years = []
              for await (const year of data[folder]['ldp$contains']){
                //  console.log("YEAR",`${year}`);
                if ( `${year}`.endsWith('/')){
                  var localyear = this.localName(`${year}`.slice(0, -1))
                  years.push(localyear)
                }
              }
              //  console.log(years)
              var last_year = Math.max(...years)

              //MONTH
              var months = []
              for await (const month of data[folder+last_year+'/']['ldp$contains']){
                //  console.log("MONTH",`${month}`);
                if ( `${month}`.endsWith('/')){
                  var localmonth = this.localName(`${month}`.slice(0, -1))
                  months.push(localmonth)
                }
              }
              //  console.log(months)
              var last_month = ("0" + Math.max(...months)).slice(-2)

              //DAY
              var days = []
              for await (const day of data[folder+last_year+'/'+last_month+'/']['ldp$contains']){
                //  console.log("DAY",`${day}`);
                if ( `${day}`.endsWith('/')){
                  var localday = this.localName(`${day}`.slice(0, -1))
                  days.push(localday)
                }
              }
              //console.log(days)
              var last_day = ("0" + Math.max(...days)).slice(-2)
              //  console.log("Last day",last_day)

              this.discover.years = years.sort()
              this.discover.months = months.sort()
              this.discover.days = days.sort()
              this.discover.year = last_year
              this.discover.month = last_month
              this.discover.day = last_day

              //  console.log(this.discover)
              //  this.documents =[]
              await this.showChat()
              this.info=this.documents.length+" documents of type "+this.discover.classe
            }


            async showChat(){
              var app = this
              var path = this.discover.folder+[this.discover.year,this.discover.month,this.discover.day,""].join('/')
              //  console.log(path)
              console.log("Clear",await data.clearCache())
              let chatfile = await data[path]['ldp$contains'];
              //  console.log("ChatFile",`${chatfile}`);
              this.info = "Looking for "+chatfile

              var docs = []
              for await (const subject of data[chatfile].subjects){
                console.log("subject",`${subject}`);
                if ( `${subject}` != app.discover.url){
                  docs = [... docs, `${subject}`]
                  //console.log(docs)
                }
              }
              //  console.log(docs)
              this.documents = docs
              this.requestUpdate()

              //  setInterval(this.updateScroll(scroller),1000);

              this.info=this.documents.length+" documents of type "+this.discover.classe
this.scroll = false;
              this.updateScroll();

              /*  if (this.documents.length < 10 && this.discover.loop > 0){
              this.discover.day --
              this.discover.loop --
              console.log(this.discover)
              this.showChat()
            }*/
          }

          updateScroll(){
            console.log("timout")
            var app = this
            var scroller = app.shadowRoot.getElementById("scroller")
            setTimeout(function() {
              console.log("scroll", app.scrolled, scroller.scrollTop, scroller.clientHeight)
              var scrolltemp = app.scrolled
              if(app.scrolled ==false && scroller.scrollTop < scroller.scrollHeight){
                scroller.scrollTop = scroller.scrollHeight;
                console.log(scroller.scrollTop)
              }
              app.scrolled = scrolltemp
            }, 5000);
          }

          onScroll(){
            this.scrolled=true;
          //  console.log(this.scrolled)
          }

          async openDefault(e){

            let documents = []
            this.documents = []
            for await (const subject of data[this.discover.url].subjects){
              //  console.log(`${subject}`);
              const doc = `${subject}`
              documents.push(doc)
            }
            this.documents = documents
            this.info=this.documents.length+" documents of type "+this.discover.classe
          }

          cutStorage(str){
            return str.replace(this.person.storage,"/")
          }

          localName(str){
            var ln = str.substring(str.lastIndexOf('#')+1);
            //console.log(ln)
            ln == str ? ln = str.substring(str.lastIndexOf('/')+1) : "";
            return ln
          }



          firstUpdated(){
            var app = this;

            this.agent = new HelloAgent(this.name);
            //  console.log(this.agent)
            this.agent.receive = function(from, message) {
              //  console.log("messah",message)
              if (message.hasOwnProperty("action")){
                //  console.log(message)
                switch(message.action) {
                  case "webIdChanged":
                  app.webIdChanged(message.webId)
                  break;
                  case "personChanged":
                  app.personChanged(message.person)
                  break;
                  default:
                  console.log("Unknown action ",message)
                }
              }
            };

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

          personChanged(person){
            this.person = person
            this.info = "Now click on a feed to see its content"
            this.resetDiscover()
          }

          webIdChanged(webId){
            this.webId = webId
            if (webId != null){
              this.updateProfile();
            }else{

            }
          }

        }

        customElements.define('flow-element', FlowElement);
