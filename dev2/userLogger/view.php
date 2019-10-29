<?php
$filepath = "log.json";
$data = json_decode(file_get_contents($filepath), true);
echo '<script>var a = '.json_encode($data).'; console.log(a);</script>';
echo "<pre>";
var_dump($data);
echo "</pre>";