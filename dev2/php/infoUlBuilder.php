<?php

$gi = "getInfo.php";

if(isset($_GET['stop']))
{
	if(isset($_GET['mode']))
		echo file_get_contents($gi . "?stop=" . $_GET['stop'] . "&mode=" . $_GET['mode']);
	else
		echo file_get_contents($gi . "?stop=" . $_GET['stop']);
}
else
	echo "Hello4";