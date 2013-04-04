<?php
include("includes.php");

header("content-type: application/json");

ob_start("ob_gzhandler");

performancesForUebungAndBenutzerJSON($_GET['uebungsId'], $_GET['benutzerId']);

function performancesForUebungAndBenutzerJSON($uebungsId, $benutzerId) {
	if (authenticate()) {
		echo performancesForUebungAndBenutzer($uebungsId, $benutzerId);
	}	
}

function performancesForUebungAndBenutzer($uebungsId, $benutzerId) {
	$link = connect();
	$sql = "SELECT kg, cm, wiederholungen, minuten, sekunden, datum, kommentar from uebungskommentare where benutzerid = $benutzerId and uebungsid = $uebungsId";

	$res = sendSql( $sql, $link );

	$return_arr = array();

	while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
    	$row_array['kg'] = $row['kg'];
	    $row_array['cm'] = $row['cm'];
	    $row_array['wiederholungen'] = $row['wiederholungen'];
	    $row_array['minuten'] = $row['minuten'];
    	$row_array['sekunden'] = $row['sekunden'];
		$row_array['datum'] = $row['datum'];
		$row_array['kommentar'] = $row['kommentar'];

	    array_push($return_arr,$row_array);
	}

	return json_encode($return_arr);
}

?>