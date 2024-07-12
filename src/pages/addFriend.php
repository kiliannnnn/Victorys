<?php
include '../database/DAO/User.php';
session_start();

$data = json_decode(file_get_contents('php://input'), true);
$friendUsername = $data['friendUsername'];

$user_id = $_SESSION['user_id'];

$sql = "SELECT user_id FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $friendUsername);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $friend = $result->fetch_assoc();
    $friend_id = $friend['user_id'];

    $sql = "INSERT INTO friends (user_id, friend_id) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $user_id, $friend_id);
    $stmt->execute();
    
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'User not found']);
}
?>
