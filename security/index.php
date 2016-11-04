<?php 
	session_start();
?>

<html>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
	<link type='text/css' rel='stylesheet' href='css/style.css'>

	<script>
		var w = window.innerWidth;
		var h = window.innerHeight;
		if( w == 638 & h == 420) {
			window.location = "http://localhost/token.php";
		}
	</script>
	<body>
		<?php include("top_bar.php"); ?>

		<div class="tokens">
			<p> There are four tokens on this website </p>
			<p> Hints: </p>
			<p> There are more users that start with the same letter/s </p>
			<p> Files are not always visible </p>
			<p> One user has a secret folder </p>
		<div>

		<div class="bottom_bar">
			<p class="bottom_text">This is a website for creating and storing documents.</p>
		</div>
	</body>
</html>
