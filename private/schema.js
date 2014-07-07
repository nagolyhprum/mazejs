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
	Db.schema.color = {
		r : Number,
		g : Number,
		b : Number
	};
	Db.schema.customization = {
		head : "color",
		body : "color",
		legs : "color",
		feet : "color",
		torso : "color"
	};
	Db.schema.character = {
		colors : "customization",
		name : String,
		current : "statistic",
		max : "statistic",
		equipment : Array("item"),
		inventory : Array("item"),
		maze : "maze",
		x : Number,
		y : Number,
		column : Number,
		row : Number,
		wakeup : Number
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
		y : Number,
		weight : Number
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
	Db.schema.statistic = {
		strength : Number,
		defense : Number,
		intelligence : Number,
		resistance : Number,
		endurance : Number,
		speed : Number,
		health : Number,
		energy : Number,
		stamina : Number
	};
	Db.schema.user = {
		//fullname : String,
		username : String,
		password : String,
		characters : Array("character"),
		behaviors : Array("behavior")
	};
};