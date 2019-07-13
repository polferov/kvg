var gsc = "http://kirill.cf/getSiteContent.php?url=";
var infoContainer = document.getElementById("infoContainer");
var kvg = {
	stopInfoURL: "https://www.kvg-kiel.de/internetservice/services/stopInfo/stop?stop=",
	queryURL: "https://www.kvg-kiel.de/internetservice/services/lookup/autocomplete?query=",
	routeInfoURL: "https://www.kvg-kiel.de/internetservice/services/routeInfo/route",
	passageInfoURLs: {
		arrival: "https://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=arrival&stop=",
		departure: "https://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=departure&stop="
	},
	get: {
		stopInfo: function(stop){return contentOf(kvg.routeInfoURL+stop);},
	passageInfo: {
		arrival: function(stop){return contentOf(kvg.passageInfoURLs.arrival+stop);},
		departure: function(stop){return contentOf(kvg.passageInfoURLs.departure+stop);}
	},
	routeInfo: function(){return contentOf(kvg.routeInfoURL)}
	}
};

function contentOf(url){
	var c;
	$.ajax({
		url: gsc + encodeURIComponent(url),
		success: function(res){c = res;},
		error: function(e){console.log(e);}
	});
	return c;
}

//Get stops----------------------------------------------------------
var stops;
$.ajax({
	url: "stops.json",
	success: function(res){
		//console.log(res);
		stops = res;
		console.log(stops);
	},
	error: function(e){
		alert("Something went wrong");
		console.log(JSON.parse(e.responseText));
	}
});

//ui

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

//loading stuff --------------------------------------------------------------------------------------------------------








