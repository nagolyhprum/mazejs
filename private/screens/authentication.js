module.exports = function(io, Db) {
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
					}
					socket.emit("authenticated", error);
				});
			}
		});
		socket.on("signup", function(user) {
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
						db.save(function(result) {
							
						});
					}
					socket.emit("authenticated", errors);
				});
			}
		});
	});
};