<?php
$loginError = "";

if (isset($_POST['submit'])) {
    login();
} 
else {
    ?>
    <form method="POST">
        
        <label for="usernameOrEmail">Username or Email adress:</label><br>
        <input type="text" name="usernameOrEmail" required>
        <p></p>
        
        <label for="password">Password :</label><br>
        <input type="password" name="password" required>
        <p></p>

        <input type="submit" name="submit" value="Login">
        <?php echo "<br>",$loginError,"<p></p>" ?>
    </form>
    <?php
}
?>