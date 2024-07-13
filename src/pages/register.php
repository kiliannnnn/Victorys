<?php
require_once '..\src\database\DAO\User.php';
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Victorys - Register</title>
    <link rel="stylesheet" type="text/css" href="/styles/tailwind.css">
</head>

<body>
    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = trim($_POST['username']);
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);
        $userDao = new UserDAO();

        if (!empty($username) && !empty($email) && !empty($password)) {
            if ($userDao->getUserByUsernameOrEmail($username, $email) != null) {
                $message = "Username or email already exists.";
            } else {
                $passwordHash = password_hash($password, PASSWORD_DEFAULT);
                if ($userDao->createUser($username, $email, $passwordHash)) {
                    $message = "Registration successful!";
                    header('Location: /login');
                    exit();
                } else {
                    $message = "Error during registration.";
                }
            }
        } else {
            $message = "All fields are required.";
        }
    }
    ?>
    <div class="min-h-screen bg-zinc-100 dark:bg-zinc-850 flex items-center justify-center">
        <?php
        if (!isset($_SESSION['user_id'])) {
            ?>
            <div class="w-full max-w-md p-6 bg-white dark:bg-zinc-700 dark:text-white shadow-md rounded-lg">
                <h1 class="text-3xl font-bold mb-4 text-center dark:text-white">Register</h1>
                <form class="space-y-4" action="register" method="post">
                    <div>
                        <label for="username"
                            class="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Username</label>
                        <input type="text" id="username" name="username"
                            class="mt-1 block w-full p-2 rounded-md shadow-sm border border-zinc-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-900 dark:border-zinc-700"
                            placeholder="username" />
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Email</label>
                        <input type="email" id="email" name="email"
                            class="mt-1 block w-full p-2 rounded-md shadow-sm border border-zinc-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-900 dark:border-zinc-700"
                            placeholder="you@example.com" />
                    </div>
                    <div>
                        <label for="password"
                            class="block text-sm font-medium text-zinc-700 dark:text-zinc-200">Password</label>
                        <input type="password" id="password" name="password"
                            class="mt-1 block w-full p-2 rounded-md shadow-sm border border-zinc-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-900 dark:border-zinc-700"
                            placeholder="**********" />
                    </div>
                    <div>
                        <button type="submit"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700">
                            Register
                        </button>
                    </div>
                    <div class="text-center mt-4 flex justify-between">
                        <a href="/login" class="underline text-sm dark:text-zinc-200"> Already have an account ?</a>
                    </div>
                </form>
                <?php if (isset($message))
                    echo "<p>$message</p>";
                ?>
            </div>
            <?php
        } else {
            ?>
            <div
                class="w-full max-w-md p-6 bg-white dark:bg-zinc-700 dark:text-white shadow-md rounded-lg flex flex-col items-center">
                <h1 class="text-3xl font-bold mb-4 text-center dark:text-white">You are logged in.</h1>
                <a href="/"
                    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Go
                    back home</a>
            </div>
            <?php
        }
        ?>
    </div>
    <script>
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
</body>

</html>