<?php
$filepath = "log.json";
$data = $_POST;
$hash = hash("sha256", json_encode($data));
echo $hash;

$log = (array)json_decode(file_get_contents($filepath), true);

if(!isset($log[$hash])){
    $log[$hash] = array(
        "ident" => $data,
        "history" => array(),
        "count" => 0
    );
}

$log[$hash]["count"] ++;
array_push($log[$hash]["history"], date('Y-m-d H:i:s'));




file_put_contents($filepath, json_encode($log));