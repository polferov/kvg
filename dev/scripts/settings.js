var inputs = document.getElementsByClassName("settingsCb");

for(var i = 0; i < inputs.length; i++)
	inputs[i].addEventListener("change", cbOnChange);



function cbOnChange(e){
	var sender = e.target;
	settings.set(sender.getAttribute("setting"), sender.checked);
	
}