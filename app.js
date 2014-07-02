var express = require('express');
var app = express();
var http = require('http').Server(app);
var index = require('./routes/index');
var path = require('path');
var sessions = {};
//important variables for each screen
var Db = require("./private/db")();
var io = require('socket.io')(http);
//screens
require("./private/screens/authentication")(io, Db, sessions);
require("./private/screens/createcharacter")(io, Db, sessions);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', index.index);

http.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});