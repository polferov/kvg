// JavaScript Document

var con = document.getElementById('scheduleContainer');

var stops = "";
$.ajax({
	url: "stops.json",
	async: false,
	success: function(res){
		stops = res;
	},
	error: function(err){
		alert('error');
	}
})

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
	close.addEventListener("click", function(e){
		con.removeChild(e.target.parentElement);
	});
	
	close.onclick = function(e){
		con.removeChild(e.path[2]);
	}
	
	time.appendChild(close);
	
	var stopInput = document.createElement('input');
	stopInput.classList.add('stop');
	stopInput.setAttribute('placeholder', 'stop');
	stopInput.type = "text";
	
	container.appendChild(stopInput);
	
	return container;
}

function addSchedule()
{
	con.appendChild(createEmpty());
}

function check(){
	var stopInputs = document.getElementsByClassName('stop');
//	console.log(stopInputs);
	for(var i = 0; i <  stopInputs.length; i++)
		if(stops.filter((a) => a.passengerName.toLowerCase() == stopInputs[i].value.toLowerCase()).length == 0)
			{
				alert('stop not found at index ' + i);
				return false;
			}
	
	var starttimes = document.getElementsByClassName('startTime');
	for(var i = 0; i < starttimes.length; i++)
		if(starttimes[i].value == "")
			{
				alert('invalid starttime at index ' + i);
				return false;
			}
	
	var endtimes = document.getElementsByClassName('endTime');
	for(var i = 0; i < endtimes.length; i++)
		if(endtimes[i].value == "")
			{
				alert('invalid endtime at index ' + i);
				return false;
			}
	
	return true;
	
}

function manualCheck(){
	var result = check();
	if(result == true)
		alert('ok');
}

function toHtml(){
	var inps = document.getElementsByTagName('input');
	console.log(inps);
	for(var i = 0; i < inps.length; i++)
		inps[i].setAttribute('value', inps[i].value);
}

function inputToObject(){
	
	if(!check())
		return;
	var lmnts = document.getElementsByClassName('element');
	var sch = [];
	
	for(var i = 0; i < lmnts.length; i++)
	{
		var obj = {};
		obj.start = lmnts[i].children[0].children[0].value;
		obj.end = lmnts[i].children[0].children[1].value;
		obj.stop = stops.filter((a) => a.passengerName.toLowerCase() == lmnts[i].children[1].value.toLowerCase())[0].stopNr;
		sch.push(obj);
	}
	return sch;
}


function save(){
	if(check())
		{
			toHtml();
			localStorage.setItem('lastState', con.innerHTML);
			localStorage.setItem('timeSchedule', JSON.stringify(inputToObject()));
		}
}

function loadLastState(){
	if(localStorage.getItem('lastState'))
		con.innerHTML = localStorage.getItem('lastState');
}
loadLastState();