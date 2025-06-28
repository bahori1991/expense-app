import { Hono } from "hono";
import { hc } from "hono/client";
import { headers } from "next/headers";
import { cache } from "react";
import { env } from "@/lib/env";
import { authRoutes } from "@/server/routes/auth";
import { userRoutes } from "@/server/routes/user";

const app = new Hono()
  .basePath("/api")
  .route("/auth", authRoutes)
  .route("/user", userRoutes);

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
