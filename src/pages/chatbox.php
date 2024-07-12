<?php
require_once '..\src\database\DAO\User.php';
session_start();
$userdao = new UserDAO();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Victorys - Chatbox</title>
    <link rel="stylesheet" type="text/css" href="/styles/tailwind.css">
</head>

<body>
    <?php include 'C:\wamp64\www\victorys\src\components\header.php'; ?>
    <div class="flex h-screen">
        <aside class="w-full md:w-1/4 p-4 bg-zinc-200 dark:bg-zinc-800 h-full overflow-y-auto flex-shrink-0">
            <h2 class="text-lg font-bold mb-3 text-zinc-700 dark:text-white">Friends:</h2>
            <ul class="space-y-2 overflow-y-auto">
                <?php $friends = $userdao->getFriends($_SESSION['user_id']);
                foreach ($friends as $friend) { ?>
                    <li class="flex items-center">
                        <img class="w-8 h-8 mr-2 rounded-full" src="https://placehold.co/40" alt="User Avatar" />
                        <span class="font-medium text-zinc-700 dark:text-white"><?= $friend->getUsername() ?></span>
                    </li>
                <?php } ?>
                <li class="flex items-center">
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
        <main class="flex-grow p-4 overflow-y-auto flex-1 bg-white dark:bg-zinc-700">
            <div class="space-y-4 flex-grow max-h-5" id="messageContainer">
            </div>

            <div class="flex mt-auto py-4">
                <input type="text" id="messageInput" placeholder="Type a message..."
                    class="flex-grow p-2 border rounded-lg dark:border-zinc-700 dark:bg-zinc-850" />
                <button id="sendButton"
                    class="px-4 py-2 bg-blue-500 text-white font-bold dark:bg-blue-600 rounded-lg ml-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Send
                </button>
            </div>
        </main>
    </div>
    <?php include 'C:\wamp64\www\victorys\src\components\footer.php'; ?>
    <script>
        document.getElementById('sendButton').addEventListener('click', function () {
            // Get the message input
            const messageInput = document.getElementById('messageInput');
            const messageText = messageInput.value.trim();

            // Check if the message is not empty
            if (messageText) {
                // Get the current time
                const now = new Date();
                const hours = now.getHours();
                const minutes = now.getMinutes();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const formattedTime = `${hours % 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

                // Create the message element
                const messageContainer = document.createElement('div');
                messageContainer.classList.add('p-2', 'bg-zinc-200', 'dark:bg-zinc-800', 'rounded-b-lg');

                const messageTextElement = document.createElement('p');
                messageTextElement.classList.add('text-sm', 'text-zinc-700', 'dark:text-white');
                messageTextElement.textContent = messageText;

                const messageTimeElement = document.createElement('small');
                messageTimeElement.classList.add('text-xs', 'text-zinc-500', 'dark:text-zinc-400');
                messageTimeElement.textContent = `Bob - ${formattedTime}`;

                // Append the text and time elements to the message container
                messageContainer.appendChild(messageTextElement);
                messageContainer.appendChild(messageTimeElement);

                // Append the message container to the message list
                document.getElementById('messageContainer').appendChild(messageContainer);

                // Clear the message input
                messageInput.value = '';
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
</body>

</html>