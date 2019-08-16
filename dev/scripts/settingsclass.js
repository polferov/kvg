
var settings = {
	name: "settings",
	hideBackToNormal: "hideBackToNormal",
	convertTime: "convertTime",
	returnToLast: "returnToLast",
	
	get: function (property) {
		if(JSON.parse(localStorage.getItem(name)))
			return JSON.parse(localStorage.getItem(name))[property] || null;
		return null;
	},
	set: function (property, value) {
		var props = JSON.parse(localStorage.getItem(name)) || {};
		props[property] = value;
		console.log(props);
		localStorage.setItem(name, JSON.stringify(props));
	}
}
