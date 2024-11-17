import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();

app.use("*", logger());

app.route("/api/expenses", expensesRoute);

export default app;
