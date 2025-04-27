// users テーブルの型
export interface User {
  id: number;
  category_order: string | null; // JSON型はstringとして扱う
}

// categories テーブルの型
export interface Category {
  id: number;
  user_id: string;
  name: string;
  color: string; // VARCHAR(9)はstringとして扱う
}

// stats テーブルの型
export interface Stat {
  id: number;
  user_id: string;
  category_id: number;
  year_month: string; // DATE型はstringとして扱う
  amount: number;
}

// expenses テーブルの型
export interface Expense {
  id: number;
  user_id: string;
  amount: number;
  category_id: string;
  created_at: string; // DATETIME型はstringとして扱う
  date: string; // DATE型はstringとして扱う
  memo: string;

  category: string;
}
