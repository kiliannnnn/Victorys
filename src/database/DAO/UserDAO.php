<?php
require_once 'C:\wamp64\www\victorys\src\database\DAO.php';

class UserDAO extends DAO {

    public function createUser($username, $email, $passwordHash) {
        $stmt = $this->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $passwordHash);
        return $stmt->execute();
    }

    function getUserByUsernameOrEmail($username, $email) {   
        $stmt = $this->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            return $user;
        } else {
            return null;
        }
    }

    function getUserById($id) {
        $stmt = $this->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            return $user;
        } else {
            return null;
        }
    }
}
?>
