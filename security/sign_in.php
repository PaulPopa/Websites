<?php
	session_start();
	$wearein = false;

	if(isset($_SESSION['username'])) {
		header("Location: /index.php");
	}

	if($_SERVER["REQUEST_METHOD"] == "POST") {
		include("sql_connect.php");

		$sql = sprintf("SELECT username, fullname, password, email FROM users_doc WHERE username = '%s' AND password = '%s';",
			mysql_real_escape_string($_POST['username']), $_POST['password']);

		$result = mysql_query($sql, $db);
    		if(!$result) {
      			die("Query failed: " . mysql_error());
		}

    		$wearein = mysql_num_rows($result) > 0;
		if($wearein == true) {
			$row = mysql_fetch_assoc($result); 
			session_regenerate_id();
      			$_SESSION['username'] = $row;
      			header("Location: /index.php");
		}
	}
?>


<html>
	<head>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
		<link type='text/css' rel='stylesheet' href='css/style.css'>
		<title>Sign in</title>
	</head>
	<body>
		<?php include("top_bar.php");?>
		<div class="form">
			<form action="sign_in.php" method="post">
			<h2>Log in into your account</h2>
				<input name="username" type="text" placeHolder="User Name"/>
				<input name="password" type="password" placeholder="Password" />
				
				<?php if($_SERVER["REQUEST_METHOD"] == "POST" && $wearein == false) { ?>
					<p class="error"> Invalid credentials! </p>
				<?php } ?>
				<input 		       type="submit"   value="Log In" />
			</form>
		</div>
	</body>
</html>
