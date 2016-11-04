<?php
	$existing = false;
	$match = false;
	$email = false;
	if($_SERVER["REQUEST_METHOD"] == "POST") {
		$email = !preg_match('/@/',$_POST['email']); 
		$match = $_POST['password'] == $_POST['confirm'];
		if($match && !$email) {
			include("sql_connect.php");

			$sql = sprintf("INSERT INTO users_doc VALUES('%s', '%s', '%s', '%s');",
					$_POST['username'],
					$_POST['fullname'],
					$_POST['password'],
					$_POST['email']
			);
			$result = mysql_query($sql, $db);
			if(!$result) {
				if(mysql_errno($db) == 1062) {
					$existing = true;
				}
			}

			if(!$existing && $match && !$email) {
				header("Location: /sign_up_success.php");
			}
		}
	}
?>

<html>
	<head>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
		<link type='text/css' rel='stylesheet' href='css/style.css'>
		<title>Sign up</title>
	</head>

	<body>
		<?php include("top_bar.php"); ?>

		<div class="form">
			<h2>Sign up for a new account</h2>
			<form action="sign_up.php" method="post">
				<input name="username" type="text" placeHolder="User Name"/>
				<?php if($existing) { ?>
              				<p class="error">Username is in use.</p>
            			<?php } ?>
				<input name="fullname" type="text" placeholder="Full Name" />

				<input name="email"    type="text" placeholder="Email" />
				<?php if($_SERVER["REQUEST_METHOD"] == "POST" && $email) { ?>
					<p class="error">Not a valid email.</p>
        			<?php } ?>

				<input name="password" type="password" placeholder="Password" />
				<input name="confirm"  type="password" placeholder="Confirm Password"/>
				<?php if($_SERVER["REQUEST_METHOD"] == "POST" && !$match) { ?>
					<p class="error">Passwords don't match.</p>
        			<?php } ?>
				<input 		       type="submit"   value="Register" />
			</form>

		</div>

	</body>
</html>
