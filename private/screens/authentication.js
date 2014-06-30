module.exports = function(io, Db, sessions) {
	io.on('connection', function(socket) {
		socket.on("signin", function(user) {
			if(user) {
				var db = new Db("user", {
					username : user.username,
					password : user.password
				}).validate().find(function(result) {
					var error = [];
					if(result.length != 1) {
						error.push("Incorrect username or password.");
					} else {
						sessions[socket.id] = result[0];
					}
					socket.emit("authenticated", error, result[0]);
				});
			}
		});
		socket.on("signup", function(user) {
			//FULL NAME?
			if(user) {
				var db = new Db("user", {
					username : user.username,
					password : user.password
				}).validate(),
				errors = [],
				password = db.data.password;
				delete db.data.password;
				db.find(function(result) {
					db.data.password = password;
					if(!db.data.username) { //username is required
						errors.push("Username is required.");
					}
					if(!db.data.password || !db.data.password.match(/^[a-f0-9]{40}$/g)) { //password is required
						errors.push("Invalid password.");
					}
					if(result.length) {
						errors.push("Duplicate username.");
					}
					if(!errors.length) {						
						db.data.characters = [];
						db.data.behaviors = [];
						db.save(function(error, result) {
							if(!error) {
								sessions[socket.id] = result;
							}
							socket.emit("authenticated", errors, result);
						});
					}
				});
			}
		});
	});
};