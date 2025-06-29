import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { auth } from "@/server/auth";

type Env = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    c.set("user", session.user);
    return next();
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export const userRoutes = new Hono<Env>().get("/", getUser, async (c) => {
  const user = c.get("user");
  return c.json({ user });
});
