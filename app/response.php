<?php
function response($payload, $statis_code = 200) {
  http_response_code($statis_code);
  header('Content-Type: application/json');
  echo json_encode($payload);
}
