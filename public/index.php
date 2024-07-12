<?php
require dirname(__DIR__).'/vendor/autoload.php';

use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\Routing\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\HttpKernel\Controller\ControllerResolver;
use Symfony\Component\HttpKernel\Controller\ArgumentResolver;
use Symfony\Component\HttpKernel\HttpKernel;
use Symfony\Component\HttpKernel\EventListener\RouterListener;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Routing\Loader\YamlFileLoader;

$request = Request::createFromGlobals();

$fileLocator = new FileLocator([__DIR__ . '/../config']);
$loader = new YamlFileLoader($fileLocator);
$routes = $loader->load('routes.yaml');

$context = new RequestContext();
$context->fromRequest($request);
$matcher = new UrlMatcher($routes, $context);

$requestStack = new RequestStack();
$requestStack->push($request);

$dispatcher = new EventDispatcher();
$dispatcher->addSubscriber(new RouterListener($matcher, $requestStack, $context));

$controllerResolver = new ControllerResolver();
$argumentResolver = new ArgumentResolver();

$kernel = new HttpKernel($dispatcher, $controllerResolver, $requestStack, $argumentResolver);
$response = $kernel->handle($request);

$response->send();
$kernel->terminate($request, $response);

?>

<script src="bundle.js"></script>