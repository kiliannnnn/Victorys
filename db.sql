CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `phone` CHAR(10) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `token` DECIMAL(17, 5) DEFAULT 0,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
);

CREATE TABLE `duels` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `tournament_id` INT,
  `player1_id` INT NOT NULL,
  `player2_id` INT NOT NULL,
  `winner_id` INT,
  `status` ENUM('pending', 'in progress', 'completed', 'cancelled') NOT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`tournament_id`) REFERENCES `tournaments`(`id`),
  FOREIGN KEY (`player1_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`player2_id`) REFERENCES `users`(`id`),
  INDEX `idx_player1_id` (`player1_id`),
  INDEX `idx_player2_id` (`player2_id`),
  INDEX `idx_winner_id` (`winner_id`)
);

CREATE TABLE `friends` (
  `user_id` INT,
  `friend_id` INT,
  PRIMARY KEY (`user_id`, `friend_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`friend_id`) REFERENCES `users`(`id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_friend_id` (`friend_id`)
);

CREATE TABLE `tournaments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL
);
