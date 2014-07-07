var Screen = (function() {
	function Screen(name, screen) {
		var time = new Date().getTime();
		if(!name) {
			if(Screen.context) {
				active && active.update && active.update(time);
				active && active.draw && active.draw(Screen.context);			
			}
		} else if(!screen) {
			var time = new Date().getTime();
			active && active.end && active.end(time);
			active = screens[name];
			active && active.start && active.start(time);	
		} else {
			screen.load && $(function() {
				screen.load();
			});
			screens[name] = screen;
		}
	}

	var active = null;
	var screens = {};
	Screen.context = null;
	
	Screen.click = function(l) {
		var bbs = active && active.click && active.click(l);
		if(bbs) {
			for(var i = 0; i < bbs.length; i++) {
				var bb = bbs[i];
				if(l.x >= bb.x && l.y >= bb.y && l.x <= bb.x + bb.width && l.y <= bb.y + bb.height) {
					bb.click();
				}
			}
		}
	};
	
	Screen.mousemove = function(l) {
		var bbs = active && active.mousemove && active.mousemove(l);
		if(bbs) {
			for(var i = 0; i < bbs.length; i++) {
				var bb = bbs[i];
				if(l.x >= bb.x && l.y >= bb.y && l.x <= bb.x + bb.width && l.y <= bb.y + bb.height) {
					bb.mousemove();
				}
			}
		}
	};
	
	return Screen;
}());