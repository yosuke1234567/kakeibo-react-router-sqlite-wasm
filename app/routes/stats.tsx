import type { Route } from "./+types/stats";
import { getStats } from "~/db/getStats";

export async function clientLoader() {
  const stats = await getStats();
  return stats;
}

export default function Stats({ loaderData }: Route.ComponentProps) {
  const stats = loaderData;

  const getDate = (year_month: string) => {
    const d = new Date(year_month);
    return `${d.getFullYear()}年${d.getMonth() + 1}月`;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">統計</h1>
      <ul className="space-y-4">
        {stats.map((stat) => (
          <li
            key={stat.id}
            className="p-4 bg-gray-50/5 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">
                {getDate(stat.year_month)}
              </p>
              <p className="text-sm text-gray-300">支出: &yen; {stat.amount.toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
