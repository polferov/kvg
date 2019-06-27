$.ajax({
	url: "https://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?stop=2457&mode=departure",
	success: function(r)
	{
		console.log(r);
	},
	error: function(e){
		console.log(e);
	}
});