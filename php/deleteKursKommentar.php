<?php

include("../php/kommentareFun.php");

// print_r($_GET);

if(!empty($_GET))
{
	$isValid = checkId($_GET['id']);
	
	if($isValid)
	{
		$res = deleteKursComment($_GET['id']);
	
		if($res)
			echo "Kurskommentar wurde geloescht.";
		else
			echo "Fehler beim loeschen der Kurskommentare.";
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