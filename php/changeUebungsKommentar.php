<?php

include("../../php/kommentareFun.php");
require_once 'KLogger.php';

// print_r($_GET);

if(!empty($_GET))
{
	$isValid =checkId($_GET['id']) 
				&&  checkUebungsCommentInput(
						$_GET['benutzerid'], $_GET['uebungsid'], $_GET['kg'], $_GET['wh'],
						$_GET['min'], $_GET['sek'], $_GET['cm'], $_GET['datum']);

	$log = new KLogger ( "log/uebungen/createChangeUebung" , KLogger::DEBUG );
	$log->LogInfo("valid: $isValid - benutzerId: $benutzerId - uebungsId: " . $_GET['uebungsid'] . " - kg: " . $_GET['kg'] . " - wh: " . $_GET['wh'] . " - min: " . $_GET['min'] . " - sek: " . $_GET['sek'] . " - cm: " . $_GET['cm'] . " - datum: " . $_GET['datum'] . " - id: " . $_GET['id']);
	
	if($isValid)
	{
		$res = alterUebungsComment($_GET['id'],
			$_GET['benutzerid'], $_GET['uebungsid'], $_GET['kg'], $_GET['wh'],
			$_GET['min'], $_GET['sek'], $_GET['cm'], $_GET['datum'], $_GET['kommentar']);

		if($res) {
			echo "&Uuml;bungskommentar wurde gespeichert.";
		}
		else
			echo "Fehler beim Speichern der Kommentare.";
	}
	else
	{
		echo "Eingabe falsch.";
	}
}
else
{
	echo "GET nicht gesetzt.<br>";
}

?>