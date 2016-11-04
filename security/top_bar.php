<div class="menu">
	<ul class="submenu">
		<li><a href="/index.php">Home</a></li>
		<?php if(!isset($_SESSION['username'])) { ?>
			<li><a href="/sign_in.php">Sign In</a></li>
			<li><a href="/sign_up.php">Sign Up</a></li>
		<?php } else { ?>
			<li><a href="/documents.php">My Documents</a></li>
			<li><a href="/create_document.php">Create Document</a></li>
			<li class="rightbar">Welcome <small>(<?php echo($_SESSION['username']['fullname']); ?>)</small></li>
			<li><a href="/sign_out.php">Sign Out</a></li>
		<?php } ?>
	</ul>
</div>
