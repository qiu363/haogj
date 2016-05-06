'use strict'

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + 'www/index.html');
});

app.get('/express', function (req, res) {
  res.sendfile(__dirname + '/www/index.html'); 
});

app.get('/express/node', function (req, res) {
  res.send('express/node');
});

app.get('/express/jieba', function (req, res) {
  var nodejieba = require('nodejieba');
  var s = {};
  var w = req.query.w;

  if (w) {
    s = nodejieba.tag(w);
    res.json(s);
  } else {
    res.sendfile(__dirname + '/www/jieba.html'); 
  }
});

app.get('/express/admin', function (req, res) {
  res.sendfile(__dirname + '/www/admin/index.html');  
});

app.get('/express/mongo', function (req, res) {
  let mongoose = require('mongoose');
  let db = mongoose.createConnection('mongodb://127.0.0.1:10000/haogj', 'haogj');
  db.on('error', function (error) {
    console.log(error);
  });
  
  let mongooseSchema = new mongoose.Schema({
    code: {type: String},
    country: {type: String},
    enCountry: {type: String}
  });
  let mongooseModel = db.model('haogj', mongooseSchema);
  let mongooseEntity = new mongooseModel({});

  mongooseModel.find(function (error, data) {
    console.log(data); 
  });

  res.send('mongodb');
});

app.get('/express/change', function (req, res) {
  var request = require('request');
  request({
    uri: 'http://download.finance.yahoo.com/d/quotes.csv?s=USDCNY=X&f=sl1d1t1ba&e=.csv',
    method: 'get'
  }, function (error, response, body) {
    res.send(body);
  });
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.use('/express/static', express.static('www'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

