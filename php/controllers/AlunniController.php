<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function index(Request $request, Response $response, $args){
    sleep(2);
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results, JSON_NUMERIC_CHECK));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }
  public function getAlunno(Request $request, Response $response, $args){
    $id = $args['id'];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni WHERE id = $id");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }
  public function postAlunni(Request $request, Response $response, $args){
    $dati = json_decode($request->getBody()->getContents(), true);
    $nome = $dati["nome"];
    $cognome = $dati["cognome"];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("INSERT INTO alunni (nome, cognome) VALUES ('$nome', '$cognome')");
    $result2 = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result2->fetch_all(MYSQLI_ASSOC);


    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }
  public function putAlunno(Request $request, Response $response, $args){
    sleep(2);
    $dati = json_decode($request->getBody()->getContents(), true);
    $id = $args['id'];
    $nome = $dati["nome"];
    $cognome = $dati["cognome"];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("UPDATE alunni SET nome='$nome', cognome='$cognome' WHERE id= '$id'");
    $result2 = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result2->fetch_all(MYSQLI_ASSOC);


    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }
  public function deleteAlunno(Request $request, Response $response, $args){
    sleep(2);
    $dati = json_decode($request->getBody()->getContents(), true);
    $id = $args['id'];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("DELETE FROM alunni WHERE id=$id");
    $result2 = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result2->fetch_all(MYSQLI_ASSOC);


    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }
}