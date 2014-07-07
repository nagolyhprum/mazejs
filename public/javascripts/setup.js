//SOCKET IO
var global = (function() {
	var socket = io(), character = {
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
		}
	};

	for(var i in character) {
		var image = new Image();
		image.src = character[i].image;
		image.part = i;
		image.onload = function() {				
			character[this.part].image = Utility.gray(this);
		};
	}
	
	return {
		character : character,
		socket : socket
	};
}());

(function() {
	var cvs, ctx;
	$(function() {	
		$(window).resize(function() {
			var sx = $(cvs).width() / cvs.width,
				sy = $(cvs).height() / cvs.height;
			$(".dialog").css("transform", "scale(" + sx + ", " + sy + ")");
			if($(window).width() < $(window).height() && $("body").css("transform") != "rotate(90deg)") {
				$("body").css("transform", "rotate(90deg)");
			} else if($("body").css("transform") != "rotate(-90deg)") {
				$("body").css("transform", "rotate(-90deg)");
			}
		});
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