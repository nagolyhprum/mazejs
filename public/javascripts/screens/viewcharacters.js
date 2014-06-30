Screen("view characters", {
	start : function(ms) {
		this.characters = {
			width : 620,
			height : 60
		};
	},
	update : function(ms) {
		
	},
	draw : function(context) {
		var y = 10;
		for(var i = 0; i < user.characters.length; i++) {
			context.fillStyle = "rgba(126, 126, 126, 0.5)";
			context.fillRect(10, y, this.characters.width, this.characters.height);
			y += 20 + this.characters.height;
		}
		if(true || user.characters.length < 3) {
			context.textAlign = "left";
			context.textBaseline = "middle";
			context.fillStyle = "rgba(126, 126, 126, 0.5)";
			context.fillRect(10, y, this.characters.width, this.characters.height);
			context.fillStyle = "white";
			context.fillText("Click to create a new character", 20, y + this.characters.height / 2);
		}
	},
	end : function(ms) {
		
	},
	click : function(l) {
		var y = 
			(this.characters.height * user.characters.length) + 
			(20 * user.characters.length) + 
			10;
		if(
			l.x > 10 && 
			l.x < 10 + this.characters.width && 
			l.y > y &&
			l.y < y + this.characters.height
		) {
			Screen("create character");
		}
	},
	mousemove : function(l) {
		
	}
});