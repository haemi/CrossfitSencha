<?php

include("../../php/kommentareFun.php");
require_once 'KLogger.php';

// print_r($_GET);

if(!empty($_GET))
{
	$isValid = checkId($_GET['id']) 
				&& checkKursCommentInput($_GET['benutzerid'], $_GET['kommentar'], $_GET['datum'], $_GET['isPR']);
	
	if($isValid)
	{
		$res = alterKursComment($_GET['id'], $_GET['benutzerid'], $_GET['kommentar'], $_GET['datum'], $_GET['isPR']);
	
		if($res)
			echo "Kurskommentar wurde gespeichert.";
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