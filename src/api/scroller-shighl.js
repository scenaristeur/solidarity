import { LitElement, html } from 'lit-element';
import { HelloAgent } from '../agents/hello-agent.js';
import  Shighl  from 'shighl'

class ScrollerShighl extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      instance:{type: String},
      lang: {type: String}
    };
  }

  constructor() {
    super();
    this.something = "ScrollerShighl"
    this.instance = null
    this.lang=navigator.language
  }

  render(){
    return html`
    <style>
    .item {
      background: #FFF;
      border: 1px solid #666;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #sentinel {
      width: 1px;
      height: 1px;
    }

    #scroller {
      height: 400px;
      overflow-y: scroll;
    }
    </style>



    <h4>${this.something}</h4>
    ${this.instance}
    <div id="scroller">
    <div id="sentinel">Loading more</div>
    <br>
    <br>
    `;
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
          case "instanceChanged":
          app.instanceChanged(message.instance)
          break;
          default:
          console.log("Unknown action ",message)
        }
      }
    };

    /* global IntersectionObserver */
    app.scroller = this.shadowRoot.querySelector('#scroller');
    app.sentinel = this.shadowRoot.querySelector('#sentinel');
    app.counter = 1;



  }



  async instanceChanged(instance){
    var app = this
    /*  app.scroller.innerHTML = ""
    var sentineldiv = document.createElement('div');
    //  newItem.classList.add('item');
    //  newItem.textContent = 'Item ' + this.counter++;
    sentineldiv.textContent = "loading 2222" //toLocaleTimeString
    sentineldiv.id="sentinel"
    app.scroller.insertBefore(sentineldiv, app.scroller.firstChild)*/
    /*  [].forEach.call(this.shadowRoot.querySelectorAll('.daydiv'),function(e){
    e.parentNode.removeChild(e);
  });*/
  //app.scroller.scrollTop = app.scroller.scrollHeight;
  var daydivs = this.shadowRoot.querySelectorAll('.day')
  console.log(daydivs)
  daydivs.forEach((e, i) => {
    e.parentNode.removeChild(e);
  });


  console.log(instance)
  this.instance = instance
  var folder = instance.substring(0,instance.lastIndexOf('/')+1)
  this.pages = await this.sh.getPages(folder)

  this.pages.instance = instance
  this.pages.day =  this.pages.days.pop()
    this.initial = true
  app.buildDay()



  var intersectionObserver = new IntersectionObserver(entries => {
    // If intersectionRatio is 0, the sentinel is out of view
    // and we do not need to do anything.
    if (entries[0].intersectionRatio <= 0) {
      return;
    }
    //  app.loadItems(5);
    //  app.buildDay()
    // appendChild will move the existing element, so there is no need to
    // remove it first.
    //scroller.appendChild(sentinel);
    app.scroller.insertBefore(app.sentinel, app.scroller.firstChild);
    //  app.loadItems(10);
    this.pages.day =  this.pages.days.pop()

    // revoir changement de mois, d'annéee !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(this.pages)
    //  app.getMessages()
    app.buildDay()


    //  ChromeSamples.setStatus('Loaded up to item ' + counter);
  });
  intersectionObserver.observe(app.sentinel);
}


buildDay(){
  var daydiv = document.createElement('div');
  daydiv.classList.add('day');
  //  newItem.textContent = 'Item ' + this.counter++;
  daydiv.textContent = this.pages.day //toLocaleTimeString
  //  scroller.appendChild(newItem);
  this.scroller.insertBefore(daydiv, this.scroller.firstChild);
  this.getMessages(daydiv)
}

async getMessages(daydiv){
  //console.log(this.pages)
  var messages = await this.sh.getMessages(this.pages)
  console.log(messages)
  for (var i = 0; i < messages.length; i++) {
    var details = await this.sh.messageDetails(messages[i])
    var newItem = document.createElement('div');
    newItem.classList.add('item');
    //  newItem.textContent = 'Item ' + this.counter++;
    newItem.textContent = new Date(details.date).toLocaleString(this.lang) +' Item ' + messages[i] ; //toLocaleTimeString
    //  scroller.appendChild(newItem);
    //  this.scroller.insertBefore(newItem, daydiv);
    daydiv.prepend(newItem)
  }
  if (this.initial==true){
    this.scroller.scrollTop = this.scroller.scrollHeight;
    this.initial = false
  }
}

loadItems(n) {
  for (var i = 0; i < n; i++) {
    var newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.textContent = 'Item ' + this.counter++;
    //  scroller.appendChild(newItem);
    this.scroller.insertBefore(newItem, this.scroller.firstChild);
  }
}

}

customElements.define('scroller-shighl', ScrollerShighl);
