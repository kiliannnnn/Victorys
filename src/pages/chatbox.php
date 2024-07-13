<?php
require_once '..\src\database\DAO\User.php';
session_start();
$userdao = new UserDAO();

if (isset($_SESSION['user_id'])) {
    $user = $userdao->getUserById($_SESSION['user_id']);
    $friends = $userdao->getFriends($_SESSION['user_id']);
} else {
    header('Location: /login');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Victorys - Chatbox</title>
    <link rel="stylesheet" type="text/css" href="/styles/tailwind.css">
    <link rel="stylesheet" type="text/css" href="/styles/style.css">
</head>

<body>
    <?php include 'C:\wamp64\www\victorys\src\components\header.php'; ?>
    <div class="flex h-screen">
        <aside class="w-full md:w-1/4 p-4 bg-zinc-200 dark:bg-zinc-800 h-full overflow-y-auto flex-shrink-0">
            <h2 class="text-lg font-bold mb-3 text-zinc-700 dark:text-white">Friends:</h2>
            <ul class="overflow-y-auto" id="friendList">
                <?php foreach ($friends as $friend) { ?>
                    <li>
                        <button
                            class="flex items-center w-full p-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition duration-300 overflow-hidden"
                            onclick="loadMessages(<?= $_SESSION['user_id'] ?>, <?= $friend->getId() ?>)">
                            <img class="w-8 h-8 mr-2 rounded-full" src="https://placehold.co/40" alt="User Avatar" />
                            <span class="font-medium text-zinc-700 dark:text-white"><?= $friend->getUsername() ?></span>
                        </button>
                    </li>
                <?php } ?>
                <li class="flex items-center pt-4">
                    <form id="addFriendForm">
                        <label for="friendUsername"></label>
                        <input class="flex-grow p-2 border rounded-lg dark:border-zinc-700 dark:bg-zinc-850" type="text"
                            id="friendUsername" placeholder="Username" required>
                        <button type="submit"
                            class="px-4 py-2 bg-blue-500 text-white font-bold dark:bg-blue-600 rounded-lg ml-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Add
                            Friend
                        </button>
                    </form>
                </li>
            </ul>
        </aside>
        <main class="flex-grow p-4 overflow-y-auto flex-1 bg-white dark:bg-zinc-700 flex flex-col">
            <div class="space-y-4 flex-grow" id="messageContainer">
                <div class="p-2 bg-zinc-200 dark:bg-zinc-800 rounded-b-lg min-w-32 sender">
                    <p class="text-sm text-zinc-700 dark:text-white">message</p>
                    <small class="text-xs text-zinc-500 dark:text-zinc-400">Bob - 4:01 PM</small>
                </div>
            </div>

            <div class="flex mt-auto py-2">
                <input type="text" id="messageInput" placeholder="Type a message..."
                    class="flex-grow p-2 border rounded-lg dark:border-zinc-700 dark:bg-zinc-850" />
                <button id="messageSend"
                    class="px-4 py-2 bg-blue-500 text-white font-bold dark:bg-blue-600 rounded-lg ml-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Send
                </button>
            </div>
        </main>
    </div>
    <?php include 'C:\wamp64\www\victorys\src\components\footer.php'; ?>
    <script>
        document.getElementById('messageSend').addEventListener('click', function () {
            const messageInput = document.getElementById('messageInput');
            const messageText = messageInput.value.trim();

            if (messageText) {
                const now = new Date();
                const hours = now.getHours();
                const minutes = now.getMinutes();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const formattedTime = `${hours % 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

                const messageContainer = document.createElement('div');
                messageContainer.classList.add('p-2', 'bg-zinc-200', 'dark:bg-zinc-800', 'rounded-b-lg');

                const messageTextElement = document.createElement('p');
                messageTextElement.classList.add('text-sm', 'text-zinc-700', 'dark:text-white');
                messageTextElement.textContent = messageText;

                const messageTimeElement = document.createElement('small');
                messageTimeElement.classList.add('text-xs', 'text-zinc-500', 'dark:text-zinc-400');
                messageTimeElement.textContent = `Bob - ${formattedTime}`;

                messageContainer.appendChild(messageTextElement);
                messageContainer.appendChild(messageTimeElement);

                document.getElementById('messageContainer').appendChild(messageContainer);

                messageInput.value = '';
                messageInput.focus();
            }
        });
    </script>
    <!-- <script>
        document.getElementById('addFriendForm').addEventListener('submit', function (event) {
            event.preventDefault();
            let friendUsername = document.getElementById('friendUsername').value;
            fetch('addFriend.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ friendUsername: friendUsername })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Friend added successfully!');
                    } else {
                        alert('Error adding friend: ' + data.message);
                    }
                });
        });
    </script> -->
    <script src="/js/bundle.js"></script>
</body>

</html>