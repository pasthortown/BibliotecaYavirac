<?php
include_once('../routers/RouterPrincipal.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-type:application/json;charset=utf-8');
$r1 = new RouterPrincipal();
echo $r1->route();