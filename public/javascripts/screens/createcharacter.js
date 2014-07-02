Screen("create character", {
	load : function() {
		var self = this;
		socket.on("createcharacter", function(character) {
			user.characters.push(character);
			Screen("view characters");
		});
		$("#createcharacter").click(function() {
			var options = {};
			for(var i in self.options) {
				options[i] = self.options[i].color;
			}
			var character = {
				colors : options,
				name : $("[name='charactername']").val()
			};
			socket.emit("createcharacter", character);
		});		
		$("#cancelcharacter").click(function() {
			Screen("view characters");
		});
		this.options = {
			body : {
				image : "images/walk/BODY_male.png"
			},
			head : {
				image : "images/walk/HEAD_hair_blonde.png"
			},
			feet : {
				image : "images/walk/FEET_shoes_brown.png"
			},
			legs : {
				image : "images/walk/LEGS_pants_greenish.png"
			},
			torso : {
				image : "images/walk/TORSO_robe_shirt_brown.png"
			},
		};
		for(var i in this.options) {
			var image = new Image();
			image.src = this.options[i].image;
			image.part = i;
			image.onload = function() {				
				var canvas = document.createElement("canvas");
				var context = canvas.getContext("2d");
				canvas.width = 64;
				canvas.height = 64;
				context.drawImage(this, 0, 128, 64, 64, 0, 0, 64, 64);
				canvas = Utility.gray(canvas);
				canvas.complete = true;
				self.options[this.part].image = canvas;
			};
			this.options[i].image = image;
		}
		$("#character .cp").each(function(i, e) {
			e = $(e);
			var color = e.find("div").css("backgroundColor"), 
				colors = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
			color = {
				r : Number(colors[1]),
				g : Number(colors[2]),
				b : Number(colors[3])
			};
			self.options[e.attr("data-part")].color = color;
			e.ColorPicker({
				color : color,
				onShow : function (colpkr) {
					$(colpkr).fadeIn(500);
					return false;
				},
				onHide : function (colpkr) {
					$(colpkr).fadeOut(500);
					return false;
				},
				onChange : function (hsb, hex, rgb) {
					e.find("div").css("backgroundColor", "#" + hex);
					self.options[e.attr("data-part")].color = rgb;
				}
			});	
		});
	},
	start : function(ms) {
		$("#character").show();
	},
	update : function(ms) {
	},
	draw : function(context) {		
		var previewcharacter = document.getElementById("previewcharacter");
		var pc = previewcharacter.getContext("2d");
		for(var i in this.options) {
			var image = this.options[i].image;
			if(image.complete) {
				image = Utility.color(image, this.options[i].color);
				pc.drawImage(image, 0, 0, 64, 64, 0, 0, 150, 150);
			}
		}
	},
	end : function(ms) {
		$("#character").hide();
	}
});