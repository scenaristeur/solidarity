import { LitElement, html } from 'lit-element';

import { HelloAgent } from '../agents/hello-agent.js';

class ScrollerShighl extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      instance:{type: String}
    };
  }

  constructor() {
    super();
    this.something = "ScrollerShighl"
    this.instance = null
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
    var initial = true

    var intersectionObserver = new IntersectionObserver(entries => {
      // If intersectionRatio is 0, the sentinel is out of view
      // and we do not need to do anything.
      if (entries[0].intersectionRatio <= 0) {
        return;
      }
      app.loadItems(5);
      // appendChild will move the existing element, so there is no need to
      // remove it first.
      //scroller.appendChild(sentinel);
      app.scroller.insertBefore(app.sentinel, app.scroller.firstChild);
      app.loadItems(10);
      if (initial==true){
        console.log(initial)
        app.scroller.scrollTop = app.scroller.scrollHeight;
        initial = false
      }

      //  ChromeSamples.setStatus('Loaded up to item ' + counter);
    });
    intersectionObserver.observe(app.sentinel);


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

  instanceChanged(instance){
    console.log(instance)
    this.instance = instance

  }

}

customElements.define('scroller-shighl', ScrollerShighl);
