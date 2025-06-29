import { hc } from "hono/client";
import { cache } from "react";
import { env } from "@/lib/env";
import type { AppType } from "@/server";

export const honoClient = cache(async (headers?: HeadersInit) => {
  if (headers) {
    return {
      api: hc<AppType>(env.NEXT_PUBLIC_API_URL, {
        init: {
          headers,
        },
      }).api,
    };
  } else {
    return {
      api: hc<AppType>(env.NEXT_PUBLIC_API_URL).api,
    };
  }
});
