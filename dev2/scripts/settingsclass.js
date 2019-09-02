
var settings = {
	name: "settings",
	hideBackToNormal: "hideBackToNormal",
	convertTime: "convertTime",
	returnToLast: "returnToLast",
	fontSizeMultiplikatorSearch: "fontSizeMultiplikatorSearch",
	fontSizeMultiplikatorInfo: "fontSizeMultiplikatorInfo",
	fontSizeMultiplikatorSearchAutocomplete: "fontSizeMultiplikatorSearchAutocomplete",
	tags: "tags",
	tagsLastState: "tagsLastState",
	timeScheduleActive: "timeScheduleActive",
	timeSchedule: "timeSchedule",
	
	get: function (property) {
		if(!property)
			return JSON.parse(localStorage.getItem(settings.name)) || null;
		if(JSON.parse(localStorage.getItem(settings.name)))
			return JSON.parse(localStorage.getItem(settings.name))[property] || null;
		return null;
	},
	set: function (property, value) {
		var props = JSON.parse(localStorage.getItem(settings.name)) || {};
		props[property] = value;
		console.log(props);
		localStorage.setItem(settings.name, JSON.stringify(props));
	}
}
