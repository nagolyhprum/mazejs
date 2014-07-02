module.exports = function(io, Db, sessions) {
	io.on("connection", function(socket) {
		console.log("added character creation listener");
		socket.on("createcharacter", function(character) {
			console.log("creating character");
			var user = sessions[socket.id];
			if(character && user) {
				console.log("found character and user");
				if(user.characters.length < 3) {
					console.log("there are less than 3 characters");
					character = new Db("character", {
						name : character.name,
						colors : character.colors,
						maze : null,
						equipment : [],
						inventory : [],
						current : null,
						max : null,
						x : null,
						y : null,
						row : null,
						column : null
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