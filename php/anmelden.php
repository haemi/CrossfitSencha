<?php
include("anmeldungenFuerKurse.php");

if (authenticate()) {
	anmeldenJSON($_GET['kursId'], $_GET['benutzerId'], $_GET['datum'], $_GET['uhrzeit'], $_GET['single']);
}

function anmeldenJSON($kursId, $benutzer, $datum, $uhrzeit, $single) {
	$blockInfoMsg = '';

	$log = new KLogger ( "log/anmelden" , KLogger::DEBUG );
	$log->LogInfo("benutzerId: $benutzer - datum: $datum - uhrzeit: $uhrzeit - kursId: $kursId - single: $single");
	
	$return_arr = array();
 	$return_arr['error'] = anmelden($kursId, $single, $benutzer, $datum, 0, $blockInfoMsg);
 	
	echo anmeldungenFuerKurse($benutzer, $datum, $uhrzeit, $return_arr['error']);
}

?>