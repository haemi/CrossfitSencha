<?php
include("includes.php");

header("content-type: application/json");

ob_start("ob_gzhandler");

anmeldungenFuerKurseJSON();

function anmeldungenFuerKurseJSON() {
	if (authenticate()) {
		echo anmeldungenFuerKurse();
	}	
}

function anmeldungenFuerKurse() {
$link = connect();
	
    $check_date = 1343779200; // '2012-08-01';
    $end_date = 1364774400; // 1354774400; // 1364774400; // '2013-03-31';
	$benutzer = 161;
	
	echo "datum;";
	
	for ($i = 0; $i < $benutzer; $i++) {
		$sql = "SELECT vorname, nachname from benutzer where id = " . $i;
		$res = sendSql( $sql, $link );
		if (mysql_num_rows($res) > 0) {
			while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
				echo html_entity_decode($row['vorname']) . " " . html_entity_decode($row['nachname']) . ";";
			}
		} else {
			echo ";";
		}
	}

	echo "\n";

    while($check_date < $end_date){
		$sql = "SELECT benutzerId, COUNT( * ) as anzahl, vorname, nachname FROM kurse, benutzer WHERE benutzerid = benutzer.id AND benutzerid > 0 AND kurse.datum <= '" . date("Y-m-d", $check_date) . "' GROUP BY benutzerId, vorname, Nachname ORDER BY benutzerId";
        $check_date += 86400;

		$res = sendSql( $sql, $link );
		
		while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
			$results[date("Y-m-d", $check_date)][$row['benutzerId']] = $row['anzahl'];
		}
    }
	
	foreach ($results as $currentDate => $rankings) {
		echo $currentDate . ";";
		for ($i = 0; $i < $benutzer; $i++) {
			echo $rankings[$i] . ";";
		}
		echo "\n";
	}
	//*/
}

?>