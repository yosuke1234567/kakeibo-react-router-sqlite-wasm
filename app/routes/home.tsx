import { getDatabase } from "~/db/init";
import type { Route } from "./+types/home";
import { seed } from "~/db/seed";
import type { Category, Expense } from "~/db/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  const db = await getDatabase();
  console.log(db);
  return db;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const db = loaderData
  const expenses = db.exec({
    sql: `
      SELECT expenses.*, categories.name AS category FROM expenses
      INNER JOIN categories ON expenses.category_id = categories.id
      WHERE expenses.user_id = ?
      ORDER BY date
      DESC LIMIT 5
    `,
    bind: [1],
    returnValue: "resultRows",
    rowMode: "object",
  }) as unknown as Expense[];
  if(!expenses.length) {
    const value = db.exec({
      sql: seed,
      returnValue: "resultRows",
    });
    console.log(value);
  }
  console.dir(expenses);
  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">最新の支出</h1>
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="p-4 bg-gray-50/5 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{expense.category}</p>
                <p className="text-sm text-gray-300">{expense.date}</p>
                <p className="text-sm text-gray-300">{expense.memo}</p>
              </div>
              <p className="text-lg font-bold text-teal-200">
                &yen; {expense.amount.toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
