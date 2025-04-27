import { Form, useNavigate } from "react-router";
import { useTransition } from "react";
import type { Route } from "./+types/new";
import { getDatabase } from "~/db/init";
import { getCategories } from "~/db/getCategories";

export async function clientLoader() {
  const categories = await getCategories();
  return categories;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const newExpense = {
    amount: parseInt(formData.get("amount") as string, 10),
    category_id: formData.get("category_id") as string,
    date: formData.get("date") as string,
    memo: formData.get("memo") as string,
  };

  // データベースに新しいExpenseを挿入する処理
  const db = await getDatabase();
  db.exec({
    sql: `
      INSERT INTO expenses (user_id, amount, category_id, date, memo)
      VALUES (?, ?, ?, ?, ?)
    `,
    bind: [
      1,
      newExpense.amount,
      newExpense.category_id,
      newExpense.date,
      newExpense.memo,
    ],
  });

  return { success: true };
}

export default function New({ loaderData, actionData }: Route.ComponentProps) {
  const categories = loaderData;
  const { success } = actionData || {};
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">新しい支出を追加</h1>
      <Form
        method="post"
        onSubmit={() => startTransition(() => {})}
        onReset={() => navigate('./')}
        ref={form => {
          if (success) {
            form?.reset();
          }
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="amount" className="block text-sm">
            金額
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            required
          />
        </div>
        <div>
          <label htmlFor="category_id" className="block text-sm">
            カテゴリ
          </label>
          <select
            id="category_id"
            name="category_id"
            required
          >
            <option value="">選択してください</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm">
            日付
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
          />
        </div>
        <div>
          <label htmlFor="memo" className="block text-sm">
            メモ
          </label>
          <textarea
            id="memo"
            name="memo"
            rows={3}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button disabled={isPending}>
            {/* {isPending ? "送信中..." : "追加"} */}
            追加
          </button>
        </div>
      </Form>
    </div>
  );
}
