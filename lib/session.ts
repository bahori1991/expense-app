import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/server/auth";

export const getServerSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return { user: session?.user, session: session?.session };
});
