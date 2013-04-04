<?php
include("includes.php");

header("content-type: application/json");

ob_start("ob_gzhandler");

if (authenticate()) {
	wochenUebersichtJSON($_GET['startDerWoche'], $_GET['endeDerWoche'], $_GET['benutzerId']);
}

function wochenUebersichtJSON($startDatum, $endDatum, $benutzerId) {
	$link = connect();

	$log = new KLogger ( "log/wochenUebersicht" , KLogger::DEBUG );
	$log->LogInfo("benutzerId: $benutzerId - startDatum: $startDatum - endDatum: $endDatum");
	
	// Start date
	$date = $startDatum;
	// End date
	$end_date = $endDatum;

	$returnArray = array();

	while (strtotime($date) <= strtotime($end_date)) {
		$sql = "select beschreibung, kursevo.id as kursid, 0 as single, '$date' as datum, teilnehmermax, beginn, (select count(*) as anmeldungen from kurse where datum = '$date' and kurse.beginn = kursevo.beginn) as anmeldungen, (select MAX( IF( benutzerid = $benutzerId, $benutzerId, 0 ) ) from kurse where datum = '$date' and kurse.beginn = kursevo.beginn) as ichbinangemeldet, (SELECT IF( innerKurse.id >0, innerKurse.id, 0 ) FROM kurse innerKurse WHERE innerKurse.benutzerid = $benutzerId AND innerKurse.datum = '$date' AND innerKurse.beginn = kursevo.beginn ) AS abmeldenKursId from kursevo where DATE_FORMAT( '$date',  '%w' ) = kursevo.wochentag";
		$sql .= " union ";
		$sql .= "select beschreibung, einzelkurse.id as kursid, 1 as single, '$date' as datum, teilnehmermax, beginn, (select count(*) as anmeldungen from kurse where datum = '$date' and kurse.beginn = einzelkurse.beginn) as anmeldungen, (select MAX( IF( benutzerid = $benutzerId, $benutzerId, 0 ) ) from kurse where datum = '$date' and kurse.beginn = einzelkurse.beginn) as ichbinangemeldet, (SELECT IF( innerKurse.id >0, innerKurse.id, 0 ) FROM kurse innerKurse WHERE innerKurse.benutzerid = $benutzerId AND innerKurse.datum = '$date' AND innerKurse.beginn = einzelkurse.beginn ) AS abmeldenKursId from einzelkurse where '$date' = einzelkurse.datum order by datum, beginn";
		
		$res = sendSql( $sql, $link );

		while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
			$sqlAusnahme = "select * from ausnahmen where startdatum = '" . $row['datum'] . "' AND hour('" . $row['beginn'] . "') >= hour(beginn) AND hour('" . $row['beginn'] . "') <= hour(ende)";
			$sqlEinzelkurse = "select * from einzelkurse where datum = '" . $row['datum'] . "' AND beginn = '" . $row['beginn'] . "' AND anmeldung = 0";
			
			$resAusnahme = sendSql( $sqlAusnahme, $link );
			$resEinzelkurse = sendSql($sqlEinzelkurse, $link);

			if (mysql_num_rows($resAusnahme) > 0) {
				while ($rowAusnahme = mysql_fetch_array($resAusnahme, MYSQL_ASSOC)) {
		    		$row_arr['id'] = $row['id'];
				    $row_arr['beginn'] = $row['beginn'];
	    			$row_arr['datum'] = $row['datum'];
			    	$row_arr['anmeldungen'] = 0;
			    	$row_arr['teilnehmermax'] = 0;
	    			$row_arr['abmeldenKursId'] = 0;
	    			$row_arr['ichbinangemeldet'] = 0;
			    	$row_arr['kursid'] = 0;
			    	$row_arr['single'] = 0;
			    	$row_arr['beschreibung'] = $rowAusnahme['beschreibung'];
			    	array_push($returnArray, $row_arr);
					break;
				}				
			} else if (mysql_num_rows($resEinzelkurse) > 0) {
				while ($rowAusnahme = mysql_fetch_array($resEinzelkurse, MYSQL_ASSOC)) {
		    		$row_arr['id'] = $row['id'];
				    $row_arr['beginn'] = $row['beginn'];
	    			$row_arr['datum'] = $row['datum'];
			    	$row_arr['anmeldungen'] = 0;
			    	$row_arr['teilnehmermax'] = 0;
	    			$row_arr['abmeldenKursId'] = 0;
	    			$row_arr['ichbinangemeldet'] = 0;
			    	$row_arr['kursid'] = 0;
			    	$row_arr['single'] = 0;
			    	$row_arr['beschreibung'] = $rowAusnahme['beschreibung'];
			    	array_push($returnArray, $row_arr);
					break;
				}				
			} else {
	    		$row_arr['id'] = $row['id'];
			    $row_arr['beginn'] = $row['beginn'];
    			$row_arr['datum'] = $row['datum'];
		    	$row_arr['anmeldungen'] = $row['anmeldungen'];
		    	$row_arr['teilnehmermax'] = $row['teilnehmermax'];
    			$row_arr['abmeldenKursId'] = $row['abmeldenKursId'];
    			$row_arr['ichbinangemeldet'] = $row['ichbinangemeldet'] > 0 ? 1 : 0;
		    	$row_arr['kursid'] = $row['kursid'];
		    	$row_arr['single'] = $row['single'];
		    	$row_arr['beschreibung'] = $row['beschreibung'];
		    	array_push($returnArray, $row_arr);
			}
		}

		$date = date ("Y-m-d", strtotime("+1 day", strtotime($date)));
	}
	echo json_encode($returnArray);
}
//*/
?>