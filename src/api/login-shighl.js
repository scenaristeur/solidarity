import { LitElement, html } from 'lit-element';

import { Shighl } from './shighl.js'


class LoginShighl extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      webId : {type: String},
      username : {type: String}
    };
  }

  constructor() {
    super();
    this.something = "Login with Shighl Api"
    this.webId = null
    this.username = null
  }

  render(){
    return html`
    <h4>${this.something}</h4>
    <button @click="${this.login}">Login</button>
    <button @click="${this.logout}">Logout</button>
    <button @click="${this.getName}">Get Name</button>
    <br>
    webId : ${this.webId}<br>
    username : ${this.username}
    `;
  }

  firstUpdated(){
    this.sh = new Shighl()
    console.log(this.sh)
    this.sh.testCallBack(this.cb)
    this.sh.trackSession(this.tracksessioncallback.bind(this))
    console.log("webid",this.sh.getWebId)
  }

  cb(data){
    console.log(data)
  }

  tracksessioncallback(webId){
    console.log(webId)
    this.webId = webId
  }

  login(){
    this.sh.login(this.whenlogin)
  }

  logout(){
    this.sh.logout(this.whenlogout)
  }

  whenlogin(webId){
    alert("You are now logged with"+webId)
  }
  whenlogout(){
    alert("you are out !")
    this.username = null
  }

  async getName(){
    var name = await this.sh.getName()
    console.log (name)
    this.username = name
  }
}

customElements.define('login-shighl', LoginShighl);
