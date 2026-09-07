CREATE TABLE `city_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`username_key` text NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`salt` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `city_accounts_username_unique` ON `city_accounts` (`username_key`);--> statement-breakpoint
CREATE TABLE `city_rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 1 NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `city_rate_limits_expiry_idx` ON `city_rate_limits` (`expires_at`);--> statement-breakpoint
CREATE TABLE `city_saves` (
	`account_id` text PRIMARY KEY NOT NULL,
	`state` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `city_accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `city_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `city_accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `city_sessions_account_idx` ON `city_sessions` (`account_id`);--> statement-breakpoint
CREATE INDEX `city_sessions_expiry_idx` ON `city_sessions` (`expires_at`);