import { getDatabase } from "./init";
import type { Stat } from "./types";

export const getStats = async () => {
  const db = await getDatabase();
  // categoriesテーブルからusersのcategory_order順にカテゴリを取得
  const stats = db.exec({
    sql: `
      SELECT * FROM stats
      WHERE user_id = ?
      ORDER BY year_month DESC
      LIMIT 12
    `,
    bind: [1],
    returnValue: "resultRows",
    rowMode: "object",
  }) as unknown as Stat[];

  return stats;
}
