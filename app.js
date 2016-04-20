var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/express', function (req, res) {
  res.sendfile(__dirname + '/index.html'); 
});

app.get('/express/node', function (req, res) {
  res.send('express/node');
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

