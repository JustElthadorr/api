<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
  http_response_code(200);
  exit;
}

require("./apifunctions.php");

if(! isset($_GET['cmd'])) {
  http_response_code(404);
  die();
}

$cmd = strtolower($_GET['cmd']);

switch($cmd) {
  case 'all':
    sendAllTasks();
    break;

  case "one":
    sendOneTask();
    break;

  case "add":
    addTask();
    break;

  case "delete":
    deleteTask();
    break;

  case 'update':
    updateCompletionStatus();
    break;

  default:
    http_response_code(400);
    die();
}