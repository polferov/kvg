document.getElementById("uiStop").addEventListener("input", function(){
	document.getElementById("autocomplete").style.display = "block";
});
document.getElementById("uiStop").addEventListener("focus", function(){
	document.getElementById("uiStop").select();
	document.getElementById("autocomplete").style.display = "block";
});


document.getElementById("autocomplete").addEventListener("click", function(){
	document.getElementById("autocomplete").style.display = "none";
});

document.addEventListener("click", function(e){
	var t = e.target;
	if(! document.getElementById("uiStopSearch").contains(t))
		document.getElementById("autocomplete").style.display = "none";
});


const setNetworkStatus = {
	OK: function () {
		document.getElementById("networkOK").style.display = "inline-block";
		document.getElementById("networkErr").style.display = "none";
	},
	
	Err: function () {
		document.getElementById("networkErr").style.display = "inline-block";
		document.getElementById("networkOK").style.display = "none";
	}
}

if(!settings.get(settings.hideBackToNormal))
	document.getElementById("backToNormal").style.display = "block";
