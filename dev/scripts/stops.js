var stops;
$.ajax({
	url: "stops.json",
	success: function(res){
		//console.log(res);
		stops = res;
		console.log(stops);
	},
	error: function(e){
		alert("error while phrasing");
		console.log(JSON.parse(e.responseText));
	}
});



document.getElementById("uiStop").onkeypress = function(e){
	var lmnt = document.getElementById("uiStop");
	var ss = lmnt.selectionStart;
	var cntnt = lmnt.value.slice(0, ss) + e.key + lmnt.value.substr(ss);
	console.log(cntnt);
	
	console.log(filterStops(cntnt));
	
};

function filterStops(filter)
{
	"use strict";
	var a = [];
	var b = [];
	var c = [];
	for(var i = 0; i < stops.length; i++)
		if(stops[i].passengerName.toLowerCase().indexOf(filter.toLowerCase()) == 0)
			a.push(stops[i]);
	
	if(filter.length > 2)
		for(var i = 0; i < stops.length; i++)
		if(stops[i].passengerName.toLowerCase().indexOf(filter.toLowerCase()) > 0)
			b.push(stops[i]);
	
	c.push(a);
	c.push(b);
	return c;
}