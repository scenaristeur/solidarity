import { LitElement, html } from 'lit-element';
import { HelloAgent } from '../agents/hello-agent.js';
import  Shighl  from 'shighl'

class FriendsShighl extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      webId : {type: String},
      friends: {type: Array}
    };
  }

  constructor() {
    super();
    this.something = "Friends with Shighl Api"
    this.webId = null
    this.friends = []
  }

  render(){
    return html`

    <div ?hidden=${this.webId==null}>
    <h4>${this.something}</h4>
    Me : ${this.webId} <button @click="${this.getAllFriends}">Get Friends</button>
    <br><br>
    ${this.friends.map((f,index) => html`
      ${index} : ${f.webId} <button webId="${f.webId}" @click="${this.getAllFriends}">Get Friends</button><br>
      `)}
      </div>
      `;


    }

    firstUpdated(){
      this.sh = new Shighl()
      this.sh.trackSession(this.tracksessioncallback.bind(this))
      var app = this;
      this.agent = new HelloAgent(this.name);
      console.log(this.agent)
    }

    tracksessioncallback(webId){
      console.log(webId)
      this.webId = webId
      /*if (this.webId != null){
      this.sh.getFriends(this.updateFriends.bind(this))
    }*/
  }

  async getAllFriends(e){
    var webId = e.target.getAttribute("webId") || this.webId
    console.log(webId)
    this.agent.send("PublicTypeIndex", {action:"webIdChanged", webId:webId})
    var friends = await this.sh.getFriends(webId)
    this.updateFriends(friends)
  }


  updateFriends(friends){
    console.log(friends)
    this.friends = friends
  }



}

customElements.define('friends-shighl', FriendsShighl);
