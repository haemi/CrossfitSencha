<?php

include("includes.php");

header("content-type: application/json");

ob_start("ob_gzhandler");

if ($_GET['directlyCalled']) {
	anmeldungenFuerKurseJSON();
}

function anmeldungenFuerKurseJSON() {
	echo anmeldungenFuerKurse($_REQUEST['benutzerId'], $_REQUEST['datum'], $_REQUEST['uhrzeit'], '');
}

function anmeldungenFuerKurse($benutzerId, $datum, $beginn, $error) {
	$log = new KLogger ( "log/anmeldungenFuerKurse" , KLogger::DEBUG );
	$log->LogInfo("benutzerId: $benutzerId - datum: $datum - beginn: $beginn - error: $error");

	$link = connect();
	$sql = "SELECT if(benutzer.id = $benutzerId, kurse.id,0) as abmeldenKurseId, benutzer.id, benutzer.vorname, benutzer.nachname, benutzer.isPublic, kurse.probetraining FROM `kurse`, benutzer WHERE benutzer.id = kurse.benutzerid and datum = '$datum' and beginn = '$beginn' ORDER BY vorname, nachname";

	$res = sendSql( $sql, $link );

	$return_arr = array();

	while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
    	$row_array['vorname'] = $row['vorname'];
	    $row_array['nachname'] = $row['nachname'];
	    $row_array['benutzerid'] = $row['id'];
	    $row_array['abmeldenKurseId'] = $row['abmeldenKurseId'];
    	$row_array['displayName'] = $row['isPublic'] == '1' ? $row['vorname'] . " " . $row['nachname'] : "Teilnehmer";
		
		if ($benutzerId == 32 || $benutzerId == 62 || $benutzerId == 114) {
	    	$row_array['displayName'] = $row['vorname'] . " " . $row['nachname'];

			if ($row['id'] == 0) {
		    	$row_array['displayName'] = $row['vorname'] . ": " . $row['probetraining'];
			}
		}
		
	    $row_array['errorMessage'] = $error;

	    array_push($return_arr,$row_array);
	}
	
	if (mysql_num_rows($res) == 0) {
		return '[{}]';
	}

	return json_encode($return_arr);
}

?>