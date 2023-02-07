function loadManifest () {
//	console.log("Test123");
	$.ajax({
		url: "webapstuff/manifest.json",
		success: function (res){
			var manifest = document.getElementById('manifest');
			var blb = new Blob([JSON.stringify(res)]);
			var manurl = URL.createObjectURL(blb);
			manifest.setAttribute("href", manurl);
		}
	});
}
loadManifest();