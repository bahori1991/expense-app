import { Hono } from "hono";
import { auth } from "@/server/auth";

export const authRoutes = new Hono().on(["POST", "GET", "PUT", "DELETE", "PATCH"], "/**", (c) => {
  return auth.handler(c.req.raw);
});
