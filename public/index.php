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

// Create a Request object from the current HTTP request
$request = Request::createFromGlobals();

// Set up the routing configuration
$fileLocator = new FileLocator([__DIR__ . '/../config']);
$loader = new YamlFileLoader($fileLocator);
$routes = $loader->load('routes.yaml');

// Set up the context, matcher, and request stack
$context = new RequestContext();
$context->fromRequest($request);
$matcher = new UrlMatcher($routes, $context);

// Create a RequestStack and push the current request
$requestStack = new RequestStack();
$requestStack->push($request);

// Set up the router listener with the correct arguments
$dispatcher = new EventDispatcher();
$dispatcher->addSubscriber(new RouterListener($matcher, $requestStack, $context));

// Set up the controller and argument resolvers
$controllerResolver = new ControllerResolver();
$argumentResolver = new ArgumentResolver();

// Create the kernel and handle the request
$kernel = new HttpKernel($dispatcher, $controllerResolver, $requestStack, $argumentResolver);
$response = $kernel->handle($request);

// Send the response
$response->send();
$kernel->terminate($request, $response);

?>