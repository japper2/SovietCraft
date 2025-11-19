<?php
$servername = "localhost";
$username   = "andrebe1_sc_inlog";
$password   = "CFQMpP65edGYDjsZ43cP";
$dbname     = "andrebe1_sc_inlog";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connectie mislukt: " . mysqli_connect_error());
}

$get_naam = $_GET['naam'];
$get_ww  = $_GET['ww'];

?>