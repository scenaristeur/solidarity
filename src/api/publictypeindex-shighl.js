import { LitElement, html } from 'lit-element';
import { HelloAgent } from '../agents/hello-agent.js';
import { Shighl } from './shighl.js'

class PublictypeindexShighl extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      webId : {type: String},
      publicTypeIndex:{type: Object}
    };
  }

  constructor() {
    super();
    this.something = "PublicTypeIndex with api"
    this.webId = null
    this.publicTypeIndex = {instances:[]}
  }

  render(){
    return html`
    <h4>${this.something}</h4>
    webId: ${this.webId}
    publicTypeIndex (${this.publicTypeIndex.instances.length}):

    <table>
    ${this.publicTypeIndex.instances.map((i,index) => html`
      <tr>
      <td>${index}</td>
      <td>${i.shortClasse}</td>
      <td>${i.name}</td>
      <td><button instance="${i.object}" classe="${i.shortClasse}" @click="${this.open}">Open</button></td>
      <td><a href="${i.object}" target="_blank">${i.object}</a></td>

      </tr>
      `)}
      </table>
      `;
    }


    open(e){
      var instance = e.target.getAttribute("instance")
      var classe = e.target.getAttribute("classe")
      console.log(instance, classe)
      this.agent.send("Main", {action: "instanceChanged", instance: instance, classe: classe})
    }

    firstUpdated(){
      var app = this;
      this.agent = new HelloAgent(this.name);
      console.log(this.agent)
      this.sh = new Shighl()
      console.log(this.sh)
      this.agent.receive = function(from, message) {
        //  console.log("messah",message)
        if (message.hasOwnProperty("action")){
          //  console.log(message)
          switch(message.action) {
            case "webIdChanged":
            app.webIdChanged(message.webId)
            break;
            default:
            console.log("Unknown action ",message)
          }
        }
      };
    }

    async  webIdChanged(webId){
      this.webId = webId
      if (webId != null){
        this.publicTypeIndex = await this.sh.getPublicTypeIndex(webId)
        console.log(this.publicTypeIndex)
        //  this.updateProfile();
      }
    }

  }

  customElements.define('publictypeindex-shighl', PublictypeindexShighl);
