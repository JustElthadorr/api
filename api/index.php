<?php 

@include_once('app/HttpStatus.php');
@include_once('app/ErrorHandler.php');

$cmd = '';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  header('Content-Type: application.json');
  header('HTTP/1.1 200 OK');
  echo json_encode($_POST);
  die();
}

if( ! isset($_GET['cmd'])) {
  $cmd = 'all';
} else {
  $cmd = strtolower($_GET['cmd']);
}

switch($cmd) {
  case 'all':
    getAllTodos();
    break;

  case 'one':
    if( ! isset($_GET['todo'])) {
      HttpStatus::http_return(400, 'Not enough information in the request.');
    }
  
    getTodo($_GET['todo']);
    break;

  default:
    HttpStatus::http_return(404, 'Unknown Request.');
}

?>