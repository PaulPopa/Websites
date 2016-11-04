<?php
	if(preg_match('/Nintendo/',$_SERVER['HTTP_USER_AGENT']) ) {
		echo "<link type='text/css' rel='stylesheet' href='css/style.css'>";
		echo "<p class=\"correct\"> Well done, this is your flag: <b>flag{sega_vs_nintendo}</b> </p>"; 
	}
	else {
		echo "<link type='text/css' rel='stylesheet' href='css/style.css'>";
		echo "<p class=\"error\"> Only Nintendo users can access this page </p>";
	}
?>
