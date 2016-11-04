<?php
	session_start();
	if(!$_SESSION['username']) {
	    header("location: /index.php");
	}

	$wearein = false;

	$dir = current($_SESSION['username']); 
	$files1 = @scandir($dir);
	$length = count($files1);

	if($length > 1) {
		$wearein = true;
	}

	if( isset($_GET['delete']) )
	{
		if($_GET['delete'] == "House" || $_GET['delete'] == "Help" || $_GET['delete'] == "911" || $_GET['delete'] == "Cooking" || $_GET['delete'] == "Kangaroo" || $_GET['delete'] == "Politician" || $_GET['delete'] == "Cat" || $_GET['delete'] == "Frisbee" || $_GET['delete'] == "Shark" || $_GET['delete'] == "Cows" || $_GET['delete'] == "Parrot" || $_GET['delete'] == "Crab" || $_GET['delete'] == "Gym")
		{
			echo "<p class=\"error\"> Cannot delete this file </p>";
		}
		else 
		{
			$val1 = str_replace("/","&#47;", $_GET['delete']);
			$deleteFile = unlink(current($_SESSION['username']).'/'.$val1);

			if($deleteFile==true) {
				header("Refresh: 0.01;url=/documents.php");
			}
		
			else {
				die("Query failed: " . mysqli_error($conn));
			}
		}
	}
?>

<html>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
	<link type='text/css' rel='stylesheet' href='css/style.css'>
	<body>

		<?php include("top_bar.php"); ?>
		<?php 
			if ($wearein == true) {
				echo "<table class=\"names\">";
				for ($i = 0; $i < $length; $i++) {

					if($files1[$i] != "secret_message" && !is_dir($files1[$i]))  {

						$delete = "<input class=\"delete\" type=\"submit\" name=\"delete\" value=\"$files1[$i]\">";
						$open = "<input class=\"open\" type=\"submit\" name=\"open\" value=\"$files1[$i]\">";
				
	    					echo "<tr>
							<td align=\"left\">Title: " . $files1[$i]."</td>".
							'<form class="hiddens" action="" method="get">'. " ".
								"<td align=\"right\">".$open."</td>".
								"<td align=\"right\">".$delete."</td>".
							'</form>'."</tr>" ;
					}
				}
				echo "</table>";

			}
			else {
		?>
		<p> No documents to show </p>
		<?php } ?>
		<?php 
			if( isset($_GET['open']) )
			{
				$url =  "{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";
				if(preg_match('/cd/',$url) || strpos($url, 'ls+..') !== false || strpos($url, 'ls%20..') !== false || 
				strpos($url, 'ls+-') !== false || strpos($url, 'ls%20-') !== false || preg_match('/rm/',$url) || preg_match('/cat \.\./', $url) || preg_match('/more \.\./', $url)) {
					header("location: /documents.php");
					
				}
				else {
					echo 
					"<div class=\"box\">
						<p> Title: ". htmlentities($_GET['open']). "</p>
						<p> Content: </p> ".
						shell_exec('cd '.current($_SESSION['username']). ' ; cat '.$_GET['open']).
					"</div>";
				}
			}

		?>
		<div class="bottom_bar">
			<p class="bottom_text">This is a website for creating and storing documents.</p>
		</div>
	</body>
</html>
		
