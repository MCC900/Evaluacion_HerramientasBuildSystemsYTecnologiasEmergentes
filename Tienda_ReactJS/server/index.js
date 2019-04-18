const http = require('http');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./router.js');

const app = express();
const puerto = 3000;

const servidor = http.createServer(app);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({secret: 'xlS1EWkTfaf3DLZPV001239', cookie:{maxAge:900000}}));
app.use("", router);

servidor.listen(puerto, function(){
  console.log("Servidor escuchando en el puerto "+puerto);
})

let url = "mongodb://localhost/tienda_reactjs";
mongoose.connect(url, {useNewUrlParser:true});
