var express = require('express');
var app = express();
var sessions = {};
//important variables for each screen
var server = require('http').Server(app);
var Db = require("./private/db")();;
var io = require('socket.io')(server);
//screens
require("./private/screens/authentication")(io, Db, sessions);
require("./private/screens/createcharacter")(io, Db, sessions);

app.use(express.static(__dirname + '/public'));

server.listen(3000);
