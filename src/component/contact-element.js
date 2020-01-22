// load thumbnail instead of full image https://github.com/blueimp/JavaScript-Load-Image#demo

import { LitElement, html, css } from 'lit-element';
import { HelloAgent } from '../agents/hello-agent.js';

import data from "@solid/query-ldflex";

class ContactElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      webId: {type: String},
      pod: {type: Object}
    };
  }

  constructor() {
    super();
    this.webId = null
    this.pod = {img:""}
  }

  static get styles() {
    //https://lit-element.readthedocs.io/en/v0.6.5/_guide/styles/
    return css`
    /* Selects the host element */
    :host{
      background-color: rgba(128, 255, 255, .5);
    }
    img{
      height:32px;
      width:32px;
      border-radius: 50%;
    }
    `;
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
      height: 50px;
      width: 50px;
      border:1.5px solid #f5f6fa;

    }
    .user_img_msg{
      height: 40px;
      width: 40px;
      border:1.5px solid #f5f6fa;

    }
    .img_cont{
      position: relative;
      height: 40px;
      width: 40px;
    }
    .img_cont_msg{
      height: 40px;
      width: 40px;
    }
    .online_icon{
      position: absolute;
      height: 10px;
      width:10px;
      background-color: #4cd137;
      border-radius: 50%;
      bottom: -0.3em;
      right: -0.4em;
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

/*adapt revoir le css au dessus */
li{
  width: 100% !important;
  padding: 5px 10px;
  margin-bottom: 15px !important;
}

    </style>

    <li ><!--class="active"-->
      <div class="d-flex bd-highlight" @click="${this.details.bind(this)}">
        <div class="img_cont">

        ${this.pod.img.length > 0 ?
          html`
          <!-- REduce the profile image https://images.weserv.nl/docs/-->
          <img class="rounded-circle user_img" src="//images.weserv.nl/?url=${this.pod.img}&w=70&h=70" title="${this.webId}" alt="Can not access image profile">
          <!--<img src="${this.pod.img}" title="${this.webId}" alt="image">-->

          `
          :html`<i class="fas fa-user-circle fa-3x" title="${this.webId}"></i>`
        }
          <span class="online_icon"></span>
        </div>
        <div class="user_info">
          <span>${this.pod.name}</span>
          <p>online</p>
        </div>
      </div>
    </li>

    `;
  }

  async firstUpdated(){
    var app = this;

    var p = {}
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
      this.pod = p
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
      //  console.log(this.pod)
    }



    this.agent = new HelloAgent(this.name);
    console.log(this.agent)
    this.agent.receive = function(from, message) {

      if (message.hasOwnProperty("action")){
        switch(message.action) {
          case "info":
          app.addInfo(from, message)
          break;
          default:
          console.log("Unknown action ",message)
        }
      }
    };

  }

  details(e){
    console.log( this.pod.webId, this.pod.instances)
    //  console.log(await data[this.webId])
    this.agent.send("Messages", {action:"info", info: this.pod})
//    this.agent.send("Flow", {action:"podChanged", pod: this.pod})
    this.agent.send("Chats", {action:"webIdChanged", webId: this.pod.webId})
  }

}

customElements.define('contact-element', ContactElement);
