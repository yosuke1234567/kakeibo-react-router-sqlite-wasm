import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/new", "routes/new.tsx"),
  route("/stats", "routes/stats.tsx"),
  route("/config", "routes/config.tsx"),
] satisfies RouteConfig;
