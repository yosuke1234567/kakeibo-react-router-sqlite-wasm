export const schema = `
PRAGMA foreign_keys = ON;

BEGIN;

-- users テーブル
CREATE TABLE IF NOT EXISTS "users" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "category_order" JSON
);

-- categories テーブル
CREATE TABLE IF NOT EXISTS "categories" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "user_id" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "color" VARCHAR(9) NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "users"("id")
);
CREATE INDEX IF NOT EXISTS "idx_categories_user_id" ON "categories"("user_id");

-- stats テーブル
CREATE TABLE IF NOT EXISTS "stats" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "user_id" INTEGER NOT NULL,
  "category_id" INTEGER NOT NULL,
  "year_month" DATE NOT NULL,
  "amount" INTEGER NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "users"("id"),
  FOREIGN KEY ("category_id") REFERENCES "categories"("id")
);
CREATE INDEX IF NOT EXISTS "idx_stats_user_id" ON "stats"("user_id");

-- expenses テーブル
CREATE TABLE IF NOT EXISTS "expenses" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "user_id" INTEGER NOT NULL,
  "amount" INTEGER NOT NULL,
  "category_id" INTEGER NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "date" DATE NOT NULL,
  "memo" TEXT NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "users"("id"),
  FOREIGN KEY ("category_id") REFERENCES "categories"("id")
);
CREATE INDEX IF NOT EXISTS "idx_expenses_user_id" ON "expenses"("user_id");

COMMIT;
`
