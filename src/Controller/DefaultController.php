<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController
{
    // handle html
    // public function html(): Response
    // {
    //     $content = file_get_contents(__DIR__ . '/../pages/*.html');
    //     return new Response($content);
    // }
    // handle php
    // public function php(): Response
    // {
    //     ob_start();
    //     include __DIR__ . '/../pages/*.php';
    //     $content = ob_get_clean();
    //     return new Response($content);
    // }

    /**
     * @Route("/", name="home")
     */
    public function home(): Response
    {
        ob_start();
        include __DIR__ . '/../pages/home.php';
        $content = ob_get_clean();
        return new Response($content);
    }

    /**
     * @Route("/login", name="login")
     */
    public function login(): Response
    {
        ob_start();
        include __DIR__ . '/../pages/login.php';
        $content = ob_get_clean();
        return new Response($content);
    }

    /**
     * @Route("/register", name="register")
     */
    public function register(): Response
    {
        ob_start();
        include __DIR__ . '/../pages/register.php';
        $content = ob_get_clean();
        return new Response($content);
    }

    /**
     * @Route("/logout", name="logout")
     */
    public function logout(): Response
    {
        ob_start();
        include __DIR__ . '/../pages/logout.php';
        $content = ob_get_clean();
        return new Response($content);
    }
}