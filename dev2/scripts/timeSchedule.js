// JavaScript Document

var con = document.getElementById('scheduleContainer');

function createEmpty(){
	var container = document.createElement('div');
	container.classList.add('element');
	
	var time = document.createElement('div');
	var timeStart = document.createElement('input');
	timeStart.classList.add('startTime');
	var timeEnd = document.createElement('input');
	timeEnd.classList.add('endTime');
	timeStart.type = "time";
	timeEnd.type = "time";
	time.appendChild(timeStart);
	time.appendChild(timeEnd);
	
	container.appendChild(time);
	var close = document.createElement('button');
	close.innerHTML = "X";
	
	close.onclick = function(e){
		con.removeChild(e.path[2]);
	}
	
	time.appendChild(close);
	
	var stopInput = document.createElement('input');
	stopInput.type = "text";
	
	container.appendChild(stopInput);
	
	return container;
}

function addSchedule()
{
	con.appendChild(createEmpty());
}

function check(){
	
}

function manualCheck(){
	var result = check();
	if(result == true)
		alert('ok');
	else
		alert(result.errorMsg)
}

function toHtml(){
	var inps = document.getElementsByTagName('input');
	console.log(inps);
	for(var i = 0; i < inps.length; i++)
		inps[i].setAttribute('value', inps[i].value);
}

function inputToObject(){
	var lmnts = document.getElementsByClassName('element');
	var sch = [];
	
	for(var i = 0; i < lmnts.length; i++)
	{
		var obj = {};
		obj.start = lmnts[i].children[0].children[0].value;
		obj.end = lmnts[i].children[0].children[1].value;
		obj.stop = lmnts[i].children[1].value;
		sch.push(obj);
	}
	return sch;
}