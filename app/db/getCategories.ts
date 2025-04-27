import { getDatabase } from "./init";
import type { Category } from "./types";

export const getCategories = async () => {
  const db = await getDatabase();
  // categoriesテーブルからusersのcategory_order順にカテゴリを取得
  const categories = db.exec({
    sql: `
      SELECT categories.* FROM categories
      INNER JOIN users ON categories.user_id = users.id
      INNER JOIN json_each(users.category_order) ON categories.id = json_each.value
      WHERE users.id = ?
      ORDER BY json_each.key
    `,
    bind: [1],
    returnValue: "resultRows",
    rowMode: "object",
  }) as unknown as Category[];

  return categories;
}
