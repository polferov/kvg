var con = document.getElementById("tag-container");

function createElementBlank(){
	"use strict";
	var container = document.createElement("div");
	container.classList.add("container");
	
	var color = document.createElement("input");
	color.type = "text";
	color.setAttribute("placeholder", "css color");
	color.classList.add("colorInput");
	
	var close = document.createElement('button');
	close.innerHTML = "X";
	close.onclick = function(e){
//		console.log(e);
		con.removeChild(e.path[2]);
	};
	
	var elements = document.createElement("textarea");
	elements.setAttribute("placeholder", "bus numbers separated by \";\" example: \"11; 22\" or \"11;22\"");
	elements.classList.add("busNrInput");
	
	var fl = document.createElement('div');
	fl.classList.add('fl');
	
	fl.appendChild(color);
	fl.appendChild(close);
	container.appendChild(fl);
	container.appendChild(elements);
	
	return container;
}

function createElementFilled(color, busses){
	"use strict";
	var element = createElementBlank();
	var clr = element.children[0].children[0];
	var bss = element.clildren[1];
	clr.value = color;
	
	if(busses.length)
		for(var i in busses)
			{
				if(i > 0)
					bss.innerHTML += "; ";
				bss.innerHTML += busses[i];
			}
	return element;
}

function confirmCancel () {
	if(confirm("Really Cancel?"))
		location.reload();
}

function save () {
	var lmnts = document.getElementsByClassName("container");
	
	for(var i = 0; i < lmnts.length; i++)
	{
//		console.log(lmnts[i].children[1]);
			if(!(lmnts[i].children[0].children[0].value && lmnts[i].children[1].value))
			con.removeChild(lmnts[i]);
	}
	
//	console.log(lmnts);
	
	var tags = {};
	
	for(var i = 0; i < lmnts.length; i++) {
//		console.log(lmnts[i].children[0].children[0].value);
		var clr = lmnts[i].children[0].children[0].value;
		lmnts[i].children[0].children[0].setAttribute("value", clr);
//		console.log(clr);
		var bss = busStringToArray(lmnts[i].children[1].value);
		lmnts[i].children[1].innerHTML = lmnts[i].children[1].value;
		console.log(bss);
		
		for(var j = 0; j < bss.length; j++)
		{
			if(!tags[bss[j]])
				tags[bss[j]] = [];
			tags[bss[j]].push(clr);
		}
	}
	
	settings.set(settings.tags, tags);
	settings.set(settings.tagsLastState, con.innerHTML);
	console.log(settings.get(settings.tags));
//	console.log(tags);
//	console.log(JSON.stringify(tags));
	return tags;
}

function busStringToArray(busString){
	var arr = busString.split(";");
	for(var i in arr)
		arr[i] = arr[i].trim();
	return arr;
}

function addElement(){
	console.log("test");
	con.appendChild(createElementBlank());
}

function load () {
	con.innerHTML = settings.get(settings.tagsLastState);
}

load();
