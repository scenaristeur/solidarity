const path = require('path');

module.exports = {
  entry: {
  //  "app-element": './src/component/app-element.js',
    //  "app-mini": './src/component/app-mini.js',
  //  "app-base": './src/base/app-element.js',
  //  "app-api": './src/api/app-api.js',
    "app-hola": './src/hola/app-element.js',
  /*  "banner-element": './src/hola/banner-element.js',
    "notes-element": './src/hola/notes-element.js',
    "inbox-element": './src/hola/inbox-element.js',
    "contacts-element": './src/hola/contacts-element.js',
    "chat-element": './src/hola/chat-element.js',
    "holacratie-element": './src/hola/holacratie-element.js',*/
    /*"login-element": './src/component/login-element.js',
    "chats-element": './src/component/chats-element.js',
    "messages-element": './src/component/messages-element.js',
    "flow-element": './src/component/flow-element.js',
    "eve.custom.js": "./node_modules/evejs/dist/eve.custom.js"*/
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  /*externals: {
  "@solid/query-ldflex": 'data',
  "lit-element": "LitElement",
  "evejs": "eve",
  "solid-auth-client": "auth",
  "@rdfjs/data-model": "rdfjs"
},*/
devServer: {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9001,
  historyApiFallback: true,
  inline: true,
  open: true,
  hot: true
},
devtool: "eval-source-map",
performance: { hints: false }
};
