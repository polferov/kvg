<?php
$kvg = "https://www.kvg-kiel.de/internetservice/services/stopInfo/stop?stop=";

class item{
	public $id = "";
	public $passengerName = "";
	public $stopNr = "";
}

$i = $_GET["nr"];
		$b = json_decode(file_get_contents($kvg . strval($i)));

if(! is_null($b)){
		$c = new item();
		$c->id = $b->id;
		$c->passengerName = $b->passengerName;
		$c->stopNr = strval($i);
file_put_contents("stops.json", json_encode($c).",", FILE_APPEND);
}