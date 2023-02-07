# there is a new kvg project [here](https://github.com/polferov/kvg2)

# KVG
making kvg pwa


V2
https://kvg.thekirillproject.xyz/

V2 beta
https://kirillkiel.github.io/kvg/dev/
Or
V1
https://kirillkiel.github.io/kvg/




If you are wondering where I get the data from:

var kvg = {
	stopInfoURL: "https://www.kvg-kiel.de/internetservice/services/stopInfo/stop?stop=",
	queryURL: "https://www.kvg-kiel.de/internetservice/services/lookup/autocomplete?query=",
	routeInfoURL: "https://www.kvg-kiel.de/internetservice/services/routeInfo/route",
	passageInfoURLs: {
		arrival: "https://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=arrival&stop=",
		departure: "https://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=departure&stop="
	}
};
 
