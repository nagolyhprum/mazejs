Screen("loading", {
	load : function() {	
		global.socket.on("connect", function() {
			Screen("authentication");
		});	
	},
	start : function(ms) {
		this.elapsed = 0;
		this.lastUpdate = ms;
		this.string = ".";
		this.wait = 1000;
	},
	update : function(ms) {
		this.elapsed += ms - this.lastUpdate;
		this.lastUpdate = ms;
		while(this.elapsed >= this.wait) {
			this.elapsed -= this.wait;
			if(this.string.length == 3) {
				this.string = ".";
			} else {
				this.string += ".";
			}
		}
	},
	draw : function(context) {		
		context.fillStyle = "white";
		context.font = "24px Times New Roman";
		context.textBaseline = "middle";
		context.textAlign = "center";
		context.fillText("Loading" + this.string, context.canvas.width / 2, context.canvas.height / 2);
	}
});

Screen("loading");