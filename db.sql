CREATE DATABASE IF NOT EXISTS victorys;
USE victorys;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL,
  #`password` VARCHAR(60) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` CHAR(10) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `token` DECIMAL(17, 5) DEFAULT 0,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `duels`;
CREATE TABLE `duels` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `tournament_id` INT,
  `player1_id` INT NOT NULL,
  `player2_id` INT NOT NULL,
  `winner_id` INT,
  `status` ENUM('pending', 'in progress', 'completed', 'cancelled') NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`tournament_id`) REFERENCES `tournaments`( `id`),
  FOREIGN KEY (`player1_id`) REFERENCES `users`( `id`),
  FOREIGN KEY (`player2_id`) REFERENCES `users`( `id`)
);

DROP TABLE IF EXISTS `friends`;
CREATE TABLE `friends` (
    `user_id` INT,
    `friend_id` INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS `tournaments`;
CREATE TABLE `tournaments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL
);