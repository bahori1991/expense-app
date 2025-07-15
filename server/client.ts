import { hc } from "hono/client";
import { env } from "@/lib/env";
import type { AppType } from "@/server";

const client = hc<AppType>(env.BETTER_AUTH_URL);

export const api = client.api;
