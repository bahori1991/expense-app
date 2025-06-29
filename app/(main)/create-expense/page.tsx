"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { createExpenseAction } from "@/app/(main)/create-expense/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPostSchema } from "@/server/routes/expenses";

export default function CreateExpensePage() {
  const [lastResult, action, isPending] = useActionState(createExpenseAction, null);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createPostSchema,
      });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <div className="p-2 m-auto max-w-md">
      <h1 className="text-2xl font-bold mb-4">Create Expense</h1>
      <form {...getFormProps(form)} action={action} className="flex flex-col gap-2">
        <Label htmlFor={fields.title.id}>Title</Label>
        <Input {...getInputProps(fields.title, { type: "text" })} />
        {fields.title.errors && <p className="text-red-500">{fields.title.errors.join(", ")}</p>}
        <Label htmlFor={fields.amount.id}>Amount</Label>
        <Input {...getInputProps(fields.amount, { type: "number" })} />
        {fields.amount.errors && <p className="text-red-500">{fields.amount.errors.join(", ")}</p>}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Expense"}
        </Button>
        {form.errors && <p className="text-red-500">{form.errors.join(", ")}</p>}
      </form>
    </div>
  );
}
