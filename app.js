
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , github = require('./routes/github')
  , http = require('http')
  , path = require('path');  

var app = express();



var config = require("./config");



app.configure(function(){
  app.set('port', config.get('PORT'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mmm');
  app.set('layout', 'base');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', github.issues);

app.get('/issues/', github.issues);
app.get('/milestones/', github.milestones);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
