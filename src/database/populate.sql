USE victorys;

INSERT INTO `users` (`username`, `password`, `email`, `phone`, `country`, `token`) VALUES
('user1', 'user1', 'user1@gmail.com', '1234567890', 'USA', 100.0),
('user2', 'user2', 'user2@gmail.com', '0987654321', 'Canada', 150.0),
('user3', 'user3', 'user3@gmail.com', '1122334455', 'UK', 200.0),
('user4', 'user4', 'user4@gmail.com', '6677889900', 'Australia', 250.0),
('user5', 'user5', 'user5@gmail.com', '5566778899', 'India', 300.0);

INSERT INTO `friends` (`user_id`, `friend_id`) VALUES
(1, 2),
(1, 3),
(2, 3),
(2, 4),
(3, 5),
(4, 5);

INSERT INTO `tournaments` (`name`) VALUES
('The Grand Melee'),
('Summer Showdown'),
('Autumn Open');

INSERT INTO `duels` (`tournament_id`, `player1_id`, `player2_id`, `winner_id`, `status`) VALUES
(1, 1, 2, 1, 'completed'),
(2, 3, 4, 3, 'pending'),
(3, 5, 6, 5, 'in progress');