<?php
require_once('MVC/model/model.php');

//----------------------------------------------------- call views ----------------------------------------------------------------------
function get_header()
{
    require('MVC\view\header.php');
}
function get_footer()
{
    require('MVC\view\footer.php');
}
function get_login()
{
    require('MVC\view\login.php');
}
function get_register()
{
    require('MVC\view\register.php');
}
function get_register_validation()
{
    require('MVC\view\register_validation.php');
}
function get_tournamentsList()
{
    $tournamentsList = get_tournamentsAll();
    require('MVC\view\tournamentsList.php');
}
function get_matchTest()
{
    require('MVC\view\matchTest.php');
}
//-------------------------------------------------------- others ----------------------------------------------------------------------
function register()
{
    require_once('MVC/model/model.php');

    $username = $_POST['username'];
    $sexe = $_POST['sexe'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $result = insert_user($username, $sexe, $email, $password);

    if ($result == true) {
        get_register_validation();
    } else {
        $registerError = "Erreur lors de l'inscription";
        get_register();
    }
}
function login()
{
    $usernameOrEmail = $_POST['usernameOrEmail'];
    $password = $_POST['password'];

    $usernameOrEmail = filter_var($usernameOrEmail, FILTER_SANITIZE_STRING);

    $user = get_userByNameOrMail($usernameOrEmail);

    if ($user) {
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id_user'];
            echo 'Welcome ' . $user['username'] . ' !<br>';
            return true;
        } else {
            $loginError = "Incorrect password";
            get_login();
            return false;
        }
    } else {
        $loginError = "User not found";
        get_login();
        return false;
    }
}

function logout()
{
    session_destroy();
    echo 'You have been disconnected';
}

function start_match($j1, $j2) {
    if (!isset($_SESSION['user_id'])) {
    }
    else {
        $j1 = $_SESSION['user_id'];
    }
	$pdo = dbconnect();
	$request = $pdo->prepare('
		INSERT INTO duel(id_j1, id_j2, date) 
		VALUES(:id_joueur1, :id_joueur2, NOW());
		');
	$result = $request->execute(array('id_joueur1' => $j1, 'id_joueur2' => $j2));
	$j1_data = get_userByID($j1);
    foreach ($j1_data as $key => $value) {
        echo $key . ' : ' . $value . '<br>';
    }
    $j2_data = get_userByID($j2);
    foreach ($j2_data as $key => $value) {
        echo $key . ' : ' . $value . '<br>';
    }

    if (isset($_SESSION['user_id'])) {
        if ($j1 == $_SESSION['user_id']) {
            echo 'You are player 1';
        } else if ($j2 == $_SESSION['user_id']) {
            echo 'You are player 2';
        } else {
            echo 'You are not in this match';
        }
    }
    else {
        echo 'You are not connected <br>';
    
    }
	return $result;
}

?>
<!--
function ListPilote()
{
    $pilote_result = GetPilote();
    require('View/DisplayPilotes.php');
}

function ListVuevolFab($Fabricant)
{
     $volbyFab_result = getVolbyFabricant($Fabricant);
    require('View/DisplayVolByFab.php');
} -->