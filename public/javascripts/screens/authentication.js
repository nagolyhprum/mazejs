Screen("authentication", {	
	load : function() {					
		global.socket.on("authenticated", function(errors, u) {
			if(!errors.length) {
				global.user = u;
				Screen("view characters");
			} else { 
				console.log(errors);
			}
		});	
		$("#signup a").click(function() {
			$("#signup").hide();
			$("#signin").show();
		});		
		$("#signup [type='button']").click(function() {			
			global.socket.emit("signup", {
				username : $("#signup [name='username']").val(),
				password : $("#signup [name='password']").val()
			});
		});		
		$("#signin a").click(function() {			
			$("#signup").show();
			$("#signin").hide();
		});
		$("#signin [type='button']").click(function() {		
			global.socket.emit("signin", {
				username : $("#signin [name='username']").val(),
				password : $("#signin [name='password']").val()
			});	
		});		
	},
	start : function(ms) {
		//CLEAR FORM
		$("#signup").hide();
		$("#signin").show();
	},
	end : function(ms) {
		$("#signup").hide();
		$("#signin").hide();
	}
});