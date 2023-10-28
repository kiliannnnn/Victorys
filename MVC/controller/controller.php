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
function get_register_validation() {
    require('MVC\view\register_validation.php');
}
function get_tournamentsList() {
    $tournamentsList = get_tournamentsAll();
    require('MVC\view\tournamentsList.php');
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
    }
    else {
        $registerError = "Erreur lors de l'inscription";
        get_register();
    }
}
function login() {
    $usernameOrEmail = $_POST['usernameOrEmail'];
    $password = $_POST['password'];

    $usernameOrEmail = filter_var($usernameOrEmail, FILTER_SANITIZE_STRING);

	$user = get_userByNameOrMail($usernameOrEmail);

	if ($user) {
        if (password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['id_user'];
			echo 'Welcome ' . $user['username'] . ' !';
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