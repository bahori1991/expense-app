"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { loginSchema } from "@/server/auth/schema";

export async function loginAction(_prev: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password } = submission.value;

  const res = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true,
  });

  if (!res.ok) {
    return submission.reply({
      formErrors: ["Failed to login"],
    });
  }

  redirect("/");
}
