"use server";

import { parseWithZod } from "@conform-to/zod";
import { APIError } from "better-auth/api";
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

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return submission.reply({
        formErrors: [`Failed to sign up : ${error.body?.message ?? "Something went wrong"}`],
      });
    }

    return submission.reply({
      formErrors: ["Failed to sign up : Something went wrong"],
    });
  }

  redirect("/");
}
