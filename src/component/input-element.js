import { LitElement, html } from 'lit-element';
import data from "@solid/query-ldflex";
import { namedNode } from '@rdfjs/data-model';

class InputElement extends LitElement {

  static get properties() {
    return {
      name: {type: String},
      something: {type: String},
      discover: {type: Object}
    };
  }

  constructor() {
    super();
    this.something = "Input Element"
    this.discover = {}
  }

  render(){
    return html`
    <link href="css/fontawesome/css/all.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <!--<script src="vendor/jquery/jquery.slim.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>-->


    <div class="form-group">
    <!--<label for="exampleFormControlTextarea1">Example textarea</label>-->
    <textarea class="form-control" id="textarea" @keyup=${this.keyup} placeholder="Say something" rows="2"></textarea>
    <div class="input-group-append">
    <div class="form-check form-check-inline">
    <input class="form-check-input type-radio" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="InstantMessage" checked>
    <label class="form-check-label" for="inlineRadio1">Chat</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input type-radio" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="WikiArticle">
    <label class="form-check-label" for="inlineRadio2">Topic</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input type-radio" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Question">
    <label class="form-check-label" for="inlineRadio3">Question</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input type-radio" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="Poll">
    <label class="form-check-label" for="inlineRadio3">Poll</label>
    </div>
    <button id="send" class="btn btn-primary" type="button" @click="${this.send}">Send</button>
    </div>
    </div>
    `;
  }

  async send(){
    try {
      var webid = await data.user
      console.log(`${webid}`)
    }catch(e){
      alert(e)
    }
      
    var content = this.shadowRoot.getElementById("textarea").value.trim()
    if (content.length > 0){
      var dateObj = new Date();
      var messageId = "#Msg"+dateObj.getTime()
      var month = ("0" + dateObj.getUTCMonth() + 1).slice(-2); //months from 1-12
      var day = ("0" + dateObj.getUTCDate()).slice(-2);
      var year = dateObj.getUTCFullYear();
      var path = this.discover.folder+[year, month, day, ""].join("/")
      var url = path+"chat.ttl"+messageId
      var date = dateObj.toISOString()
      var index = this.discover.folder+"index.ttl#this"
      await data[url].dct$created.add(date)
      await data[url].sioc$content.add(content)
      await data[url].foaf$maker.add(namedNode(`${webid}`))
      await data.from(url)[index]['http://www.w3.org/2005/01/wf/flow#message'].add(namedNode(url))
      var postType = this.shadowRoot.querySelector('input[name="inlineRadioOptions"]:checked').value
      if (postType != "InstantMessage"){
        await data[url].rdfs$type.add(namedNode('http://rdfs.org/sioc/types#'+postType))
      }
      this.shadowRoot.getElementById("textarea").value = ""
      this.shadowRoot.getElementById("inlineRadio1").checked = true
    }
  }

  keyup(e){
    if (e.keyCode === 13) {
      e.preventDefault();
      this.send()
    }
  }
}
customElements.define('input-element', InputElement);
