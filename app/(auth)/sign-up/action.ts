"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { signupSchema } from "@/server/auth/schema";

export async function signupAction(_prev: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signupSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name, email, password } = submission.value;

  const res = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
    asResponse: true,
  });

  if (!res.ok) {
    return submission.reply({
      formErrors: ["Failed to sign up"],
    });
  }

  redirect("/");
}
