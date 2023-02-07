var cbs = document.getElementsByClassName("settingsCb");
var nrs = document.getElementsByClassName("settingsNr");

for(var i = 0; i < cbs.length; i++){
	cbs[i].addEventListener("change", cbOnChange);
	cbs[i].checked = settings.get(cbs[i].getAttribute("setting")) || false;
}

for(var i = 0; i < nrs.length; i++)
	{
		nrs[i].addEventListener("change", nrOnChange);
		nrs[i].value = settings.get(nrs[i].getAttribute("setting")) || "1";
	}



function cbOnChange(e){
	var sender = e.target;
	settings.set(sender.getAttribute("setting"), sender.checked);
	
}

function nrOnChange(e){
	var sender = e.target;
	settings.set(sender.getAttribute("setting"), sender.value);
	
}

if(document.getElementById('dark').checked){
	document.getElementById('amodark').style.display = "flex";
}

document.getElementById('dark').addEventListener('change', function(){
	location.href = location;
});
document.getElementById('amodarkmode').addEventListener('change', function(){
	location.href = location;
});




function clearStorage() {
	if(confirm('Delete?'))
	{
		localStorage.clear();
		alert('done');
	}
	else
		alert('canceled')
	
}



if(settings.get(settings.darkmode)){
	var bdy = document.getElementById('bdy');
	//var tc = document.getElementById('theme-color');
	//var tce = document.createElement('meta');
	//tce.setAttribute("name", "theme-color");
	bdy.classList.add('dark');
	if(settings.get(settings.amodarkmode)){
		bdy.classList.add('amodark');
		//tce.setAttribute("content", "#000");
	}//else
		//tce.setAttribute("content", "#202020");
	//document.head.appendChild(tce);
}