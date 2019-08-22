<?php
$arrival = "https://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=arrival&stop=";
$departure = "https://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=departure&stop=";

$data = null;

if(isset($_GET['stop']))
{
	if(isset($_GET['mode']))
	{
		if($_GET['mode'] == "arr")
			$data = file_get_contents($arrival . $_GET['stop']);
		
		if($GET['mode'] == "dep")
			$data = file_get_contents($departure . $_GET['stop']);
	}
	else
		$data = file_get_contents($departure . $_GET['stop']);
}
else 
	echo file_get_contents('instructions.html');

echo $data;
