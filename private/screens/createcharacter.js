module.exports = function(io, Db, sessions) {
	io.on("connection", function(socket) {
		socket.on("createcharacter", function(character) {
			var user = sessions[socket.id];
			if(character && user) {
				if(user.characters.length < 3) {
					var statistics = {						
						strength : 1,
						defense : 1,
						intelligence : 1,
						resistance : 1,
						endurance : 0,
						speed : 1,
						health : 100,
						energy : 100,
						stamina : 100
					};
					character = new Db("character", {
						name : character.name,
						colors : character.colors,
						maze : null,
						equipment : [],
						inventory : [],
						current : statistics,
						max : statistics,
						x : null,
						y : null,
						row : null,
						column : null,
						wakeup : 0
					}).validate().data
					var db = new Db("user", user).validate();
					for(var i in Db.schema.colors) {
						if(!(i in character.colors) || isNaN(character.colors[i].r) || isNaN(character.colors[i].g) || isNaN(character.colors[i].b)) {
							return;
						}
					}
					user.characters.push(character);
					db.save(function(user) {
						socket.emit("createcharacter", character);
					});
				}
			}
		});
	});
};