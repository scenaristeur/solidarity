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


  async getFriends(webId = this.webId){
    console.log(webId)
    this.friends = []
    for await (const fwebid of data[webId].friends){
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


  async getPublicTypeIndex(webId){
    console.log(webId)
    var pti = {}
    pti.url = await data[webId].publicTypeIndex
    try{
      if (`${pti.url}` != "undefined"){
        pti.instances = []
        for await (const subject of data[pti.url].subjects){
          //  console.log(`${subject}`);
          if (`${pti.url}` != `${subject}`) {
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
            pti.instances.push(s)
          }
        }
      }
    }catch(e){
      console.log(e)
    }
    return pti
  }

  localName(str){
    var ln = str.substring(str.lastIndexOf('#')+1);
    //console.log(ln)
    ln == str ? ln = str.substring(str.lastIndexOf('/')+1) : "";
    return ln
  }

  testCallBack(cb){
    var test = "this is a test for your callback"
    cb(test)
  }

}
