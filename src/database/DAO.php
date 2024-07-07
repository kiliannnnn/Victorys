<?php
class DAO {
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "victorys";
    protected $connection;

    public function __construct() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }

    public function prepare($query) {
        return $this->connection->prepare($query);
    }

    public function __destruct() {
        $this->connection->close();
    }
}
?>
