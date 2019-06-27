<?php
$kvg = "https://www.kvg-kiel.de/internetservice/services/stopInfo/stop?stop=";
$lim = 5700;

class item{
	public $id = "";
	public $passengerName = "";
	public $stopNr = "";
}

$i = $_GET["nr"];
		$b = file_get_contents($kvg . strval($i));
		$c = new item();
		$c->id = $b["id"];
		$c->passengerName = $b["passengerName"];
		$c->stopNr = strval($i);

$a = json_decode("tst.json");
array_push($a, $c);
file_put_contents("tst.json", json_encode($a));