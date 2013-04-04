<?php
include("includes.php");

header("content-type: application/json");

ob_start("ob_gzhandler");

if (authenticate()) {
    	$link = connect();
        $sql = "SELECT k.datum, w.beschreibung, kk.kommentar as kommentar, kk.isPR FROM workouts w, kurse k left join kurskommentare kk on k.datum = kk.datum and kk.benutzerid = " . $_GET['benutzerId'] . " WHERE 1 = 1";
        
        if ($_GET['benutzerId'] != 32) {
	        $sql .= " AND k.benutzerid = " . $_GET['benutzerId'];
        }
        $sql .= " and k.datum = w.datum GROUP BY datum order by datum desc";
        $res = mysql_query( $sql, $link);
         
		$return_arr = array();

		while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
    	   	$row_arr['datum'] = $row['datum'];
       		$row_arr['beschreibung'] = $row['beschreibung'];
       		$row_arr['hatKommentar'] = strlen($row['kommentar']) > 0;
       		$row_arr['isPR'] = $row['isPR'];
			array_push($return_arr, $row_arr);
		}
		echo json_encode($return_arr);
}

?>