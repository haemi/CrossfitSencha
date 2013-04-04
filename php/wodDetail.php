<?php
include("includes.php");

header("content-type: application/json");

ob_start("ob_gzhandler");

if (authenticate()) {
    	$link = connect();
        $sql = "SELECT k.id, k.kommentar, w.datum, k.isPR, w.beschreibung FROM workouts w left join kurskommentare k ON w.datum = k.datum and benutzerid = " . $_GET['benutzerId'] . " where w.datum = '" . $_GET['datum'] . "'";
		
        $res = mysql_query( $sql, $link);
         
		$return_arr = array();

		while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
    	   	$row_arr['wodDetailId'] = $row['id'];
    	   	$row_arr['kommentar'] = $row['kommentar'];
    	   	$row_arr['isPR'] = $row['isPR'];
    	   	$row_arr['datum'] = $row['datum'];
    	   	$row_arr['beschreibung'] = $row['beschreibung'];
			array_push($return_arr, $row_arr);
		}

		if (mysql_num_rows($res) == 0) {
			return '[{}]';
		}

		echo json_encode($return_arr);
}

?>