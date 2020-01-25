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
    this.something = "Doc Element"
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
      height: 500px;
      border-radius: 15px !important;
      background-color: rgba(0,0,0,0.4) !important;
    }
    .contacts_body{
      padding:  0.75rem 0 !important;
      overflow-y: auto;
      white-space: nowrap;
    }
    .msg_card_body{
      overflow-y: auto;
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
      color: rgba(0,0,0,0.5);
      font-size: 10px;
    }
    .msg_time_send{
      position: absolute;
      right:0;
      bottom: -15px;
      color: rgba(0,0,0,0.5);
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
      width: 300px;
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

    <!--<span id="action_menu_btn" @click="${this.openmenu}" menu="menuPrincipal"><i class="fas fa-plus"  menu="menuPrincipal"></i></span>
    <div id="menuPrincipal" class="action_menu d-none" >
    <ul>
    <li><i class="fas fa-user-circle"></i> View profile</li>
    <li><i class="fas fa-users"></i> Add to close friends</li>
    <li><i class="fas fa-plus"></i> Add to group</li>
    <li><i class="fas fa-ban"></i> Block</li>
    </ul>
    </div>-->


    ${this.maker == this.webId ?
      html`
      <div class="d-flex justify-content-end mb-4">
      <div class="msg_cotainer_send">
      <div class="row d-none d-lg-block">
      ${this.types.length > 0 ?
        html `
        ${this.types.map((t, index) =>
          html`
          <button type="button" class="btn btn-outline-dark btn-sm">${this.localName(t)}</button>
          `)}
          `
          :html``
        }
        </div>

        ${this.content}



        <div class="row">
        <div class="col">
        ${this.comments.length > 0 ?
          html `
          ${this.comments.length} com:
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
        <!--  ${this.other.map((d) => html`Other : ${d.property} ${d.values}<br>`)}-->
        <div>

        <button class="btn btn-primary btn-sm" @click="${this.reply}">
        <i class="fas fa-reply " ></i></button>    
        <a class="btn btn-primary btn-sm" href="${this.url}" target="_blank">
        <i class="fas fa-link" ></i></a>
        <a class="btn btn-primary btn-sm"
        href="https://scenaristeur.github.io/spoggy-simple/?source=${this.url}" target="_blank">
        <i class="fas fa-project-diagram"></i>
        </a>
        </div>


        <span class="msg_time_send">${new Date(this.date).toLocaleTimeString(this.lang)}<!--8:55 AM, Today--></span>
        </div>
        <div class="img_cont_msg d-none d-lg-block">
        ${this.makerimg.length > 0 ?
          html`<img class="rounded-circle user_img_msg" src="//images.weserv.nl/?url=${this.makerimg}&w=32&h=32" title="${this.makerimg}" alt="no image">`
          :html`<i class="fas fa-user-circle fa-2x" title="${this.makername}"></i>`
        }
        </div>
        </div>
        `
        :html`
        <div class="d-flex justify-content-start mb-4">
        <div class="img_cont_msg">
        <a href="${this.maker}" target="_blank">
        ${this.makerimg.length > 0 ?
          html`<img class="rounded-circle user_img_msg" src="//images.weserv.nl/?url=${this.makerimg}&w=32&h=32" title="${this.makerimg}" alt="no image">`
          :html`<i class="fas fa-user-circle fa-2x" title="${this.makername}"></i>`
        }
        </a>
        </div>
        <div class="msg_cotainer">

        <div class="row d-none d-lg-block">
        ${this.types.length > 0 ?
          html `${this.types.map((t, index) =>
            html`<button type="button" class="btn btn-outline-dark btn-sm">${this.localName(t)}</button>
            `)}
            `
            :html``
          }
          </div>

          <small><b>${this.makername} : </b></small>

          ${this.content}

          <div class="row">
          <div class="col">
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
          </div>
          <!--  ${this.other.map((d) => html`Other : ${d.property} ${d.values}<br>`)}-->
          <div>


          ${this.webId != null ?
            html`  <button class="btn btn-primary btn-sm" @click="${this.reply}">
            <i class="fas fa-reply" ></i></button>`
            :html``
          }

          <a class="btn btn-primary btn-sm" href="${this.url}" target="_blank">
          <i class="fas fa-link" ></i></a>
          </div>
          <span class="msg_time">${new Date(this.date).toLocaleTimeString(this.lang)}</span>
          </div>
          </div>
          `}

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
                app.date = `${date}`
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
