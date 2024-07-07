<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ErrorController
{
    /**
     * @Route("/404", name="app_404")
     */
    public function show(): Response
    {
        return new Response('<h1>Page not found</h1>', 404);
    }
}
