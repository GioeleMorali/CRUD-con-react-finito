<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/AlunniController.php';

$app = AppFactory::create();

$app->get('/alunni', 'AlunniController:index');

$app->get('/alunni/{id}', "AlunniController:getAlunno");
$app->post('/alunni', "AlunniController:postAlunni");
$app->put('/alunni/{id}', "AlunniController:putAlunno");
$app->delete('/alunni/{id}', "AlunniController:deleteAlunno");
$app->run();
