USE victorys;

INSERT INTO `users` (`username`, `password`, `email`, `phone`, `country`, `token`) VALUES
('user1', '$2y$10$T4pHk7oYiQ8A2jW/5K.Hu9vRaD.lJ6QkQKLNbV9MfXDsO', 'user1@example.com', '1234567890', 'USA', 100.0),
('user2', '$2y$10$TZoYiQ8A2jW/5K.Hu9vRaD.lJ6QkQKLNbV9MfXDsO', 'user2@example.com', '0987654321', 'Canada', 150.0),
('user3', '$2y$12$YourHashedPasswordHere', 'user3@example.com', '3024896754', 'Greece', 200.0),
('user4', '$2y$12$AnotherHashedPasswordHere', 'user4@example.com', '198284365', 'Brazil', 225.0),
('user5', '$2y$12$YetAnotherHashedPasswordHere', 'user5@example.com', '4477123456', 'Japan', 300.0);

INSERT INTO `tournaments` (`name`) VALUES
('The Grand Melee'),
('Summer Showdown'),
('Autumn Open');

INSERT INTO `duels` (`tournament_id`, `player1_id`, `player2_id`, `winner_id`, `status`) VALUES
(1, 1, 2, 1, 'completed'),
(2, 3, 4, 3, 'pending'),
(3, 5, 6, 5, 'in progress');