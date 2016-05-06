'use strict'

var request = require('request');
var mongoos = require('mongoose');

request({
  uri: 'http://download.finance.yahoo.com/d/quotes.csv?s=USDCNY=X&f=sl1d1t1ba&e=.csv',
  method: 'GET'
}, function (error, response, body) {
  console.log(response.body);
  let mongoose = require('mongoose');                                                                            
  let db = mongoose.createConnection('mongodb://127.0.0.1:10000', 'haogj');
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
});
