<?php
$kvg = "https://www.kvg-kiel.de/internetservice/services/lookup/autocomplete?query=";
$kvgInfo = "https://www.kvg-kiel.de/internetservice/services/stopInfo/stop?stop=";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



$dbdatapath = "/var/safespace/kvg.dbdata.php";
require_once $dbdatapath;


$db = new PDO($pdopath, $username, $passwd);

$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$q = $_GET['query'];

$data = file_get_contents($kvg.$q);
$doc = new DOMDocument();
$doc->loadHTML($data);

//var_dump($doc->childNodes);

foreach($doc->getElementsByTagName('li') as $node)
{
    $stop = $node->getAttribute('stop');
    
    $query = "select count(stopNr) as count from stops where stopNr='".$stop."'";

    if(intval($db->query($query)->fetch()['count']) == 0){
        $resp = file_get_contents($kvgInfo.$stop);
        $resp = json_decode($resp);
        $query = "insert into stops (stopnr, id, passengername) values ($stop, '$resp->id', '$resp->passengerName')";
        $db->query($query);
    }

}
echo "should be done";