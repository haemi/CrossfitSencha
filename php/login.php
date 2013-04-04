<?php
include("includes.php");

header("content-type: application/json");

if (authenticate()) {
	loginJSON($_GET['email']);
}

function loginJSON($username) {

	if (authenticate()) {
    	$link = connect();
        $sql = "SELECT id FROM benutzer WHERE mail='".htmlentities($username)."'";
        $res = mysql_query( $sql, $link);
         
		$return_arr = array();

        if($res) {
        	$row = mysql_fetch_array($res);
         	$return_arr['benutzerid'] = $row['id'];
         } else {
	       	$return_arr['benutzerid'] = 0;
         }

		echo json_encode($return_arr);
	} else {
		$return_arr['benutzerid'] = 0;
		echo json_encode($return_arr);
	}
}

?>