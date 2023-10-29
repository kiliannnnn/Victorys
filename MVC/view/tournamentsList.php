<?php
if (isset($tournamentsList)) {
    foreach ($tournamentsList as $tournament) {
        echo "<button onclick='openNewWindow()'>", $tournament[0],"</button><br>";
    }
}
?>

<script>
    function openNewWindow() {
        window.open('MVC/view/tournamentsDetails.php', 'New Page', 'width=640, height=640');
    }
</script>