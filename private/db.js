module.exports = function(ObjectID) {
	var MongoClient = require("mongodb").MongoClient;
	var ObjectID = require('mongodb').ObjectID;

	function Db(name, data) {
		this.name = name; 
		this.data = data;
	}
	
	Db.schema = {};
	
	Db.prototype.validate = function() {
		var validator = Db.schema[this.name];
		if(validator) {
			var data = {};
			for(var i in validator) {
				if(i in this.data) {
					if(validator[i] == String) { //if it is a string
						if(this.data[i].constructor == String) {
							data[i] = this.data[i];
						}
					} else if(validator[i] == Boolean) { //if it is a Boolean
						if(this.data[i].constructor == Boolean) {
							data[i] = this.data[i];
						}						
					} else if(validator[i] == Number) { //if it is a Number
						if(this.data[i].constructor == Number) {
							data[i] = this.data[i];
						}
					} else if(validator[i].constructor == Array) { //if it is an array
						if(this.data[i].constructor == Array) {
							data[i] = [];
							for(var j = 0; j < this.data[i].length; j++) {
								data[i].push(new Db(validator[i], this.data[i][j]).validate().data);							
							}
						}
					} else { //another object
						data[i] = new Db(validator[i], this.data[i]).validate().data;
					}
				}
			}
			this.data = data;
		}
		return this;
	};

	Db.connect = function(success) {
		MongoClient.connect('mongodb://127.0.0.1:27017/maze', function(error, connection) {
			if(!error) success(connection);		
		});
	};

	Db.prototype.save = function(success) {
		var self = this;
		Db.connect(function(connection) {
			connection.collection(self.name).save(self.data, function(err, result) {
				success && success(result);
			});
		});
		return self;
	};

	Db.prototype.find = function(success) {
		var self = this;
		Db.connect(function(connection) {
			connection.collection(self.name).find(self.data).toArray(function(error, result) {
				success && success(result);
			});
		});
		return self;
	};
	
	return Db;
};