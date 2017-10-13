var express = require('express');
var app = express();
var path = require('path');

//setting middleware
app.use(express.static(__dirname )); //Serves resources from public folder

app.listen(8080);