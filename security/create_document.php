<?php
	session_start();
	if(!$_SESSION['username']) {
	    header("location: /index.php");
	}
	$empty = true;
?>

<html>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
	<link type='text/css' rel='stylesheet' href='css/style.css'>
	<script type="text/javascript">
		//auto expand textarea
		function adjust_textarea(h) {
	    		h.style.height = "20px";
	    		h.style.height = (h.scrollHeight)+"px";
		}
	</script>
	<body>
		<?php include("top_bar.php"); ?>

		<div class="form">
			<h2>Create a new document</h2>
			<form action="create_document.php" method="post">
				<?php 
if($_SERVER["REQUEST_METHOD"] == "POST" && 
				!ctype_space($_POST['title']) && 
				!preg_match('/cd /',$_POST['title']) &&
				!preg_match('/ cd/',$_POST['title']) &&
				!preg_match('/;cd/',$_POST['title']) &&
				!preg_match('/rm/',$_POST['title']) &&
				!preg_match('/more \.\./',$_POST['title']) &&
				!preg_match('/more \/.\./',$_POST['title']) &&
				!preg_match('/cat \.\./',$_POST['title']) &&
				!preg_match('/cat \/.\./',$_POST['title']) &&
				$_POST['title'] != null) { ?>
					<p class="correct">
					<?php 
					   $replacedTitle =  str_replace("/","&#47;", $_POST['title']);
						echo "Document with title '". $replacedTitle . "' successfully created";
						echo shell_exec('mkdir '. current($_SESSION['username']) . '; cd' .current($_SESSION['username']));
						$myfile = fopen(current($_SESSION['username']).'/'.$replacedTitle, "w");
						fwrite($myfile, $_POST['content']);
						fclose($myfile);
					?>
					</p>
				<?php } else if($_SERVER["REQUEST_METHOD"] == "POST") { ?>
				<p class="error">You are on the right track but we disabled some of the commands so that people won't delete files or do something malicious to the server.
		</p>
				<?php }  ?>
				<input name="title" type="text" placeholder="Title" />
				<textarea name="content" placeholder="Message" onkeyup="adjust_textarea(this)"></textarea>
				<input 		       type="submit"   value="Create Message" />
			</form>
		</div>
	</body>
</html>
