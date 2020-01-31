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
                //  s.path = `${instance}`.split("/")
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

  async getPages(folder){
    var pages = {}
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

    pages.years = years.sort()
    pages.months = months.sort()
    pages.days = days.sort()
    pages.year = last_year
    pages.month = last_month
    pages.day = last_day
    pages.folder = folder
    return pages
  }

  async getMessages(pages){
    var messages = []
    console.log(pages)
    var path = pages.folder+[pages.year,pages.month,pages.day,""].join('/')
    //  console.log(path)
    //console.log("Clear")
    await data.clearCache()
    let chatfile = await data[path]['ldp$contains'];
    //  console.log("ChatFile",`${chatfile}`);

    for await (const subject of data[chatfile].subjects){
      //  console.log("subject", `${subject}` );
      if ( `${subject}` != pages.instance){ // ne semble pas fonctionner ??
        messages = [... messages, `${subject}`]
        //console.log(docs)
      }
    }
    //  console.log(docs)
messages.sort().reverse()
    console.log(messages)
    return messages
  }

  async messageDetails(msgurl){
    console.log(msgurl)
    var details = {}
    details.date = await data[msgurl]['http://purl.org/dc/terms/created']
    return details
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
