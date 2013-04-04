<?php
function get_user_password($username) {
	$sql = "select passwort from benutzer where mail = '$username'";

	$link = connect();

	$res = sendSql($sql, $link);

	$return_arr = array();

	while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
		return $row['passwort'];
	}
}

if ($_REQUEST['directlyCalled']) {
	authenticate();
}

function authenticate() {
	// Check username and password:
	if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {

		$usernameSent = $_SERVER['PHP_AUTH_USER'];
		$passwordSent = $_SERVER['PHP_AUTH_PW'];

		if (strcmp(get_user_password($usernameSent), $passwordSent) == 0) {
			return true;
		}
	}

	// Login passed successful?
	if (!$LoginSuccessful) {
		// The text inside the realm section will be visible for the
		// user in the login box
		header('WWW-Authenticate: Basic realm="Secret page"');
		header('HTTP/1.1 403 Forbidden');

		return false;
	} else {
		return true;
	}

}
?>