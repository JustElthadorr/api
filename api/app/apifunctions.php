<?php 

@include_once('Database.php');

/**
*   getAllTodos
*   ----------------
*   CMD = all
*   @return void
*/

function getAllTodos() {
  $sql = 'SELECT * FROM `todo`';
  Database::query($sql);
  $rows = Database::getAll();

  header('Content-Type: application/json');
  echo json_encode($rows);
}

/**
*    getTodo
*    -----------
*    CMD = one
*    @param string $todo
*    
*    @return void
*/

function getTodo($todo) {
  $sql = 'SELECT * FROM `todo` WHERE `abbr`=:abbr';
  Database::query($sql, [':abbr' => strtoupper($todo)]);

  $row = Database::get();

  header('Content-Type: application.json');
  echo json_encode($row);
}

?>