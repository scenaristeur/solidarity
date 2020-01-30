console.log("hello")
import * as auth from 'solid-auth-client';
import data from "@solid/query-ldflex";

export class Shighl {

  constructor() {
    this.webId = null
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

  testCallBack(cb){
    var test = 12
    cb(test)
  }


  get amortization() {
    let monthlyPayment = this.monthlyPayment;
    let monthlyRate = this.rate / 100 / 12;
    let balance = this.principal;
    let amortization = [];
    for (let y=0; y<this.years; y++) {
      let interestY = 0;
      let principalY = 0;
      for (let m=0; m<12; m++) {
        let interestM = balance * monthlyRate;
        let principalM = monthlyPayment - interestM;
        interestY = interestY + interestM;
        principalY = principalY + principalM;
        balance = balance - principalM;
      }
      amortization.push({principalY, interestY, balance});
    }
    return amortization;
  }

}
