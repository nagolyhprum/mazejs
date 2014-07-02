var Utility = (function() {
	function Utility() {}
	
	Utility.color = function(image, rgb) {
		var canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		var context = canvas.getContext("2d");
		context.drawImage(image, 0, 0);
		var id = context.getImageData(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < id.data.length; i += 4) {
			if(id.data[i]) { 
				id.data[i] = Math.floor(id.data[i] * rgb.r / 255);
				id.data[i + 1] = Math.floor(id.data[i + 1] * rgb.g / 255);
				id.data[i + 2] = Math.floor(id.data[i + 2] * rgb.b / 255);
			}
		}
		context.putImageData(id, 0, 0);
		return canvas;
	};
	
	Utility.gray = function(image) {
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
		canvas.width = image.width;
		canvas.height = image.height;
		context.drawImage(image, 0, 0);
		var id = context.getImageData(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < id.data.length; i += 4) {
			var intensity = (id.data[i] + id.data[i + 1] + id.data[i + 2]) / 3;
			id.data[i] = intensity;
			id.data[i + 1] = intensity;
			id.data[i + 2] = intensity;
		}
		context.putImageData(id, 0, 0);
		return canvas;
	};
	
	return Utility;
}());