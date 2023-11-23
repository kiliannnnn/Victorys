<?php
require('MVC/controller/controller.php');
session_start();

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Victorys</title>
    <link rel="stylesheet" href="node_modules\normalize.css\normalize.css">
    <link rel="stylesheet" href="styles\style.css">
</head>

<body>
    <?php get_header();?>
    <?php get_matchTest();?>
    <?php get_tournamentsList();?>
    <?php get_register();?>
    <?php get_login();?>
    <?php get_footer();?>
</body>

</html>







<!-- if (isset($_GET['action'])) {
    /*echo "action demandée = " . $_GET['action'];*/
    if ($_GET['action'] == 'VolByFab') {
         if (isset($_POST['fabricants'])) {
            /*echo "envoie ListVuevolFab avec  " . $_POST['fabricants'];*/
             ListVuevolFab($_POST['fabricants']);
         }
    }
    else if ($_GET['action'] == 'ListePilote') {
        ListPilote();
    }
} else {
    require('Menuprincipal.php');
} -->