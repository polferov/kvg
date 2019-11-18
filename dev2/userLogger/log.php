<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$filepath = "log.json";
$ident = $_POST["ident"];
$stop = $_POST['stop'];
$hash = hash("sha256", json_encode($ident));
echo $hash;

$ident = (object) $ident;

$dbdatapath = "/var/safespace/kvg.dbdata.php";
require_once $dbdatapath;

$db = new PDO($pdopath, $username, $passwd);
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$query = "select count(hash) as count from users where hash='".$hash."'";

if(intval($db->query($query)->fetch()['count']) == 0)
{
    //$time = date("Y-m-d H:i:s", intval($ident->time));
    $query = "insert into users (hash, registTime, lang, userAgent, vendor, random) values 
    ('$hash', 
    NOW(),
    '$ident->lang',
    '$ident->ua',
    '$ident->vendor',
    '$ident->random'
    )";

    /*echo "<br>";
    echo $query;
    echo "<br>";*/

    $db->query($query);
}

$query = "select id from users where hash='$hash'";

$userID = $db->query($query)->fetch()['id'];

$query = "insert into logs (userId, tme, stopNr) values ($userID, NOW(), $stop)";

$db->query($query);
?>