Screen("authentication", {
	start : function(ms) {
		$("#signup").hide();
		$("#signin").show();
	},
	end : function(ms) {
		$("#signup").hide();
		$("#signin").hide();
	}
});