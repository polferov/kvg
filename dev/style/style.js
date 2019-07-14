document.getElementById("uiStop").addEventListener("input", function(){
	document.getElementById("autocomplete").style.display = "block";
});
document.getElementById("uiStop").addEventListener("focus", function(){
	document.getElementById("autocomplete").style.display = "block";
});


document.getElementById("autocomplete").addEventListener("click", function(){
	document.getElementById("autocomplete").style.display = "none";

});