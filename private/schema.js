module.exports = function(Db) {
	Db.schema.badge = {
		category : String,
		subcategory : String,
		required : Number,
		name : String
	};
	Db.schema.behavior = {
		category : String,
		subcategory : String,
		current : Number
	};
	Db.schema.character = {
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
	Db.schema.enemy = { //can be a model
		name : String,
		resources : Array(String),
		current : "statistic",
		max : "statistic",
		msToMove : Number,
		x : Number,
		y : Number
	};
	Db.schema.item = { //can be a model
		name : String,
		statistic : "statistic",
		resources : Array(String),
		weight : Number,
		range : Number,
		x : Number,
		y : Number
	};
	Db.schema.maze = {  //can be a model
		rooms : Array("room"),
		rows : Number,
		columns : Number
	};
	Db.schema.room = { //can be a model
		doors : Number,
		discovered : Boolean,
		enemies : Array("enemy"),
		items : Array("item"),
		count : Number
	};
	Db.schema.user = {
		fullname : String,
		username : String,
		password : String,
		characters : Array("character"),
		behaviors : Array("behavior")
	};
};