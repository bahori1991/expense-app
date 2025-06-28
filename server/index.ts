import { Hono } from "hono";
import { hc } from "hono/client";
import { env } from "@/lib/env";
import { authRoutes } from "@/server/routes/auth";
import { userRoutes } from "@/server/routes/user";

const app = new Hono()
  .basePath("/api")
  .route("/auth", authRoutes)
  .route("/user", userRoutes);

export const honoClient = hc<AppType>(env.NEXT_PUBLIC_API_URL);
export type AppType = typeof app;
export default app;
