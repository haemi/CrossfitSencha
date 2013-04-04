<?php
include("anmeldungenFuerKurse.php");

if (authenticate()) {
	abmeldenJSON($_GET['benutzerId'], $_GET['datum'], $_GET['uhrzeit'], $_GET['kursId']);
}

function abmeldenJSON($benutzer, $datum, $uhrzeit, $kursId) {
	$log = new KLogger ( "log/abmelden" , KLogger::DEBUG );
	$log->LogInfo("benutzerId: $benutzer - datum: $datum - uhrzeit: $uhrzeit - kursId: $kursId");

	$return_arr = array();
 	$return_arr['error'] = abmelden($kursId);
 	
	echo anmeldungenFuerKurse($benutzer, $datum, $uhrzeit, $return_arr['error']);
}

?>