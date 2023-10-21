<?php
function dbconnect()
{
	try
	{
		$bdd = new PDO('mysql:host=localhost; dbname=sandbox; charset=utf8', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
		echo "CONNECTION OK " . '</br>'; 
		return $bdd;
	}
	catch (Exception $e)
	{
		die('Erreur de connection à la base : ' . $e->getMessage());
	}
}
?>