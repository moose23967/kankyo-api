CREATE TABLE IF NOT EXISTS "items" (
	"identifier" serial PRIMARY KEY NOT NULL,
	"user_identifier" integer NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"identifier" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "items" ADD CONSTRAINT "items_user_identifier_users_identifier_fk" FOREIGN KEY ("user_identifier") REFERENCES "public"."users"("identifier") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
