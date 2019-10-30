<?php
$filepath = "log.json";
$ident = $_POST["ident"];
$hash = hash("sha256", json_encode($ident));
echo $hash;

$log = (array)json_decode(file_get_contents($filepath), true);

if(!isset($log[$hash])){
    $log[$hash] = array(
        "ident" => $ident,
        "history" => array(),
        "count" => 0
    );
}



if(sizeof(array_filter($log[$hash]["history"] , "filter")) == 0){
$log[$hash]["count"] ++;
array_push($log[$hash]["history"], array(
    "date" => date('Y-m-d H:i:s'),
    "stop" => $_POST["stop"]));
}


function filter($var){
    return $var["date"] == date('Y-m-d H:i:s');
}


file_put_contents($filepath, json_encode($log));