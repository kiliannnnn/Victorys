<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

class DefaultController
{
    public function html(): Response
    {
        $content = file_get_contents(__DIR__ . '/../pages/*.html');
        return new Response($content);
    }
    public function php(): Response
    {
        ob_start();
        include __DIR__ . '/../pages/*.php';
        $content = ob_get_clean();
        return new Response($content);
    }

    public function home(): Response
    {
        ob_start();
        include __DIR__ . '/../pages/home.php';
        $content = ob_get_clean();
        return new Response($content);
    }
    public function login(): Response
    {
        ob_start();
        include __DIR__ . '/../pages/login.php';
        $content = ob_get_clean();
        return new Response($content);
    }

    public function register(): Response
    {
        ob_start();
        include __DIR__ . '/../pages/register.php';
        $content = ob_get_clean();
        return new Response($content);
    }
}