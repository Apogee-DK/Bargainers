<?php
session_start();

//DESTROY SESSION upon LOG-OUT

if(session_destroy())		//destroy all sessions
{
	unset($_SESSION['login_user']);
	header("Location: index.php");		//redirect to home page
}
?>
