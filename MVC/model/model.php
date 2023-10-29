<?php
require_once('MVC/model/dbconnect.php');

function get_usersAll()
{
	$pdo = dbconnect();
	$users_result = $pdo->query('SELECT * FROM USERS;');
	return $users_result;
}
function get_userByID($id)
{
	$pdo = dbconnect();
	$request = $pdo->prepare('SELECT * FROM users WHERE id_user = :id_user;');
	$result = $request->execute(array('id_user' => $id));
	return $result;
}
function insert_user($username, $sexe, $email, $password)
{
	$country = "France";
	$phone = "0606060606";
	$pdo = dbconnect();
	$request = $pdo->prepare('
		INSERT INTO users(username, password, gender, country, email, phone) 
		VALUES(:username, :password, :gender, :country, :email, :phone);
		');
	$result = $request->execute(array('username' => $username, 'password' => $password, 'gender' => $sexe, 'country' => $country, 'email' => $email, 'phone' => $phone));
	return $result;
}
function get_userByNameOrMail($usernameOrEmail) {
	if (filter_var($usernameOrEmail, FILTER_VALIDATE_EMAIL)) {
        $sql = "SELECT * FROM users WHERE email = :usernameOrEmail";
    } else {
        $sql = "SELECT * FROM users WHERE username = :usernameOrEmail";
    }

    $pdo = dbconnect();
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':usernameOrEmail', $usernameOrEmail, PDO::PARAM_STR);
    $stmt->execute();

	return $stmt->fetch(PDO::FETCH_ASSOC);
}
function get_tournamentsAll()
{
	$pdo = dbconnect();
	$users_result = $pdo->query('SELECT * FROM TOURNAMENTS;');
	return $users_result;
}
?>

<!-- /*-----------------------------------*/
/* Chargement donnée table PILOTE    */
/*-----------------------------------*/
function GetPilote()
{
	$pdo = dbconnect();
	$pilote_result = $pdo->query('select * from pilote');
	return $pilote_result;
}

/*-----------------------------------*/
/* Liste vols pour 1 fabricant 		 */
/*-----------------------------------*/
function getVolbyFabricant($fabricants)
{
	$pdo = dbconnect();
	 /* Query */
	 $resquest = 'select v.numvoli, v.aeroportdeparts, v.aeroportarrives, v.datevol, t.fabricants, t.modeles,
				  t.versions from vol v, avion a, typeavion t 
				  where v.idavioni = a.idavioni and
				  a.idtypeavioni = t.idtypeavioni and 
				  t.fabricants = :fabricants
				  order by v.datevol';

	 $result = $pdo->prepare($resquest);
	$result->execute(array('fabricants' => $fabricants));
	
	return $result;
 }




/* -------------------------*/
/* Db connection à AIRSIO   */
/* -------------------------*/
function dbconnect()
{
	try
	{
		  $pdo = new PDO('mysql:host=localhost;dbname=airsio', 'root', 'root',
			   array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
		  echo "CONNECTION a AIRSIO OK " . '</br>';
		  return $pdo;
	}
	catch (Exception $e)
	{
		die('Erreur de connection à la base : ' . $e->getMessage());
	}
} -->