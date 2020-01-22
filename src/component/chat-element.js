import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

import './document-element.js'
import './chat-line-element.js'
import './input-element.js'

class ChatElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      pod: {type: Object},
      documents:  {type: Object},
      classe: {type: String},
      discover: {type: Object},
      info: {type: String},
      lang: {type: String},
      scrolled: {type: Boolean},
      chatOwner: {type: String}
    };
  }

  constructor() {
    super();
    this.pod = {instances: []}
    this.documents = []
    this.classe = ""
    this.discover = {years:[], months:[], days: []}
    this.info = "Choose a chat in the ChatsElement panel."+
    " Those chats are stored in the https://solidarity.inrupt.net/public/ folder."+
    " You can also click on one of your friends to see his chats in ChatsElement"
    this.lang=navigator.language
    this.scrolled = false
    this.chatOwner = "https://solidarity.inrupt.net/profile/card#me"
  }

  render(){
    return html`
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/fontawesome/css/all.css" rel="stylesheet">

    <style>
    body,html{
      height: 100%;
      margin: 0;
      background: #7F7FD5;
      background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
      background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
    }

    .chat{
      margin-top: auto;
      margin-bottom: auto;
    }
    .card{
      height: 80vh;
      border-radius: 15px !important;
      background-color: rgba(0,0,0,0.3) !important;
    }
    .contacts_body{
      padding:  0.75rem 0 !important;
      overflow-y: auto;
      white-space: nowrap;
    }
    .msg_card_body{
      overflow-y: auto;
      background-color: #dddde1
    }
    .card-header{
      border-radius: 15px 15px 0 0 !important;
      border-bottom: 0 !important;
    }
    .card-footer{
      border-radius: 0 0 15px 15px !important;
      border-top: 0 !important;
    }
    .container{
      align-content: center;
    }
    .search{
      border-radius: 15px 0 0 15px !important;
      background-color: rgba(0,0,0,0.3) !important;
      border:0 !important;
      color:white !important;
    }
    .search:focus{
      box-shadow:none !important;
      outline:0px !important;
    }
    .type_msg{
      background-color: rgba(0,0,0,0.3) !important;
      border:0 !important;
      color:white !important;
      height: 60px !important;
      overflow-y: auto;
    }
    .type_msg:focus{
      box-shadow:none !important;
      outline:0px !important;
    }
    .attach_btn{
      border-radius: 15px 0 0 15px !important;
      background-color: rgba(0,0,0,0.3) !important;
      border:0 !important;
      color: white !important;
      cursor: pointer;
    }
    .send_btn{
      border-radius: 0 15px 15px 0 !important;
      background-color: rgba(0,0,0,0.3) !important;
      border:0 !important;
      color: white !important;
      cursor: pointer;
    }
    .search_btn{
      border-radius: 0 15px 15px 0 !important;
      background-color: rgba(0,0,0,0.3) !important;
      border:0 !important;
      color: white !important;
      cursor: pointer;
    }
    .contacts{
      list-style: none;
      padding: 0;
    }
    .contacts li{
      width: 100% !important;
      padding: 5px 10px;
      margin-bottom: 15px !important;
    }
    .active{
      background-color: rgba(0,0,0,0.3);
    }
    .user_img{
      height: 70px;
      width: 70px;
      border:1.5px solid #f5f6fa;

    }
    .user_img_msg{
      height: 40px;
      width: 40px;
      border:1.5px solid #f5f6fa;

    }
    .img_cont{
      position: relative;
      height: 70px;
      width: 70px;
    }
    .img_cont_msg{
      height: 40px;
      width: 40px;
    }
    .online_icon{
      position: absolute;
      height: 15px;
      width:15px;
      background-color: #4cd137;
      border-radius: 50%;
      bottom: 0.2em;
      right: 0.4em;
      border:1.5px solid white;
    }
    .offline{
      background-color: #c23616 !important;
    }
    .user_info{
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 15px;
    }
    .user_info span{
      font-size: 20px;
      color: white;
    }
    .user_info p{
      font-size: 10px;
      color: rgba(255,255,255,0.6);
    }
    .video_cam{
      margin-left: 50px;
      margin-top: 5px;
    }
    .video_cam span{
      color: white;
      font-size: 20px;
      cursor: pointer;
      margin-right: 20px;
    }
    .msg_cotainer{
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 10px;
      border-radius: 25px;
      background-color: #82ccdd;
      padding: 10px;
      position: relative;
    }
    .msg_cotainer_send{
      margin-top: auto;
      margin-bottom: auto;
      margin-right: 10px;
      border-radius: 25px;
      background-color: #78e08f;
      padding: 10px;
      position: relative;
    }
    .msg_time{
      position: absolute;
      left: 0;
      bottom: -15px;
      color: rgba(255,255,255,0.5);
      font-size: 10px;
    }
    .msg_time_send{
      position: absolute;
      right:0;
      bottom: -15px;
      color: rgba(255,255,255,0.5);
      font-size: 10px;
    }
    .msg_head{
      position: relative;
    }
    #action_menu_btn{
      position: absolute;
      right: 10px;
      top: 10px;
      color: white;
      cursor: pointer;
      font-size: 20px;
    }
    .action_menu{
      z-index: 1;
      position: absolute;
      padding: 15px 0;
      background-color: rgba(0,0,0,0.5);
      color: white;
      border-radius: 15px;
      top: 30px;
      right: 15px;
      /*  display: none;*/
    }
    .action_menu ul{
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .action_menu ul li{
      width: 100%;
      padding: 10px 15px;
      margin-bottom: 5px;
    }
    .action_menu ul li i{
      padding-right: 10px;

    }
    .action_menu ul li:hover{
      cursor: pointer;
      background-color: rgba(0,0,0,0.2);
    }
    @media(max-width: 576px){
      .contacts_card{
        margin-bottom: 15px !important;
      }
    }
    </style>

    <!--
    <div class="container-fluid h-100">
    <div class="row justify-content-center h-100">
    -->
    <div class="col-12 chat">
    <div class="card">
    <div class="card-header msg_head">
    <div class="d-flex bd-highlight">
    <!--<div class="img_cont">
    <img src="" class="rounded-circle user_img">
    <span class="online_icon"></span>
    </div>
    <div class="user_info">
    <span>Chat with Khalid</span>
    <p>1767 Messages</p>
    </div>
    <div class="video_cam">
    <span><i class="fas fa-video"></i></span>
    <span><i class="fas fa-phone"></i></span>
    </div>-->
    <div class="col alert alert-primary" role="alert">
    ${this.info}
    <!--    ${this.chatOwner}-->
    </div>
    <div class="col">
    ${this.discover.years.map((y) =>
      html `
      <button type="button"
      class="btn btn-secondary btn-sm"
      year="${y}"
      @click="${this.setCurrentYear}">${y}</button>
      `)}
      <br>
      ${this.discover.months.map((m) =>
        html `
        <button type="button"
        class="btn btn-light btn-sm"
        month="${m}"
        @click="${this.setCurrentMonth}">${m}</button>
        `)}
        <br>
        ${this.discover.days.map((d) =>
          html `
          <button type="button"
          class="btn btn-info btn-sm"
          day="${d}"
          @click="${this.setCurrentDay}">${d}</button>
          `)}
          </div>

          </div>

          <span id="action_menu_btn" @click="${this.openmenu}" menu="menuPrincipal"><i class="fas fa-ellipsis-v"  menu="menuPrincipal"></i></span>
          <div id="menuPrincipal" class="action_menu d-none">
          <ul>
          <li><i class="fas fa-user-circle"></i> View profile</li>
          <li><i class="fas fa-users"></i> Add to close friends</li>
          <li><i class="fas fa-plus"></i> Add to group</li>
          <li><i class="fas fa-ban"></i> Block</li>
          </ul>
          </div>

          </div>
          <div class="card-body msg_card_body">

          ${this.discover.classe != "http://www.w3.org/ns/pim/meeting#LongChat" ?
          html`

          ${this.documents.map((d, index) => html`
            <document-element url="${d}" name="Document${index}">.</document-element>
            `)}
            `
            :html`
            <div id="scroller" @scroll="${this.onScroll}">
            <!--   <ul class="list-group">-->
            ${this.documents.map((d, index) => html`
              ${d.split('#')[1].startsWith('Msg') ?
              html `<chat-line-element url="${d}" name="ChatLine${index}" chatOwner="${this.chatOwner}">.</chat-line-element>`
              :html ``
            }
            `)}
            <!--  </ul> -->
            </div>
            `}

            </div>
            <div class="card-footer">
            <input-element name="Input" .discover=${this.discover}></input-element>
            </div>
            </div>
            </div>
            <!--	</div>
            </div>-->


            `;
          }


          openmenu(e){
            var cibleName = e.target.getAttribute("menu")
            var menu = this.shadowRoot.getElementById(cibleName)
            menu.classList.contains("d-none") ? menu.classList.remove("d-none") : menu.classList.add("d-none")
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

          async open(){
            var app = this

            switch(this.discover.classe) {
              case "http://www.w3.org/ns/pim/meeting#LongChat":
              app.socket = null
              await  this.openLongChat()
              //    app.subscribe()
              break;
              case "http://schema.org/TextDigitalDocument":
              case "http://schema.org/MediaObject":
              case "http://www.w3.org/2002/01/bookmark#Bookmark":
              default:
              await this.openDefault()
            }
            this.info=this.documents.length+" documents of type "+this.localName(this.discover.classe)
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
            this.info=this.documents.length+" documents of type "+this.localName(this.discover.classe)
          }


          async showChat(){
            var app = this
            var path = this.discover.folder+[this.discover.year,this.discover.month,this.discover.day,""].join('/')
            //  console.log(path)
            //console.log("Clear")
            await data.clearCache()
            let chatfile = await data[path]['ldp$contains'];
            //  console.log("ChatFile",`${chatfile}`);
            this.info = "Looking for chatfile"
            this.documents = []
            var docs = []
            var discovurl = app.discover.url
            for await (const subject of data[chatfile].subjects){
              console.log("subject", `${subject}` );
              if ( `${subject}` != discovurl){ // ne semble pas fonctionner ??
                docs = [... docs, `${subject}`]
                //console.log(docs)
              }
            }
            //  console.log(docs)

            this.documents = docs
            //  this.requestUpdate()

            //  setInterval(this.updateScroll(scroller),1000);

            this.info=this.documents.length+" documents of type "+this.localName(this.discover.classe)
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
          this.info=this.documents.length+" documents of type "+this.localName(this.discover.classe)
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

        discoverChanged(discover){
          this.discover = discover
          console.log(discover)
          this.open()
        }

        async   firstUpdated(){
          var app = this;
          this.init();
          this.agent = new HelloAgent(this.name);
          this.agent.receive = function(from, message) {
            if (message.hasOwnProperty("action")){
              switch(message.action) {
                case "discoverChanged":
                app.discoverChanged(message.discover)
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

        podChanged(pod){
          this.chatOwner = pod.webId
          this.init()
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


        async    init(){
          var p = {}
          console.log(this.chatOwner)
          if (this.chatOwner != null){
            //https://github.com/solid/query-ldflex/blob/master/demo/user.html
            p.chatOwner = `${this.chatOwner}`
            //  console.log("###",p)
            const n = await data[this.chatOwner].vcard$fn || p.chatOwner.split("/")[2].split('.')[0];
            const img = await data[this.chatOwner].vcard$hasPhoto || "";
            const inbox = await data[this.chatOwner].inbox;
            const storage = await data[this.chatOwner].storage;
            p.name = `${n}`
            p.img = `${img}`
            p.inbox = `${inbox}`
            p.storage = `${storage}`
            //  p.publicIndex = `${publicTypeIndex}`
            //  this.pod = p
            const publicTypeIndex = await data[this.chatOwner].publicTypeIndex || "undefined"
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
                      }
                    }
                    instances.push(s)
                  }
                }
              }
            }catch(e){
              console.log(e)
            }
            p.instances = instances
            this.pod = p
            console.log(this.pod)

          }
        }

      }

      customElements.define('chat-element', ChatElement);
