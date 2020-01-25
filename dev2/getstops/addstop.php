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

if(!isset($_GET['query'])){
	http_response_code(400);
	die();
}

$q = $_GET['query'];

$data = file_get_contents($kvg.$q);
$doc = new DOMDocument();
$doc->loadHTML($data);

//var_dump($doc->childNodes);

$stops = array();

foreach($doc->getElementsByTagName('li') as $node)
{
	$resp = file_get_contents($kvgInfo . $node->getAttribute('stop'));
	$resp = json_decode($resp);
	
	array_push($stops, array(
		"passengerName" => $resp->passengerName,
		"stopNr" => $node->getAttribute('stop'),
		"id" => $resp->id
	));
	
    //$stop = $node->getAttribute('stop');
    
    //$query = "select count(stopNr) as count from stops where stopNr='".$stop."'";

    /*if(intval($db->query($query)->fetch()['count']) == 0){
        $resp = file_get_contents($kvgInfo.$stop);
        $resp = json_decode($resp);
        $query = "insert into stops (stopnr, id, passengername) values ($stop, '$resp->id', '$resp->passengerName')";
        $db->query($query);
    }*/

}






echo "server response:<br>";
$tabspace = "&nbsp&nbsp&nbsp&nbsp";
foreach($stops as $stop){
	echo "$tabspace{$stop['stopNr']};{$stop['id']}:<br>{$tabspace}{$tabspace}{$stop['passengerName']}<br><br>";
}
echo "<br>added stops:<br>";

foreach($stops as $stop){
	$stop = $node->getAttribute('stop');
    
    $query = "select count(stopNr) as count from stops where stopNr='".$stop."'";

    if(intval($db->query($query)->fetch()['count']) == 0){
        $resp = file_get_contents($kvgInfo.$stop);
        $resp = json_decode($resp);
        $query = "insert into stops (stopnr, id, passengername) values ($stop, '$resp->id', '$resp->passengerName')";
        $db->query($query);
		echo "{$tabspace}{$stop};{$resp->id}<br>{$tabspace}{$tabspace}{$resp->passengerName}<br><br>";
    }
}


echo '<br>updated stops:<br>';
foreach($stops as $stop){
	$stop = $node->getAttribute('stop');
    
    $query = "select passengerName as pn from stops where stopNr='".$stop."'";
	
    $resp = file_get_contents($kvgInfo.$stop);
    $resp = json_decode($resp);

    if($db->query($query)->fetch()['pn'] != $resp->passengerName){
        $query = "update stops set passengerName='{$resp->passengerName}' where stopNr='$stop'";
		echo $query;
        $db->query($query);
		echo "{$tabspace}{$stop};{$resp->id}<br>{$tabspace}{$tabspace}{$resp->passengerName}<br><br>";
    }
}
