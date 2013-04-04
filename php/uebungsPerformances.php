<?php

include("includes.php");

header("content-type: application/json");

ob_start("ob_gzhandler");

if ($_GET['directlyCalled']) {
	uebungsPerformancesJSON();
}

function uebungsPerformancesJSON() {
	echo uebungsPerformances($_REQUEST['benutzerId'], $_REQUEST['uebungsId']);
}

function uebungsPerformances($benutzerId, $uebungsId) {
	$link = connect();
	$sql = "SELECT uk.id, uk.uebungsid, uk.kg, uk.cm, uk.wiederholungen, uk.minuten, uk.sekunden, uk.datum, uk.kommentar from uebungskommentare uk, uebungen u where uk.uebungsid = u.id and benutzerid = $benutzerId AND uebungsid = $uebungsId";

	$log = new KLogger ( "log/uebungen/performances" , KLogger::DEBUG );
	$log->LogInfo("benutzerId: $benutzerId - uebungsId: $uebungsId");
	
	$res = sendSql( $sql, $link );

	$return_arr = array();

	while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
	    $row_array['kg'] = $row['kg'];
	    $row_array['wiederholungen'] = $row['wiederholungen'];
	    $row_array['minuten'] = $row['minuten'];
	    $row_array['sekunden'] = $row['sekunden'];
	    $row_array['datum'] = $row['datum'];
	    $row_array['kommentar'] = $row['kommentar'];
	    $row_array['cm'] = $row['cm'];
		$row_array['uebungsid'] = $row['uebungsid'];
		$row_array['kommentarid'] = $row['id'];

	    array_push($return_arr,$row_array);
	}
	
	if (mysql_num_rows($res) == 0) {
		return '[{}]';
	}

	return json_encode($return_arr);
}

?>