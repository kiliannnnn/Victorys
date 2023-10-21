<?php
$invalidUsername = "";
$invalidEmail = "";
$invalidPassword = "";
$registerError = "";

if (isset($_POST['submit'])) {
    register();
} 
else {
    ?>
    <form method="POST">
        
        <label for="username">Username :</label><br>
        <input type="text" name="username" required>
        <?php echo "<br>",$invalidUsername,"<p></p>" ?>

        <input type="radio" name="sexe" value="M">
        <label for="sexe">Homme</label><br>
        <input type="radio" name="sexe" value="F">
        <label for="sexe">Femme</label><br>
        <input type="radio" name="sexe" value="O" checked>
        <label for="sexe">Autre</label><br><br>
        
        <label for="email">Email :</label><br>
        <input type="email" name="email" required>
        <?php echo "<br>",$invalidEmail,"<p></p>" ?>
        
        <label for="password">Password :</label><br>
        <input type="password" name="password" required>
        <?php echo "<br>",$invalidPassword,"<p></p>" ?>

        <input type="submit" name="submit" value="Soumettre">
        <?php echo "<br>",$registerError,"<p></p>" ?>
    </form>
    <?php
}
?>