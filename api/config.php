<?php
/*
* Collect all Details from Angular HTTP Request.
*/
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$from = $request->from;
$to = $request->to;
// set up the connection variables
$db_name  = 'geolocated_events';
$hostname = 'localhost';
$username = 'root';
$password = 'root';



?>