import { LitElement, html } from 'lit-element';

import { Shighl } from './shighl.js'


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
    <h4>${this.something}</h4>
    <button @click="${this.getAllFriends}">Get Friends</button>
    <br>
    ${this.friends.map((f,index) => html`
      ${index} : ${f.webId}<br>
      `)}
      `;
    }

    firstUpdated(){
      this.sh = new Shighl()
      this.sh.trackSession(this.tracksessioncallback.bind(this))
    }

    tracksessioncallback(webId){
      console.log(webId)
      this.webId = webId
      /*if (this.webId != null){
      this.sh.getFriends(this.updateFriends.bind(this))
    }*/
  }

  async getAllFriends(){
    var friends = await this.sh.getFriends()
    this.updateFriends(friends)
  }


  updateFriends(friends){
    console.log(friends)
    this.friends = friends
  }



}

customElements.define('friends-shighl', FriendsShighl);
