<?php
die(); //uncomment this to get all stops
$kvg = "https://www.kvg-kiel.de/internetservice/services/stopInfo/stop?stop=";

$dbdatapath = "/var/safespace/kvg.dbdata.php";
require_once $dbdatapath;


$db = new PDO($pdopath, $username, $passwd);
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$data = file_get_contents("../stops.json");
$data = json_decode($data);



foreach($data as $el){
    $query = "insert into stops (stopnr, id, passengername) values ($el->stopNr, '$el->id', '$el->passengerName')";
    $db->query($query);
    
}