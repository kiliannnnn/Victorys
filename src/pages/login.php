<?php
require_once '..\src\database\DAO\User.php';
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Victorys - Login</title>
    <link rel="stylesheet" type="text/css" href="/styles/tailwind.css">
</head>

<body>
    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = trim($_POST['input']);
        $password = trim($_POST['password']);
        $userDao = new UserDAO();

        if (!empty($input) && !empty($password)) {
            $user = $userDao->getUserByUsernameOrEmail($input, $input);
            //connection avec les utilisateurs créés par populate.sql
            if (str_starts_with($input, "user")) {
                session_regenerate_id(true);
                $_SESSION['user_id'] = $user['id'];
                $message = "Login successful!";
            }
            if ($user && password_verify($password, $user['password'])) {
                session_regenerate_id(true);
                $_SESSION['user_id'] = $user['id'];
                $message = "Login successful!";
            } else {
                $message = "Invalid username or password.";
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
                <h1 class="text-3xl font-bold mb-4 text-center dark:text-white">Login</h1>
                <form class="flex flex-col space-y-4" action="login" method="post">
                    <input type="text" placeholder="Username or email" name="input"
                        class="mt-1 block w-full p-2 rounded-md shadow-sm border border-zinc-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-900 dark:border-zinc-700" />
                    <input type="password" placeholder="Password" name="password"
                        class="mt-1 block w-full p-2 rounded-md shadow-sm border border-zinc-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-900 dark:border-zinc-700" />
                    <button type="submit"
                        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none dark:bg-indigo-500">
                        Sign In
                    </button>
                </form>
                <?php if (isset($message))
                    echo "<p>$message</p>";
                ?>
                <div class="text-center mt-4">
                    <a href="#" class="underline text-sm dark:text-zinc-200">Forgot your password?</a>
                </div>
            </div>
            <?php
        } else {
            ?>
            <div class="w-full max-w-md p-6 bg-white dark:bg-zinc-700 dark:text-white shadow-md rounded-lg flex flex-col items-center">
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