async function userlog(){
    if(!localStorage.getItem('userIdent')){
        var ident = {
            time: Date.now(),
            ua: navigator.userAgent,
            lang: navigator.language,
            vendor: navigator.vendor,
            random: (Math.random().toString() + Math.random().toString()).replace(/\./g, "")
        }
        localStorage.setItem("userIdent", JSON.stringify(ident));
        console.log(ident);
    }

    $.post(
        {
            url: "userLogger/log.php",
            data: {
                ident: JSON.parse(localStorage.getItem('userIdent')),
                stop: activeStop || -1
            },
            success: function(res){
                console.log(res);
                
            }
        }
    );
}