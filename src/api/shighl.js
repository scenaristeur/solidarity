import * as auth from 'solid-auth-client';
import data from "@solid/query-ldflex";

export class Shighl {

  constructor() {
    this.webId = null
    this.friends = []
  }

  trackSession(cb) {
    var module = this
    auth.trackSession(async function(session) {
      if (!session){
        module.webId = null
      }else{
        module.webId = session.webId
      }
      cb(module.webId)
    })
  }

  login(cb) {
    this.popupLogin().then((session) => cb(session.webId));
  }

  logout(cb) {
    auth.logout().then(() => cb());
  }

  async popupLogin() {
    let session = await auth.currentSession();
    let popupUri = './dist-popup/popup.html';
    if (!session)
    {
      return session = await auth.popupLogin({ popupUri });
    }else{
      alert("You are already logged")
      return session
    }
  }

  get getWebId(){
    return this.webId
  }


  async getFriends(){
    console.log(this.webId)
    for await (const fwebid of data.user.friends){
      //  console.log(friend)
      var friend = {}
      friend.webId = `${fwebid}`
      this.friends = [... this.friends, friend]
    }
    return this.friends
  }


  async getName(){
    console.log(this.webId)
    try {
      const fullname = await data.user.vcard$fn;
      console.log(`\nNAME: ${fullname}`);
      return `${fullname}`
    }catch(e){
      return e
    }
  }

  testCallBack(cb){
    var test = "this is a test for your callback"
    cb(test)
  }

}
