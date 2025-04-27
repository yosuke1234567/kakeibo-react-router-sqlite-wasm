import { Form } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/config";
import { getDatabase } from "~/db/init";
import { getCategories } from "~/db/getCategories";

export async function clientLoader() {
  const categories = await getCategories();
  return categories;
}

// export async function clientAction({ request }: Route.ClientActionArgs) {
//   const formData = await request.formData();

// }

export default function New({ loaderData }: Route.ComponentProps) {
  const categories = loaderData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">設定</h1>
      <h2>カテゴリ</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="p-4 bg-gray-50/5 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div style={{ background: category.color }} className="w-4 h-4 rounded-sm"></div>
            <div>{category.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
