//SOCKET IO
var socket = io(), user;

(function() {
	var cvs, ctx;
	$(function() {	
		$(".dialog").hide();
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
		cvs = document.getElementById("screen"); 
		Screen.context = cvs.getContext("2d");		
		setInterval(function() {
			cvs.width = cvs.width;
			Screen();
		}, 1000 / 60);
	});
}());