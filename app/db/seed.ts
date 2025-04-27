export const seed = `
-- users テーブルに1件追加
INSERT INTO "users" ("category_order")
VALUES ('[1,2,3,4,5,6,7]');

-- categories テーブルに2件追加
INSERT INTO "categories" ("user_id", "name", "color")
VALUES 
  (1, '食費', '#f46a9b'),
  (1, '日用品', '#ea5545'),
  (1, '交際費', '#ef9b20'),
  (1, '交通費', '#edbf33'),
  (1, '衣服', '#ede15b'),
  (1, '水道光熱費', '#bdcf32'),
  (1, 'その他', '#87bc45');

-- stats テーブルに2件追加（カテゴリーと月ごとの金額記録）
INSERT INTO "stats" ("user_id", "category_id", "year_month", "amount")
VALUES 
  (1, 1, '2025-01-01', 12000),
  (1, 2, '2025-02-01', 3000);

-- expenses テーブルに2件追加（支出記録）
INSERT INTO "expenses" ("user_id", "amount", "category_id", "created_at", "date", "memo")
VALUES
  (1, 800, 1, CURRENT_TIMESTAMP, '2024-12-15', 'Lunch at cafe'),
  (1, 500, 3, CURRENT_TIMESTAMP, '2024-12-15', 'Bus fare');
`
