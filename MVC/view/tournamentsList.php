<?php
if (isset($tournamentsList)) {
    foreach ($tournamentsList as $tournament) {
        echo $tournament['id_tournament'], '<br>';
    }
}
?>