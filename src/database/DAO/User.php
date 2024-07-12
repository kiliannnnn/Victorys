<?php
require_once 'C:\wamp64\www\victorys\src\database\DAO.php';
class User extends DAO {
    private $id;
    private $username;
    private $email;
    private $password;
    private $phone;
    private $country;
    private $token;

    public function __construct($id, $username, $email, $password, $phone, $country, $token) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->phone = $phone;
        $this->country = $country;
        $this->token = $token;
    }

    public function getId() {
        return $this->id;
    }
    public function getUsername() {
        return $this->username;
    }
    public function getEmail() {
        return $this->email;
    }
    public function getPassword() {
        return $this->password;
    }
    public function getPhone() {
        return $this->phone;
    }
    public function getCountry() {
        return $this->country;
    }
    public function getToken() {
        return $this->token;
    }

    public function setId($id) {
        $this->id = $id;
    }
    public function setUsername($username) {
        $this->username = $username;
    }
    public function setEmail($email) {
        $this->email = $email;
    }
    public function setPassword($password) {
        $this->password = $password;
    }
    public function setPhone($phone) {
        $this->phone = $phone;
    }
    public function setCountry($country) {
        $this->country = $country;
    }
    public function setToken($token) {
        $this->token = $token;
    }

    public function save() {
        $stmt = $this->prepare("INSERT INTO users (username, email, password, phone, country, token) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $this->username, $this->email, $this->password, $this->phone, $this->country, $this->token);
        return $stmt->execute();
    }
    public function update() {
        $stmt = $this->prepare("UPDATE users SET username = ?, email = ?, password = ?, phone = ?, country = ?, token = ? WHERE id = ?");
        $stmt->bind_param("ssssssi", $this->username, $this->email, $this->password, $this->phone, $this->country, $this->token, $this->id);
        return $stmt->execute();
    }
}
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
    public function getFriends($user_id) {
        $stmt = $this->prepare("SELECT u.* FROM friends f JOIN users u ON f.friend_id = u.id WHERE f.user_id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $friends = array();
        while ($row = $result->fetch_assoc()) {
            $friend = new User($row['id'], $row['username'], $row['email'], $row['password'], $row['phone'], $row['country'], $row['token']);
            array_push($friends, $friend);
        }
        return $friends;
    }
    public function getLeaderboard() {
        $stmt = $this->prepare("SELECT * FROM users ORDER BY token DESC LIMIT 10");
        $stmt->execute();
        $result = $stmt->get_result();
        $users = array();
        while ($row = $result->fetch_assoc()) {
            $user = new User($row['id'], $row['username'], $row['email'], $row['password'], $row['phone'], $row['country'], $row['token']);
            array_push($users, $user);
        }
        return $users;
    }
}
?>