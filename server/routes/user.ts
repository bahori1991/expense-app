import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { auth } from "@/server/auth";

type Env = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

const authMiddleware = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);

  return next();
});

export const userRoutes = new Hono<Env>().get("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const session = c.get("session");

  return c.json({ user, session });
});
