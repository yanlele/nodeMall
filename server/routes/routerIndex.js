var express = require('express');

var app = express();



module.exports=function(){
  var index = require('./index');
  var users = require('./users');
  var goods = require('./goods');
  var test = require('./goods');


  app.use('/', index);
  app.use('/users', users);
  app.use('/goods', goods);
  app.use('/test', test);
};
