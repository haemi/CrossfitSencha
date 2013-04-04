<?php

include("../../php/kommentareFun.php");
require_once 'KLogger.php';

// print_r($_GET);

if(!empty($_GET))
{
	$isValid = checkId($_GET['id']);
	
	if($isValid)
	{
		$res = deleteUebungsComment($_GET['id']);

		$log = new KLogger ( "log/uebungen/createChangeUebung" , KLogger::DEBUG );
		$log->LogInfo($_GET['id']);
	
		if($res)
			echo "Kommentar wurde geloescht.";
		else
			echo "Fehler beim loeschen der Kommentare.";
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