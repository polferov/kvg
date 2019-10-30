async function userlog(){
    if(!localStorage.getItem('userIdent')){
        var ident = {
            time: Date.now(),
            ua: navigator.userAgent,
            lang: navigator.language,
            vendor: navigator.vendor,
            random: Math.random().toString() + Math.random().toString()
        }
        localStorage.setItem("userIdent", JSON.stringify(ident));
        console.log(ident);
    }

    $.post(
        {
            url: "userLogger/log.php",
            data: {
                ident: JSON.parse(localStorage.getItem('userIdent')),
                stop: stops.filter((a) => a.stopNr == activeStop)[0] || -1
            },
            success: function(res){
                console.log(res);
                
            }
        }
    );
}