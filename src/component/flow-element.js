import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';
import data from "@solid/query-ldflex";

import './document-element.js'

class FlowElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      person: {type: Object},
      documents:  {type: Object},
      classe: {type: String},
      discover: {type: Object}
    };
  }

  constructor() {
    super();
    this.something = "Flow Element"
    this.person = {instances: []}
    this.documents = []
    this.classe = ""
    this.discover = {years:[], months:[], days: []}
  }

  render(){
    return html`
    <h4>${this.something}</h4>
    ${this.person.name}<br>


    ${this.person.instances.map((i) => html`
      <div class = "row">
      <div class = "col">

      <button type="button"
      class="btn btn-primary btn-sm"
      url="${i.object}"
      classe = "${i.classe}"
      @click="${this.open}">${this.cutStorage(i.object)}</button>(${this.localName(i.classe)})
      </div>
      </div>
      `
    )}

    ${this.documents.length} documents of type ${this.classe}
    <br>
    ${this.discover.years.map((y) => html `
      <button year=${y} @click="${this.setCurrentYear}">${y}</button> |
      `)}
      <br>
      ${this.discover.months.map((m) => html `
        <button month=${m} @click="${this.setCurrentMonth}">${m}</button> |
        `)}
        <br>
        ${this.discover.days.map((d) => html `
          <button day=${d}  @click="${this.setCurrentDay}">${d}</button> |
          `)}


          ${this.documents.map((d, index) => html`
            <document-element url="${d}" name="Document${index}">.</document-element>
            `)}
            `;
          }


          async  setCurrentYear(e){
            var y = e.target.getAttribute('year')
            console.log(y)
            this.discover.year = y
            await this.showChat()
          }

          async setCurrentMonth(e){
            var m = e.target.getAttribute('month')
            console.log(m)
            this.discover.month = m
            await this.showChat()
          }
          async setCurrentDay(e){
            var d = e.target.getAttribute('day')
            console.log(d)
            this.discover.day = d
            await this.showChat()
          }



          async open(e){
            var app = this
            var url = e.target.getAttribute("url")
            this.classe = e.target.getAttribute("classe")
            console.log(url)
            var folder = url.substring(0,url.lastIndexOf('/')+1)
            console.log("FOLDER",folder)
            console.log(url.substring(0, url.lastIndexOf('#')+1))
            //YEAR
            var years = []
            for await (const year of data[folder]['ldp$contains']){
              console.log("YEAR",`${year}`);
              if ( `${year}`.endsWith('/')){
                var localyear = this.localName(`${year}`.slice(0, -1))
                years.push(localyear)
              }
            }
            console.log(years)
            var last_year = Math.max(...years)

            //MONTH
            var months = []
            for await (const month of data[folder+last_year+'/']['ldp$contains']){
              console.log("MONTH",`${month}`);
              if ( `${month}`.endsWith('/')){
                var localmonth = this.localName(`${month}`.slice(0, -1))
                months.push(localmonth)
              }
            }
            console.log(months)
            var last_month = ("0" + Math.max(...months)).slice(-2)

            //DAY
            var days = []
            for await (const day of data[folder+last_year+'/'+last_month+'/']['ldp$contains']){
              console.log("DAY",`${day}`);
              if ( `${day}`.endsWith('/')){
                var localday = this.localName(`${day}`.slice(0, -1))
                days.push(localday)
              }
            }
            console.log(days)
            var last_day = ("0" + Math.max(...days)).slice(-2)
            console.log("Last day",last_day)

            this.discover.years = years.sort()
            this.discover.months = months.sort()
            this.discover.days = days.sort()
            this.discover.year = last_year
            this.discover.month = last_month
            this.discover.day = last_day
            this.discover.folder = folder
            this.discover.url = url
            console.log(this.discover)

            await this.showChat()

            /*  for await (const month of data[`${year}`]['ldp$contains']){
            console.log("month", `${year}`, `${month}`);
            var days = []
            for await (const day of data[`${month}`]['ldp$contains']){
            console.log("day", `${year}`, `${month}`, `${day}`);
            days.push(this.localName(`${day}`.slice(0, -1)))
            console.log(days.sort())
          }
        }
        */

      }


      async showChat(){
        var app = this
        var path = this.discover.folder+[this.discover.year,this.discover.month,this.discover.day,""].join('/')
        console.log(path)
        let chatfile = await data[path]['ldp$contains'];
        console.log("ChatFile",`${chatfile}`);

        this.documents =[]
        var docs = []
        for await (const subject of data[chatfile].subjects){
          console.log("subject",`${subject}`);
          if ( `${subject}` != app.discover.url){
            /*  var doc = []
            for await (const property of data[`${subject}`].properties)
            {
            var values = []
            for await (const val of data[`${subject}`][`${property}`])
            {
            //  console.log( "--", `${val}`);
            values.push(`${val}`)
            //  console.log("!!",values)
          }
          var d = {property: `${property}` , values: values}
          doc.push(d)
        }

        var m = {}
        m.subject = `${subject}`
        m.properties = doc*/

        docs = [... docs, `${subject}`]
        console.log(docs)
      }
    }
    console.log(docs)
    this.documents = docs
    this.requestUpdate()
  }



  async open2(e){
    var url = e.target.getAttribute("url")
    this.classe = e.target.getAttribute("classe")
    console.log(url)
    var folder = url.substring(0,url.lastIndexOf('/')+1)
    console.log("FOLDER",folder)
    // find tast chat file



    //  var path = folder+[year,month,day+1,""].join('/')
    var lastmod = await data[folder]['http://purl.org/dc/terms/modified']

    console.log("lastmod",`${lastmod}`);
    var dateObj = new Date(lastmod);
    var month = ("0" + dateObj.getUTCMonth() + 1).slice(-2); //months from 1-12
    var day = ("0" + dateObj.getUTCDate()).slice(-2);
    var year = dateObj.getUTCFullYear();

    var path = folder+[year,month,day,""].join('/')
    console.log(path)
    let chatfile = await data[path]['ldp$contains'];
    console.log("ChatFile",`${chatfile}`);

    /*let chatfile = await (data[path]['ldp$contains']).catch(
    (err) => {
    console.log(err);
  })
  console.log("ChatFile",`${chatfile}`);*/

  /*  for await (const year of data[folder]['ldp$contains']){
  console.log("YEAR",`${year}`);
  if ( `${year}` != url.substring(0, url.lastIndexOf('#')+1)){

  for await (const month of data[`${year}`]['ldp$contains']){
  console.log("month", `${year}`, `${month}`);
  var days = []
  for await (const day of data[`${month}`]['ldp$contains']){
  console.log("day", `${year}`, `${month}`, `${day}`);
  days.push(this.localName(`${day}`.slice(0, -1)))
  console.log(days.sort())
}
}
}
}*/
/*
let documents = []
this.documents = []
for await (const participation of data[url]['http://www.w3.org/2005/01/wf/flow#participation']){
console.log(`${participation}`);
const doc = `${participation}`
documents.push(doc)
}
console.log(documents)
this.documents = documents*/
}


async open1(e){
  var url = e.target.getAttribute("url")
  this.classe = e.target.getAttribute("classe")
  console.log(url)
  let documents = []
  this.documents = []
  for await (const subject of data[url].subjects){
    console.log(`${subject}`);
    const doc = `${subject}`
    documents.push(doc)
  }

  this.documents = documents
}

cutStorage(str){
  return str.replace(this.person.storage,"/")
}

localName(str){
  var ln = str.substring(str.lastIndexOf('#')+1);
  console.log(ln)
  ln == str ? ln = str.substring(str.lastIndexOf('/')+1) : "";
  return ln
}

firstUpdated(){
  var app = this;
  this.agent = new HelloAgent(this.name);
  console.log(this.agent)
  this.agent.receive = function(from, message) {
    //  console.log("messah",message)
    if (message.hasOwnProperty("action")){
      //  console.log(message)
      switch(message.action) {
        case "webIdChanged":
        app.webIdChanged(message.webId)
        break;
        case "personChanged":
        app.personChanged(message.person)
        break;
        default:
        console.log("Unknown action ",message)
      }
    }
  };
  var dateObj = new Date();
  var month = ("0" + dateObj.getUTCMonth() + 1).slice(-2); //months from 1-12
  var day = ("0" + dateObj.getUTCDate()).slice(-2);
  var year = dateObj.getUTCFullYear();
  this.discover.year = year
  this.discover.month = month
  this.discover.day = day

}

personChanged(person){
  this.person = person
}

webIdChanged(webId){
  this.webId = webId
  if (webId != null){
    this.updateProfile();
  }else{

  }
}

}

customElements.define('flow-element', FlowElement);
