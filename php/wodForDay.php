<?php
include("includes.php");

header("content-type: application/json");

ob_start("ob_gzhandler");

if (authenticate()) {
	wod();
}

function wod() {
	$link = connect();
	
	$sql = "select datum, beschreibung from workouts where datum = '" . $_GET['datum'] . "' order by datum desc";

	$res = sendSql( $sql, $link );

	$return_arr = array();
	while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
		$row_arr['datum'] = $row['datum'];
		$row_arr['beschreibung'] = $row['beschreibung'];
		array_push($return_arr, $row_arr);
	}

	echo json_encode($return_arr);
}

?>