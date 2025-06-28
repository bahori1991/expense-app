import { Hono } from "hono";
import { hc } from "hono/client";
import { cors } from "hono/cors";
import { headers } from "next/headers";
import { cache } from "react";
import { env } from "@/lib/env";
import { authRoutes } from "@/server/routes/auth";
import { userRoutes } from "@/server/routes/user";

const app = new Hono()
  .basePath("/api")
  .use("*", cors())
  .route("/auth", authRoutes)
  .route("/user", userRoutes)
  .onError((err, c) => {
    console.error(err);
    return c.json({ error: "Internal Server Error" }, 500);
  });

export const honoClient = cache(async () => {
  const headerList = await headers();
  return {
    api: hc<typeof app>(env.NEXT_PUBLIC_API_URL, {
      init: {
        headers: headerList,
      },
    }).api,
  };
});

export default app;
