import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [

];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="bg-teal-950/20 min-h-screen">
          <div className="p-4 max-w-md mx-auto">
            {children}
            <nav className="fixed bottom-0 flex gap-4 align-center justify-center p-4">
              <NavLink to="/" end className={({isActive}) => (isActive ? 'text-teal-300' : '') + " p-2 rounded-lg"}>
                ホーム
              </NavLink>
              <NavLink to="/new" className={({isActive}) => (isActive ? 'text-teal-300' : '') + " p-2 rounded-lg"}>
                新規作成
              </NavLink>
              <NavLink to="/stats" className={({isActive}) => (isActive ? 'text-teal-300' : '') + " p-2 rounded-lg"}>
                統計
              </NavLink>
              <NavLink to="/config" className={({isActive}) => (isActive ? 'text-teal-300' : '') + " p-2 rounded-lg"}>
                設定
              </NavLink>
            </nav>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="fixed inset-0 py-16 px-4 flex flex-col items-center justify-center bg-[#0004]">
      <div className="max-w-full bg-white p-4 rounded-lg shadow-md">
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
