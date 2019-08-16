var timeInMin = false;

var gsc = "http://kirill.cf/getSiteContent.php?url=";
var infoContainer = document.getElementById("infoContainer");
var stopSearchAutocompleteUL = document.getElementById("autocomplete");
var activeStop = null;
var kvg = {
	stopInfoURL: "https://www.kvg-kiel.de/internetservice/services/stopInfo/stop?stop=",
	queryURL: "https://www.kvg-kiel.de/internetservice/services/lookup/autocomplete?query=",
	routeInfoURL: "https://www.kvg-kiel.de/internetservice/services/routeInfo/route",
	passageInfoURLs: {
		arrival: "https://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=arrival&stop=",
		departure: "https://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=departure&stop="
	},
	get: {
		stopInfo: function(stop){return contentOf(kvg.routeInfoURL+stop.toString());},
	passageInfo: {
		arrival: function(stop){return contentOf(kvg.passageInfoURLs.arrival+stop.toString());},
		departure: function(stop){return contentOf(kvg.passageInfoURLs.departure+stop.toString());}
	},
	routeInfo: function(){return contentOf(kvg.routeInfoURL)}
	}
};

var locstrg = {
	name: "history",
	count: 10,
	get: function(){
		return JSON.parse(localStorage.getItem(this.name));
	},
	
	add: function(lmnt){
		var curr = this.get();
		if(curr == null)
			curr = [];
		curr = curr.filter((l) => l.stopNr != lmnt.stopNr);
		curr.push(lmnt);
		if(curr.length > this.count)
			{
				curr = curr.reverse();
				curr.length = this.count;
				curr = curr.reverse();
			}
		return this.set(curr);
	},
	
	set: function(_Obj){
		return localStorage.setItem(this.name, JSON.stringify(_Obj));
	},
	
	clear: function(){
		return localStorage.setItem(this.name, null);
	}
}

function contentOf(_url){
//	return $.getJSON(gsc + encodeURIComponent(_url));
	
	return $.ajax({
		url: gsc + encodeURIComponent(_url),
		dataType: "json",
		async: false,
		success: function(res){c = res; setNetworkStatus.OK(); return res;},
		error: function(e){console.log(e); setNetworkStatus.Err();}
	}).responseJSON;
	//console.log(c, _url);
//	console.log(c.responseText);
//	return c;
}

//Get stops----------------------------------------------------------
var stops;
$.ajax({
	url: "stops.json",
	success: function(res){
		//console.log(res);
		stops = res.sort((a,b) => (a.passengerName > b.passengerName) ? 1 : ((b.passengerName > a.passengerName) ? -1 : 0));
		console.log(stops);
		setNetworkStatus.OK();
	},
	error: function(e){
		alert("Something went wrong");
		console.log(JSON.parse(e.responseText));
		setNetworkStatus.Err();
	}
});

//ui

document.getElementById("autocomplete").onclick = acUlClick;
document.getElementById("autocomplete").onTouchEnd = acUlClick;

document.getElementById("uiStop").addEventListener("input", onUiInput);
document.getElementById("uiStop").addEventListener("focus", onUiInput);

function onUiInput(e){
	var val = e.srcElement.value;
	var stps = filterStops(val);
	var LIs = generateStopLIs(stps);
	stopSearchAutocompleteUL.innerHTML = null;
	for(var i in LIs)
		stopSearchAutocompleteUL.appendChild(LIs[i]);
	
}

function filterStops(filter)
{
	"use strict";
	if(filter == "")
		return [locstrg.get().reverse(), null] || [];
	
	console.log(filter);
	
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
			li.setAttribute("lmnt", JSON.stringify(lmnt));
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
				li.setAttribute("lmnt", JSON.stringify(lmnt));
				LIs.push(li);
			}
		}
	console.log(stps)
	console.log(LIs);
	return(LIs);
	
}


var stopRefresh = setInterval(function(){
	//infoContainer.innerHTML = null;
//	console.log("test");
	if(activeStop == null)
		return;
	infoContainer.innerHTML = generateInfoUl(kvg.get.passageInfo.departure(activeStop)).outerHTML;
}, 1000);

function acUlClick(e){
	$("#uiStop").val(e.target.innerHTML);
	
//	console.log(kvg.get.passageInfo.arrival("1312"));
	activeStop = e.target.getAttribute("stopnr");
	locstrg.add(JSON.parse(e.target.getAttribute("lmnt")));
//	alert("test");
	console.log(locstrg.get());
	infoContainer.innerHTML = generateInfoUl(kvg.get.passageInfo.departure(activeStop)).outerHTML;
}

function generateInfoUl(Obj){
	console.log(Obj);
	if(! Obj.actual[0])
		{
			var err = document.createElement("p");
			err.innerHTML = "no current Information";
			return err;
		}
	var ul = document.createElement("ul");
	ul.id = "infoUL";
	Obj.actual.sort((a,b) => a.actualRelativeTime != b.actualRelativeTime ? a.actualRelativeTime - b.actualRelativeTime : (a.patternText != b.patternText ? a.patternText - b.patternText : a.direction < b.direction)).forEach(function(lmnt){
		
		var li = document.createElement("li");
		ul.appendChild(li);
		var d = document.createElement("div");
		li.appendChild(d);
		
		var ptxt = lmnt.patternText;
		var dir = lmnt.direction;
		var art = lmnt.actualRelativeTime;
		var at = lmnt.actualTime;
		var mt = lmnt.mixedTime;
		var ptme = lmnt.plannedTime;
		var stts = lmnt.status;
		
		
		var pte = document.createElement("p");
		pte.classList.add("busTitle");
		pte.innerHTML = ptxt + " --> " + dir;
		d.appendChild(pte);
		
		var tme = document.createElement("div");
		tme.classList.add("timeContainer");
		var sece = document.createElement("span");
		var verspe = document.createElement("span");
		var fixedTimeDiv = document.createElement("div");
		fixedTimeDiv.classList.add("fixedTimeDiv");
		
		var pte = document.createElement("span");
		pte.innerHTML = ptme;
		pte.classList.add("actualTime");
		fixedTimeDiv.appendChild(pte);
		if(ptme != at)
			{
				var ate = document.createElement("span");
				ate.innerHTML = at;
				ate.classList.add("actualTime");
				pte.classList.add("overwritten");
				fixedTimeDiv.appendChild(ate);
			}
		
		sece.innerHTML = settings.get(settings.convertTime) ? Math.floor(art/60) + ':' + Math.abs(art%60) : art;
		var td = timeDiffInMin(ptme, at);
		verspe.innerHTML = td != 0 ? td : "";
		d.appendChild(fixedTimeDiv);
		tme.appendChild(sece);
		tme.appendChild(verspe);
		d.appendChild(tme);
		
		
		
	});
	return ul;
}


function timeDiffInMin(a, b){
	if(!a || !b)
		return 0;
	a = timeStringToMin(a);
	b = timeStringToMin(b);
	a = parseInt(a[0])*60+parseInt(a[1]);
	b = parseInt(b[0])*60+parseInt(b[1]);
	var d = b-a;
	console.log(d);
	//if(d<(-12*60))
	//		d+=24*60;
	return d;
}

function timeStringToMin(t) {
	if(!t)
		return [0,0];
	return t.split(":");
}
