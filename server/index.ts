import { Hono } from "hono";
import { cors } from "hono/cors";
import { authRoutes } from "@/server/routes/auth";
import { expensesRoute } from "@/server/routes/expenses";
import { userRoutes } from "@/server/routes/user";

const app = new Hono()
  .basePath("/api")
  .use("*", cors())
  .onError((err, c) => {
    console.error(err);
    return c.json({ error: "Internal Server Error" }, 500);
  })
  .route("/auth", authRoutes)
  .route("/user", userRoutes)
  .route("/expenses", expensesRoute);

export type AppType = typeof app;
export default app;
