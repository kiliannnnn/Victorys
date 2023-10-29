<br><button onclick="askPHP()">Lancer un match de test</button><br>

<script>
    function askPHP() {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
            }
        };
        xmlhttp.open("GET", "?register_for_match", true);
        xmlhttp.send();
    }
</script>

<?php

function register_for_match()
{
    echo "You have been registered for the match. Waiting for another player...";
}

?>