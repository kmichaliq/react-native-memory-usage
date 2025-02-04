CREATE TABLE `devices` (
	`uuid` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`attribute1` integer,
	`attribute2` integer,
	`attribute3` integer,
	`attribute4` integer,
	`attribute5` integer,
	`attribute6` integer,
	`attribute7` integer,
	`attribute8` integer,
	`attribute9` integer,
	`attribute10` integer,
	`attribute12` integer,
	`attribute13` integer,
	`attribute14` integer,
	`attribute15` integer,
	`attribute16` integer,
	`attribute17` integer,
	`attribute18` integer,
	`attribute19` integer,
	`attribute20` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
