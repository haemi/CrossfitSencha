<?php
include("includes.php");

header("content-type: application/json");

ob_start("ob_gzhandler");

/* if (authenticate()) { */
if (isset($_GET['benutzerId'])) {
	uebungenJSON($_GET['benutzerId']);
} else {
	uebungenJSON(-1);
}
/* } */

function uebungenJSON($benutzerId) {
	$link = connect();
	
	$sql = "SELECT u.id, u.name, u.alternativeNames, u.link, u.kommentar, uk.benutzerid, IF( uk.benutzerid >0, COUNT( * ) , 0 ) AS anzahlPerformances FROM uebungen u LEFT JOIN uebungskommentare uk ON u.id = uk.uebungsid AND uk.benutzerid = $benutzerId GROUP BY u.id, u.name, u.alternativeNames, u.link, u.kommentar, uk.benutzerid ORDER BY name";
	$res = sendSql( $sql, $link );
	$return_arr = array();

	while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
   		$row_arr['name'] = $row['name'];
	    $row_arr['alternativeNames'] = $row['alternativeNames'];
		$row_arr['link'] = $row['link'];
    	$row_arr['kommentar'] = $row['kommentar'];
    	$row_arr['id'] = $row['id'];
    	$row_arr['anzahlPerformances'] = $row['anzahlPerformances'];
	    array_push($return_arr, $row_arr);
	}

	echo json_encode($return_arr);
}

?>