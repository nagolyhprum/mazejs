//SOCKET IO
var socket = io(), screen, screens = {};

var loading = {
	start : function(ms) {
		this.elapsed = 0;
		this.lastUpdate = ms;
		this.string = ".";
		this.wait = 1000;
	},
	update : function(ms) {
		this.elapsed += ms - this.lastUpdate;
		this.lastUpdate = ms;
		while(this.elapsed >= this.wait) {
			this.elapsed -= this.wait;
			if(this.string.length == 3) {
				this.string = ".";
			} else {
				this.string += ".";
			}
		}
	},
	draw : function(context) {		
		context.fillStyle = "white";
		context.font = "24px Times New Roman";
		context.textBaseline = "middle";
		context.textAlign = "center";
		context.fillText("Loading" + this.string, context.canvas.width / 2, context.canvas.height / 2);
	}
};

var authentication = {
	start : function(ms) {
		$("#signup").hide();
		$("#signin").show();
	},
	end : function(ms) {
		$("#signup").hide();
		$("#signin").hide();
	}
};

setScreen(screens.loading = screen = loading);

function setScreen(s) {
	var time = new Date().getTime();
	screen && screen.end && screen.end(time);
	screen = s;
	screen.start(time);
}

(function() {
	socket.on("connect", function() {
		setScreen(authentication);
	});	
	socket.on("authenticated", function(message) {
		console.log(message);
	});	
}());

(function() {
	var cvs, ctx;
	$(function() {	
		$("#signup a").click(function() {
			$("#signup").hide();
			$("#signin").show();
		});		
		$("#signup [type='button']").click(function() {			
			socket.emit("signup", {
				username : $("#signin [name='username']").val(),
				password : $("#signin [name='password']").val()
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
		ctx = cvs.getContext("2d");		
		setInterval(function() {
			cvs.width = cvs.width;
			screen.update && screen.update(new Date().getTime());
			screen.draw && screen.draw(ctx);
		}, 1000 / 60);
	});
}());