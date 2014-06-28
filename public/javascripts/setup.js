//SOCKET IO
var socket = io(), screen = new Screen();

(function() {
	socket.on("connect", function() {
		setTimeout(function() {
			Screen("authentication");
		}, 5000);
	});	
	socket.on("authenticated", function(errors) {
		console.log(errors);
	});	
}());

(function() {
	var cvs, ctx;
	$(function() {	
		$(".dialog").hide();
		$("#signup a").click(function() {
			$("#signup").hide();
			$("#signin").show();
		});		
		$("#signup [type='button']").click(function() {			
			socket.emit("signup", {
				username : $("#signup [name='username']").val(),
				password : $("#signup [name='password']").val()
			});
		});		
		$("#signin a").click(function() {			
			$("#signup").show();
			$("#signin").hide();
		});
		$("#signin [type='button']").click(function() {		
			socket.emit("signin", {
				username : $("#signin [name='username']").val(),
				password : $("#signin [name='password']").val()
			});	
		});		
		cvs = document.getElementById("screen"); 
		Screen.context = cvs.getContext("2d");		
		setInterval(function() {
			cvs.width = cvs.width;
			Screen();
		}, 1000 / 60);
	});
}());