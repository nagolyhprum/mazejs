var options = {
	body : [
		"images/walk/BODY_male.png"
	],
	hair : [
		"images/walk/HEAD_hair_blonde.png"
	],
	shirt : [
		"images/walk/TORSO_robe_shirt_brown.png"
	],
	legs : [
		"images/walk/LEGS_pants_greenish.png"		
	],
	shoes : [
		"images/walk/FEET_shoes_brown.png"
	]
};

Screen("create character", {
	start : function(ms) {
		$("#character").show();
	},
	update : function(ms) {
	},
	draw : function(context) {
	},
	end : function(ms) {
	}
});