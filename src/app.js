var express = require('express');
var app = express();
var path = require('path');

//setting middleware
app.use(express.static(__dirname )); //Serves resources from public folder
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.listen(8080);