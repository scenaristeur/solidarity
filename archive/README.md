# socialid
Tutoriel making a social app on top of Solid


# my first social app based on Solid

- first install latest version of nodejs
- make a folder for your app, mine is 'socialid'
- change directory to your newly created folder and initialize a nodejs app with 'npm init -y'
- then launch your favorite text editor

```
C:\Users\Smag\Documents\dev>mkdir socialid

C:\Users\Smag\Documents\dev>cd socialid

C:\Users\Smag\Documents\dev\socialid>npm init -y
Wrote to C:\Users\Smag\Documents\dev\socialid\package.json:

{
  "name": "socialid",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

C:\Users\Smag\Documents\dev\socialid>atom .
```
- then at the root of your 'socialid' app,
create two files 'index.js' that will be our server and 'index.html' that will be the starting page of our app.

- next, we will create a basic express server in our 'index.js' file : First install express with ``` npm install --save express``` and fill the 'index.js' with this code :

***index.js***
```
// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/'));
```

and put some basic html in the 'index.html'

***index.html***
```
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Socialid</title>
</head>
<body>
Hello from Socialid
</body>
</html>
```

- then test your app with
```
node .
```

You should see the express server start
```
C:\Users\Smag\Documents\dev\socialid>npm install --save express
npm notice created a lockfile as package-lock.json. You should commit this file.npm WARN socialid@1.0.0 No repository field.

+ express@4.17.1
added 50 packages from 37 contributors and audited 126 packages in 3.369s
found 0 vulnerabilities


C:\Users\Smag\Documents\dev\socialid>node .
Server listening at port 3000
```
and your app can be accessed at http://127.0.0.1:3000 
