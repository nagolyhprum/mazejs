//SOCKET IO
var socket = io(), screen = new Screen(), user;

(function() {
	socket.on("connect", function() {
		Screen("authentication");
	});	
	socket.on("authenticated", function(errors, u) {
		if(!errors.length) {
			user = u;
			Screen("view characters");
		} else { 
			console.log(errors);
		}
	});	
}());

(function() {
	var cvs, ctx;
	$(function() {	
		$("canvas").click(function(e) {
			var offset = $(this).offset();
			var x = (e.clientX - offset.left) * (cvs.width / $(cvs).width());
			var y = (e.clientY - offset.top) * (cvs.height / $(cvs).height());
			Screen.click({x:x,y:y});
		});
		$("canvas").mousemove(function(e) {
			var offset = $(this).offset();
			var x = (e.clientX - offset.left) * (cvs.width / $(cvs).width());
			var y = (e.clientY - offset.top) * (cvs.height / $(cvs).height());
			Screen.mousemove({x:x,y:y});
		});
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