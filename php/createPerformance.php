<?php

include("../php/kommentareFun.php");

// print_r($_GET);

if(!empty($_GET))
{
	$isValid = checkCommentInput(
			$_GET['kursid'], $_GET['benutzerid'], $_GET['uebungsid'], $_GET['kg'], $_GET['wh'], 
			$_GET['min'], $_GET['sek'], $_GET['cm'], $_GET['kommentar'], $_GET['datum']);
	
	if($isValid)
	{
		$res = createComment(
			$_GET['kursid'], $_GET['benutzerid'], $_GET['uebungsid'], $_GET['kg'], $_GET['wh'], 
			$_GET['min'], $_GET['sek'], $_GET['cm'], $_GET['kommentar'], $_GET['datum']);
	
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