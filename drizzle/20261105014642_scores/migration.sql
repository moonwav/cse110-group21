CREATE TABLE `players` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE `scores` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`player_id` integer NOT NULL,
	`percent` real NOT NULL,
	`wrong_answers` integer NOT NULL,
	`hints_used` integer NOT NULL,
	CONSTRAINT `fk_scores_player_id_players_id_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`)
);
