<!-- <script>
    function askPHP() {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
            }
        };
        xmlhttp.open("GET", "action=?register_for_match", true);
        xmlhttp.send();
    }
</script> -->

<?php
echo '--------------------------- match test -----------------------------<br>';

if (isset($_POST['submit_duel'])) {
    start_match(1,2);
} 
else {
    ?>
    <form method="POST">
        <input type="submit" name="submit_duel" value="Lancer un match">
    </form>
    <?php
}

?>