<?php
class Database {
  // Database credentials
  private static $dbHost = '127.0.0.1';
  private static $dbName = 'todo';
  private static $dbUser = 'root';
  private static $dbPass = 'root';
  
  // Properties to register connection and statements - PDO
  private static $dbConnection = null;
  private static $dbStatement = null;


  /**
    * connect
    * -------
    * True if connection has been made otherwise false
    * @return boolean  
    */

    private static function connect(): bool {
    try {
        self::$dbConnection = new PDO (
            'mysql:host=' . self::$dbHost . ';dbname=' . self::$dbName,
            self::$dbUser,
            self::$dbPass
        );
    } catch (PDOException $error) {
        echo "Database Connection Error: " . $error->getMessage() . PHP_EOL;
        return false;
    }
    return true;
}


  /**
    * query
    * -----
    * User can send sql query to server
    * @param string $sql
    * @param array $args
    *
    * True if there were no errors otherwise false
    * @return boolean
    */

  public static function query(string $sql, array $args = []): bool {
    // Connect to DB
    if (is_null(self::$dbConnection))
      if (!self::connect())
        return false;

      // If no sql argument no need to proceed
      if (!empty($sql)) {
        try {
          self::$dbStatement = self::$dbConnection->prepare($sql);
          self::$dbStatement->execute($args);
        } catch (PDOException $error) {
            return false;
          }
      } else {
          return false;
      }

    return true;
  }


  /**
    * get
    * ---
    * After successful run from sql query retrieve a record
    * @return array
    */

  public static function get(): array {
    $result = [];

    if (!is_null(self::$dbStatement)) {
      try {
        $result = self::$dbStatement->fetchAll(PDO::FETCH_ASSOC);
        if ($result === false) {
          $errorInfo = self::$dbStatement->errorInfo();
          echo "Database Error: " . $errorInfo[2] . PHP_EOL;
        }
      } catch (PDOException $error) {
        // Handle the error, log it, etc.
        return [];
      }
    }

    return $result;
  }


  /**
    * getAll
    * ------
    * One or more records retrieved
    * @return array
    */

  public static function getAll(): array
  {
    $result = [];
    // If no statement no need to retrieve data from DB
    if (!is_null(self::$dbStatement)) {
      $result = self::$dbStatement->fetchAll(PDO::FETCH_ASSOC);
      if (!$result)
        $result = [];
      }
    return $result;
  }

  public static function getLastInsertId(): int {
    return self::$dbConnection->lastInsertId();
  }
}
