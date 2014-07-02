var Screen = (function() {
	function Screen(name, screen) {
		var time = new Date().getTime();
		if(!name) {
			if(Screen.context) {
				Screen.active && Screen.active.update && Screen.active.update(time);
				Screen.active && Screen.active.draw && Screen.active.draw(Screen.context);			
			}
		} else if(!screen) {
			var time = new Date().getTime();
			Screen.active && Screen.active.end && Screen.active.end(time);
			Screen.active = Screen.screens[name];
			Screen.active && Screen.active.start && Screen.active.start(time);	
		} else {
			screen.load && $(function() {
				screen.load();
			});
			Screen.screens[name] = screen;
		}
	}

	Screen.active = null;
	Screen.screens = {};
	Screen.context = null;
	
	Screen.click = function(l) {
		Screen.active && Screen.active.click && Screen.active.click(l);
	};
	
	Screen.mousemove = function(l) {
		Screen.active && Screen.active.mousemove && Screen.active.mousemove(l);
	};
	
	return Screen;
}());