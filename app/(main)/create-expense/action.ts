"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { api } from "@/server/client";
import { createPostSchema } from "@/server/routes/expenses";

export async function createExpenseAction(_prev: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: createPostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { title, amount } = submission.value;

  try {
    const res = await api.expenses.$post({
      json: {
        title,
        amount,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return submission.reply({
        formErrors: [`Failed to create expense: ${errorText}`],
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return submission.reply({
        formErrors: [`Something went wrong: ${error.message}`],
      });
    }
    return submission.reply({
      formErrors: ["Something went wrong"],
    });
  }
  redirect("/expenses");
}
