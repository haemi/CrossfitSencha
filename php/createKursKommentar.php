<?php

include("../../php/kommentareFun.php");
require_once 'KLogger.php';

// print_r($_GET);

if(!empty($_GET))
{
	$isValid = checkKursCommentInput($_GET['benutzerid'], $_GET['kommentar'], $_GET['datum'], $_GET['isPR']);
	
	if($isValid)
	{
		$res = createKursComment($_GET['benutzerid'], $_GET['kommentar'], $_GET['datum'], $_GET['isPR']);
	
		if($res)
			echo "Kommentar wurde gespeichert.";
		else
			echo "Fehler beim Speichern der Kurskommentare.";
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