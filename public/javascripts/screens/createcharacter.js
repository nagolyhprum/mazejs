Screen("create character", {
	load : function() {
		var self = this;
		global.socket.on("createcharacter", function(character) {
			global.user.characters.push(character);
			Screen("view characters");
		});
		$("#createcharacter").click(function() {
			var options = {};
			for(var i in global.character) {
				options[i] = global.character[i].filter;
			}
			var character = {
				colors : options,
				name : $("[name='charactername']").val()
			};
			global.socket.emit("createcharacter", character);
		});		
		$("#cancelcharacter").click(function() {
			Screen("view characters");
		});		
		$("#character .cp").each(function(i, e) {
			e = $(e);
			var color = e.find("div").css("backgroundColor"), 
				colors = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
			color = {
				r : Number(colors[1]),
				g : Number(colors[2]),
				b : Number(colors[3])
			};
			global.character[e.attr("data-part")].filter = color;
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
					global.character[e.attr("data-part")].filter = rgb;
				}
			});	
		});
	},
	start : function(ms) {
		//CLEAR FORM
		$("#character").show();
	},
	update : function(ms) {
	},
	draw : function(context) {		
		var previewcharacter = document.getElementById("previewcharacter");
		var pc = previewcharacter.getContext("2d");
		for(var i in global.character) {
			var image = Utility.color(global.character[i].image, global.character[i].filter);
			pc.drawImage(image, 0, 128, 64, 64, 0, 0, 150, 150);
		}
	},
	end : function(ms) {
		$("#character").hide();
	}
});