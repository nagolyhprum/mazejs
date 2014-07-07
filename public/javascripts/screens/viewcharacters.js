Screen("view characters", {
	load : function() {
		this.characters = {
			width : 620,
			height : 64
		};
	},
	start : function(ms) {
		this.hover = -1;
	},
	update : function(ms) {
		
	},
	draw : function(context) {
		//PROVIDE A WAY TO LOGOUT
		var y = 10, i = 0;
		for(; i < global.user.characters.length; i++) {
			if(i == this.hover) {
				context.fillStyle = "rgba(126, 126, 126, 0.5)";
			} else {
				context.fillStyle = "rgba(152, 152, 152, 0.5)";
			}
			context.fillRect(10, y, this.characters.width, this.characters.height);
			y += 20 + this.characters.height;
		}
		if(global.user.characters.length < 3) {
			context.textAlign = "left";
			context.textBaseline = "middle";
			if(i == this.hover) {
				context.fillStyle = "rgba(126, 126, 126, 0.5)";
			} else {
				context.fillStyle = "rgba(152, 152, 152, 0.5)";
			}
			context.fillRect(10, y, this.characters.width, this.characters.height);
			context.fillStyle = "white";
			context.fillText("Click to create a new character", 20, y + this.characters.height / 2);
		}
	},
	end : function(ms) {
		
	},
	click : function() {
		//DELETE A CHARACTER
		//PROVIDE A WAY TO LOGOUT
		var bbs = [], y = 10;
		for(var i = 0; i < global.user.characters.length; i++) {			
			bbs.push({
				x : 10, 
				y : y, 
				width : this.characters.width, 
				height : this.characters.height, 
				click : function() {
					//if not sleeping
						//Screen("view maze");
					//else
						//message box
				}
			});
			y += this.characters.height + 20;
		}
		if(global.user.characters.length < 3) {
			bbs.push({
				x : 10, 
				y : y, 
				width : this.characters.width, 
				height : this.characters.height, 
				click : function() {
					Screen("create character");
				}
			});
		}
		return bbs;
	},
	mousemove : function(l) {		
		var bbs = [], y = 10, self = this;
		this.hover = -1;
		for(var i = 0; i < global.user.characters.length + 1; i++) {	
			bbs.push({
				x : 10, 
				y : y, 
				width : this.characters.width, 
				height : this.characters.height, 
				index : i,
				mousemove : function() {
					self.hover = this.index;
				}
			});
			y += this.characters.height + 20;
		}
		return bbs;
	}
});