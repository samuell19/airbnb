CREATE TABLE `stays` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`location` text NOT NULL,
	`image` text NOT NULL,
	`price` real,
	`dates` text NOT NULL,
	`note` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`id` text PRIMARY KEY NOT NULL,
	`stay_id` text NOT NULL,
	`person` integer NOT NULL,
	`rating` integer NOT NULL
);
