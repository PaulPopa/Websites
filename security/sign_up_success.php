<?php
  session_start();
  header("Refresh: 22;url=/sign_in.php");
?>

<html>
	<head>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
		<link type='text/css' rel='stylesheet' href='css/style.css'>
		<title>Sign up success</title>
	</head>

	<body>
		<?php include("top_bar.php"); ?>

		<div class="form">
			<h2>You have successfully created an account</h2>
			<p class="simple">You will now be redirected to the signin page.</p>
        		<p class="simple">If not, click <a href="/sign_in.php">here</a>.</p>
			<input type="hidden" name="HINT: OPEN WITH NOTEPAD" value="Parw.txt">
		</div>
	</body>
</html>
