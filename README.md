# install locally
prerequisites : nodejs >= 10

```
git clone https://github.com/scenaristeur/solidarity
cd solidarity
npm install -g browserify
npm install
npm run start
```
your browser must open on http://localhost:9000


# when developping module shighl

import  Shighl  from '../../node_modules/shighl/src/Shighl.js'

then when published & installed

import  Shighl  from 'shighl'

   REduce the profile image https://images.weserv.nl/docs/-->

#media queries
https://www.w3schools.com/css/css_rwd_mediaqueries.asp

# interessant stacking sticky
https://codepen.io/ncerminara/full/VdLpzd

# chat modele
https://bootsnipp.com/tags/chat

## Chat from mashlib-dev  / workspaces/solid-panes/Documentation/conventions.md
https://github.com/solid/solid-panes/blob/master/Documentation/conventions.md#chat

To create a chat conversation, create a document, e.g., `/chat.ttl`, and add the following triples to it:

```turtle
</chat.ttl#this> a          mee:LongChat
</chat.ttl#this> dc:author  </profile/card#me> .
</chat.ttl#this> dc:created "2018-07-06T21:36:04Z"^^XML:dateTime .
</chat.ttl#this> dc:title   "Chat channel" .
```

To add a message in the chat conversation, for instance where you say "hi", generate a timestamp like `1555487418787` and add the following triples to `/chat.ttl`:

```turtle
</chat.ttl#Msg1555487418787> dct:created  "2019-04-17T07:50:18Z"^^XML:dateTime .
</chat.ttl#Msg1555487418787> sioc:content "hi" .
</chat.ttl#Msg1555487418787> foaf:maker   </profile/card#me> .
```

Note that for historical reasons, for the chat conversation as a whole, we use `dc:created` and `dc:author`, whereas for the individual chat messages we use `dct:created` and `foaf:maker`.

## Long Chat

LongChat is similar to Chat, except that it uses LDP containers to discover the triples that describe the chat conversation,
instead of having all the triples in one `chat.ttl` doc.
To create a chat conversation, pick a timestamp, e.g., `1555491215455`, create an LDP container, for instance `/long-chat/`, and in there, create an index document, e.g., `/long-chat/index.ttl`. To the index document, add the following triples:

```turtle
</long-chat/index.ttl#this>            a                    mee:LongChat .
</long-chat/index.ttl#this>            dc:author            </profile/card#me> .
</long-chat/index.ttl#this>            dc:created           "2018-07-06T21:36:04Z"^^XML:dateTime .
</long-chat/index.ttl#this>            dc:title             "Chat channel" .
</long-chat/index.ttl#this>            flow:participation   :id1555491215455 .
</long-chat/index.ttl#this>            ui:sharedPreferences :SharedPreferences .
</long-chat/index.ttl#id1555491215455> ic:dtstart           "2019-04-17T08:53:35Z"^^XML:dateTime .
</long-chat/index.ttl#id1555491215455> flow:participant     </profile/card#me> .
</long-chat/index.ttl#id1555491215455> ui:backgroundColor   "#c0d2fe" .
```

To add a message in the LongChat conversation, for instance where you say "hi", pick a filename, for instance, `/long-chat/2019/04/17/chat.ttl`, generate a timestamp like `1555487418787` and add the following triples to `/long-chat/2019/04/17/chat.ttl`:

```turtle
</long-chat/2019/04/17/chat.ttl#Msg1555487418787> dct:created  "2019-04-17T07:50:18Z"^^XML:dateTime .
</long-chat/2019/04/17/chat.ttl#Msg1555487418787> sioc:content "hi" .
</long-chat/2019/04/17/chat.ttl#Msg1555487418787> foaf:maker   </profile/card#me> .
</long-chat/index.ttl#this>                       flow:message </long-chat/2019/04/17/chat.ttl#Msg1555487418787> .
```

Note that there is no need to make `/long-chat/2019/04/17/chat.ttl` discoverable from `/long-chat/index.ttl`, since it can be discovered by following the LDP Container member listings for `/long-chat/`, `/long-chat/2019/`, `/long-chat/2019/04/`, and `/2019/04/17/`.

Also note that here too, for the chat conversation as a whole, we use `dc:created` and `dc:author`, whereas for the individual chat messages we use `dct:created` and `foaf:maker`.

# input-element , send data
await data[url].dct$created.add(date)
await data[url].sioc$content.add(content)
await data[url].foaf$maker.add(namedNode(`${webid}`))
await data.from(url)[index]['http://www.w3.org/2005/01/wf/flow#message'].add(namedNode(url))


# other solid-chat
https://github.com/dindy/solid-discussion-app

https://arquisoft.github.io/dechat_en2a


# a Voir, lit-element with webpack
https://vaadin.com/learn/tutorials/lit-element/starting-a-lit-element-project

# send object to child element
```
<ul>
${this.persons.map((p) => html`
  <li>
  <!-- https://stackoverflow.com/questions/50248345/lit-element-with-object-type-properties-->
  <person-element .person='${p}'><person-element>
  </li>
  `
  )}
  </ul>
  `
  ```

  # The app
  https://scenaristeur.github.io/socialid-template/


  # Build a Solid App from Zero to Hero

  * What is Solid ?
  * Get a POD ?


  # Structure of the App
  * [nodejs](https://www.scaler.com/topics/javascript/install-node-js/)

  initialise a nodejs app
  ```
  mkdir socialid-template
  npm init -y
  ```
  * webpack
  install webpack dev-dependencies

  ```
  npm install --save-dev webpack webpack-cli webpack-dev-server
  mkdir dist
  touch dist/index.html
  touch webpack.config.js
  mkdir src
  mkdir src/component
  touch src/component/app-element.js

  ```
  **dist/index.html**

  ```
  <!doctype html>
  <html lang="en">
  <head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <title>Socialid-Template</title>
  <link rel="manifest" href="/manifest.json">
  </head>
  <body>
  <app-element name="App"></app-element>
  <script src="app-element.js"></script>
  <footer>
  <a href="https://github.com/scenaristeur/socialid-template" target="_blank">source</a>
  </footer>
  </body>
  </html>

  ```


  **webpack.config.js**

  ```
  const path = require('path');

  module.exports =
  {
    entry: {
      app: './src/component/app-element.js',
      },
      output: {
        filename: '[name]-element.js',
        path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
          contentBase: path.join(__dirname, 'dist'),
          compress: true,
          port: 9000,
          historyApiFallback: true,
          inline: true,
          open: true,
          hot: true
          },
          devtool: "eval-source-map",
          performance: {
            hints: false
          }
        };

        ```

        -add start & build scripts to package.json


        ```

        ...
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "start": "webpack-dev-server -d --hot --config webpack.config.js --watch",
          "build": "webpack"
          },
          ...

          ```

          - launch webpack dev server with

          ```
          npm run start

          ```

          it opens the index.html in your dist folder on http://localhost:9000

          then we need to populate the src/component/app-element.js and can use lit-element for this


          * lit-element (webcomponents)

          ```
          npm install --save lit-element

          ```
          **src/component/app-element.js**

          ```
          import { LitElement, html } from 'lit-element';

          class AppElement extends LitElement {

            static get properties() {
              return {
                something: {type: String},
              };
            }

            constructor() {
              super();
              this.something = "world"
            }

            render(){
              return html`
              Hello <b>${this.something}</b> from app-element
              `;
            }

          }

          customElements.define('app-element', AppElement);

          ```

          # Some Solid webcomponents

          - login-element
          first create a basic login-element (there is a model at src/component/modele-element, just duplicate that file & change 'ModeleElement' (2 times) & 'modele-element')

          **src/component/login-element.js**

          ```
          import { LitElement, html } from 'lit-element';

          class LoginElement extends LitElement {

            static get properties() {
              return {
                webId: {type: String},
              };
            }

            constructor() {
              super();
              this.webId = "nobody"
            }

            render(){
              return html`
              <button>Login</button>
              <button>Logout</button>
              ${this.webId}
              `;
            }

          }

          customElements.define('login-element', LoginElement);

          ```

          next we will need to import 'solid-auth-client' module

          ```
          npm install --save solid-auth-client
          ```




          we needto add the 'solid-auth-client' popup to our dist folder

          ```
          cp -r node_modules/solid-auth-client/dist-popup/ dist

          ```

          and update login-element like this

          ```
          import { LitElement, html } from 'lit-element';
          import* as auth from 'solid-auth-client'

          class LoginElement extends LitElement {

            static get properties() {
              return {
                webId: {type: String},
              };
            }

            constructor() {
              super();
              this.webId = null
            }

            render(){
              return html`
              <!-- if this.webId == null , login button is diaplayed -->
              ${this.webId == null ?
                html`
                <button @click=${this.login}>Login</button>
                `
                : html`
                <!-- else logout button is displayed -->
                <button @click=${this.logout}>Logout</button>
                ${this.webId}
                `
              }
              `;
            }

            firstUpdated(){
              auth.trackSession(session => {
                if (!session){
                  this.webId=null
                }
                else{
                  this.webId = session.webId
                }
                })
              }

              login(event) {
                this.popupLogin();
              }

              logout(event) {
                auth.logout().then(() => alert('Goodbye!'));
              }

              async popupLogin() {
                let session = await auth.currentSession();
                let popupUri = './dist-popup/popup.html';
                if (!session)
                session = await auth.popupLogin({ popupUri });
              }

            }

            customElements.define('login-element', LoginElement);

            ```

            - Now you have your first Solid component, you can add it to your src/component/app-element.js

            **src/component/app-element.js**

            ```
            import { LitElement, html } from 'lit-element';

            import './login-element.js'

            class AppElement extends LitElement {

              static get properties() {
                return {
                  something: {type: String},
                };
              }

              constructor() {
                super();
                this.something = "world"
              }

              render(){
                return html`
                Hello <b>${this.something}</b> from app-element !
                <login-element></login-element>
                `;
              }

            }

            customElements.define('app-element', AppElement);
            ```
            # A second component

            - now let's build a second component & establish a communication between login-component & this new component


            In order to keep the component really independant (no redux & no "two way" data-binding) we will use evejs https://github.com/scenaristeur/evejs



            * evejs ( communication between webcomponents)

            ```
            npm install --save scenaristeur/evejs
            ```

            then create a basic "HelloAgent.js" in src/agents/hello-agents.js with this code

            ```
            importeve from 'evejs/dist/eve.custom.js';

            function HelloAgent(id){
              // execute super constructor
              eve.Agent.call(this, id);

              // connect to all transports configured by the system
              this.connect(eve.system.transports.getAll());

            }

            // extend the eve.Agent prototype
            HelloAgent.prototype = Object.create(eve.Agent.prototype);
            HelloAgent.prototype.constructor = HelloAgent;

            HelloAgent.prototype.sayHello = function(to) {
              this.send(to, 'Hello ' + to + '!');
            };

            HelloAgent.prototype.receive = function(from, message) {
              //slog(this.id+" received from :"+from + ' this message: ' + JSON.stringify(message));
              console.log(this.id+" received from :"+from + ' this message: ' + JSON.stringify(message));

              if (JSON.stringify(message).indexOf('Hello') === 0) {
                // reply to the greeting
                this.send(from, 'Hi ' + from + ', nice to meet you!');
              }
            };


            HelloAgent.prototype.broadcast = function(message){
              var me = this
              var allAgents = Object.keys(this.connections[0].transport.agents);
              //console.log(allAgents)
              allAgents.forEach(function (agent){
                me.send(agent, message);
                })
              }

              HelloAgent.prototype.sendMulti = function(recipients, message){
                var me = this
                recipients.forEach(function (agent){
                  //console.log(agent, message)
                  me.send(agent, message);
                  })
                }


                export {HelloAgent};



                ```



                - duplicate another time the src/component/modele-element.js and name it for example messages-element.js then update it's content to get something like this

                ```
                import { LitElement, html } from 'lit-element';

                class MessagesElement extends LitElement {

                  static get properties() {
                    return {
                      something: {type: String},
                    };
                  }

                  constructor() {
                    super();
                    this.something = "world"
                  }

                  render(){
                    return html`
                    Hello <b>${this.something}</b> from app-element !
                    `;
                  }

                }

                customElements.define('messages-element', MessagesElement);


                ```


                then add it to your src/component/app-element.js

                ```

                import { LitElement, html } from 'lit-element';

                import './login-element.js'
                import './messages-element.js'

                class AppElement extends LitElement {

                  static get properties() {
                    return {
                      something: {type: String},
                    };
                  }

                  constructor() {
                    super();
                    this.something = "world"
                  }

                  render(){
                    return html`
                    Hello <b>${this.something}</b> from app-element !
                    <login-element name="Login"></login-element>
                    <messages-element name="Messages"></messages-element>
                    `;
                  }

                }

                customElements.define('app-element', AppElement);

                ```


                - update the two component with the communication system : import HelloAgent, create a new agent and send info to the other element.
                - ! note that we have add a**name** attribute to each of our element in app-element.js and use it in each element to create the 'HelloAgent' in the 'firstUpdated' function . This allow us to send message from one element to another with '**this.agent.send('Messages',{action:"info", info:"Login "+this.webId});**' and to listen to new messages with a '**receive**' function.

                - now or two element can communicate with this code :

                **src/login-element.js**
                ```
                import { LitElement, html } from 'lit-element';
                import * as auth from 'solid-auth-client';
                import { HelloAgent } from '../agents/hello-agent.js';

                class LoginElement extends LitElement {

                  static get properties() {
                    return {
                      name: {type: String},
                      webId: {type: String},
                    };
                  }

                  constructor() {
                    super();
                    this.webId = null
                  }

                  render(){
                    return html`
                    <!-- if this.webId == null , login button is diaplayed -->
                    ${this.webId == null ?
                      html`
                      <button @click=${this.login}>Login</button>
                      `
                      : html`
                      <!-- else logout button is displayed -->
                      <button @click=${this.logout}>Logout</button>
                      ${this.webId}
                      `
                    }
                    `;
                  }

                  firstUpdated(){
                    this.agent = new HelloAgent(this.name);
                    auth.trackSession(session => {
                      if (!session){
                        this.webId=null
                        this.agent.send('Messages',{action:"info", info:"Not logged"});
                      }
                      else{
                        this.webId = session.webId
                        this.agent.send('Messages',{action:"info", info:"Login "+this.webId});
                      }
                      })
                    }

                    login(event) {
                      this.popupLogin();
                    }

                    logout(event) {
                      auth.logout().then(() => alert('Goodbye!'));
                    }

                    async popupLogin() {
                      let session = await auth.currentSession();
                      let popupUri = './dist-popup/popup.html';
                      if (!session)
                      session = await auth.popupLogin({ popupUri });
                    }

                  }

                  customElements.define('login-element', LoginElement);


                  ```


                  **src/messages-element.js**
                  ```
                  import { LitElement, html } from 'lit-element';
                  import { HelloAgent } from '../agents/hello-agent.js';

                  class MessagesElement extends LitElement {

                    static get properties() {
                      return {
                        name: {type: String},
                        messages: {type: Array}
                      };
                    }

                    constructor() {
                      super();
                      this.name = "unknown"
                      this.messages =[]
                    }
                    render(){
                      return html`
                      <p>${this.name}</p>
                      <!--<pre class="pre-scrollable">-->
                      <ul id="messageslist" style="height: 20vh; overflow: auto">
                      ${this.messages.map((m) => html`<li><b>Agent ${m.from}</b> say "${m.message}"</li>`)}
                      </ul>

                      <!--</pre>-->
                      `;
                    }

                    firstUpdated(){
                      var app = this;
                      this.agent = new HelloAgent(this.name);
                      this.agent.receive = function(from, message) {

                        if (message.hasOwnProperty("action")){
                          switch(message.action) {
                            case "info":
                            app.addInfo(from, message)
                            break;
                            default:
                            console.log("Unknown action ",message)
                          }
                        }
                      };
                    }

                    addInfo(from, message){
                      this.messages.reverse()
                      this.messages = [... this.messages, {message: JSON.stringify(message), from: from}]
                      this.messages.reverse()
                    }

                  }

                  customElements.define('messages-element', MessagesElement);



                  ```


                  ![messages](doc/images/messages.png)














                  # make a gh-pages branches
                  https://stackoverflow.com/questions/36782467/set-subdirectory-as-website-root-on-github-pages

                  create subbranch with dist folder
                  - comment the dist folder in the .gitignore file

                  ```
                  git add dist -f && git commit -m "Initial dist subtree commit"
                  ```

                  - build & publish to gh-pages

                  ```
                  npm run build && git subtree push --prefix dist origin gh-pages

                  ```

                  - short cut for publish a change to gh-pages
                  ```
                  npm run build
                  git add .
                  git commit -m "app updated"
                  git push
                  git subtree push --prefix dist origin gh-pages

                  ```
