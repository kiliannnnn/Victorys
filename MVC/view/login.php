<?php
$loginError = "";

echo '--------------------------- login -----------------------------<br>';
if (isset($_SESSION['user_id'])) {
    if (isset($_POST['submit_logout'])) {
        logout();
    }
    else {
        echo 'You are already connected';
        ?>
        <form method="POST">
            <input type="submit" name="submit_logout" value="Logout">
        </form>
        <?php
    }
}
else {
    if (isset($_POST['submit_login'])) {
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
    
            <input type="submit" name="submit_login" value="Login">
            <?php echo "<br>",$loginError,"<p></p>" ?>
        </form>
        <?php
    }
}
?>