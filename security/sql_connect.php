<?php
  $db = mysql_connect("127.0.0.1", "csecvm");
  if(!$db)
    die("Couldn't connect to the MySQL server.");

  $use = mysql_select_db("csecvm", $db);
  if(!$use)
    die("Couldn't select database.");
?>
