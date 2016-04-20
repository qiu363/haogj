var request = require('request');

request({
  uri: 'http://download.finance.yahoo.com/d/quotes.csv?s=USDCNY=X&f=sl1d1t1ba&e=.csv',
  method: 'GET'
}, function (error, response, body) {
  console.log(error);
  console.log(response);
  console.log(body);
});
