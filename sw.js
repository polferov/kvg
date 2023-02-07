const CACHE_NAME = "sitecache-v1";

const urlsToCache = [
    "/index.html",
    "/"
];

const urlsToNotCache = [
    "/getstops/addstop.php",
	"/infoUlBuilder.php"
];

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache){
          console.log(cache);
          cache.addAll(urlsToCache);
      })
                 
    );
});



self.addEventListener("fetch", function(event){
    for(var i = 0; i < urlsToNotCache.length; i++)
        if(event.request.url.includes(urlsToNotCache[i]))
            return;


    if(!navigator.onLine)
        {
            event.respondWith(caches.match(event.request).then(function(response){
                
                if(response){
                    console.log(response);
                    return response;
                }
                return fetch(event.request);
            }));
        }
    
    fetch(event.request).then(function(response){
        if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
        
        var newCache = response.clone();
        
        for(var i in urlsToCache)
            if(urlsToCache[i] == event.request.url)
                caches.open(CACHE_NAME).then(function(cache){
                    cache.put(event.request, newCache);
                });
    });
});