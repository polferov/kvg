var gsc = "http://kirill.cf/getSiteContent.php?url=";
var infoContainer = document.getElementById("infoContainer");
var stopSearchAutocompleteUL = document.getElementById("autocomplete");
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

document.getElementById("uiStop").addEventListener("input", function(e){
	var val = e.srcElement.value;
	var stps = filterStops(val);
	var LIs = generateStopLIs(stps);
	stopSearchAutocompleteUL.innerHTML = null;
	for(var i in LIs)
		stopSearchAutocompleteUL.appendChild(LIs[i]);
	
});

function filterStops(filter)
{
	"use strict";
	var a = [];
	var b = [];
	var c = [];
	for(var i = 0; i < stops.length; i++)
		if(stops[i].passengerName.toLowerCase().indexOf(filter.toLowerCase()) == 0)
			a.push(stops[i]);
	
	
	for(var i = 0; i < stops.length; i++)
		if(stops[i].passengerName.toLowerCase().indexOf(filter.toLowerCase()) > 0)
			b.push(stops[i]);
	
	c.push(a);
	c.push(b);
	return c;
}


function generateStopLIs(stps){
	var LIs = [];
	var starts = stps[0];
	var contains = stps[1];
	
	for(var i in starts)
		{
			var lmnt = starts[i];
			var li = document.createElement("li");
			li.innerHTML = lmnt.passengerName;
			li.setAttribute("stopNr", lmnt.stopNr);
			li.setAttribute("stopID", lmnt.id);
			LIs.push(li);
		}
	
	if(contains != null && contains.length > 0)
		{
			if(starts != null && starts.length > 0)
				LIs.push(document.createElement("hr"));
			for(var i in contains)
			{
				var lmnt = contains[i];
				var li = document.createElement("li");
				li.innerHTML = lmnt.passengerName;
				li.setAttribute("stopNr", lmnt.stopNr);
				li.setAttribute("stopID", lmnt.id);
				li.addEventListener("click", liClick);
				LIs.push(li);
			}
		}
	console.log(stps)
	console.log(LIs);
	return(LIs);
	
}

function liClick(e){
	alert("test");
}