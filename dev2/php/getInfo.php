<?php
$arrival = "https://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=arrival&stop=";
$departure = "https://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=departure&stop=";

echo("Hello2");

if(isset($_POST['stop']))
{
	if(isset($_POST['mode']))
	{
		if($_POST['mode'] == "arr")
			echo file_get_contents($arrival + $_POST['stop']);
		
		if($_POST['mode'] == "dep")
			echo file_get_contents($departure + $_POST['stop']);
	}
	else
		echo file_get_contents($departure + $_POST['stop']);
}
else 
	echo file_get_contents('instructions.html');