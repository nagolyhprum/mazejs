module.exports = function(http, Db) {
	Db = Db();
	Db.config.badge = {
		category : String,
		subcategory : String,
		required : Number,
		name : String
	};
	Db.config.behavior = {
		category : String,
		subcategory : String,
		current : Number
	};
	Db.config.character = {
		charactername : String,
		current : "statistic",
		max : "statistic",
		equipment : Array("item"),
		inventory : Array("item"),
		maze : "maze",
		x : Number,
		y : Number,
		column : Number,
		row : Number		
	};
	Db.config.enemy = { //can be a model
		name : String,
		resources : Array(String),
		current : "statistic",
		max : "statistic",
		msToMove : Number,
		x : Number,
		y : Number
	};
	Db.config.item = { //can be a model
		name : String,
		statistic : "statistic",
		resources : Array(String),
		weight : Number,
		range : Number,
		x : Number,
		y : Number
	};
	Db.config.maze = {  //can be a model
		rooms : Array("room"),
		rows : Number,
		columns : Number
	};
	Db.config.room = { //can be a model
		doors : Number,
		discovered : Boolean,
		enemies : Array("enemy"),
		items : Array("item"),
		count : Number
	};
	Db.config.user = {
		fullname : String,
		username : String,
		password : String,
		characters : Array("character"),
		behaviors : Array("behavior")
	};
	var io = require('socket.io')(http);
	io.on('connection', function(socket){
		socket.on("signin", function(user) {
			if(user) {
				var db = new Db("user", {
					username : user.username,
					password : user.password
				}).validate().find(function(result) {
					socket.emit("authenticated", result);
				});
			}
		});
		socket.on("signup", function(user) {
			if(user) {		
				var db = new Db("user", {
					username : user.username,
					password : user.password
				}).validate().save();
				socket.emit("authenticated", true);
			}
		});
	});
};