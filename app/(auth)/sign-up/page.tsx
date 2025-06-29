"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { signupAction } from "@/app/(auth)/sign-up/action";
import { signupSchema } from "@/server/auth/schema";

export default function SignupPage() {
  const [lastResult, action, isPending] = useActionState(signupAction, null);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: signupSchema,
      });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Signup</h1>
      <form
        {...getFormProps(form)}
        action={action}
        className="flex flex-col mt-4 gap-4 w-full max-w-md"
      >
        <input
          {...getInputProps(fields.name, {
            type: "text",
          })}
          placeholder="Name"
          className="p-2 rounded-md border border-gray-300"
        />
        {fields.name.errors && <p className="text-red-500">{fields.name.errors.join(", ")}</p>}
        <input
          {...getInputProps(fields.email, {
            type: "email",
          })}
          placeholder="Email"
          className="p-2 rounded-md border border-gray-300"
        />
        {fields.email.errors && <p className="text-red-500">{fields.email.errors.join(", ")}</p>}
        <input
          {...getInputProps(fields.password, {
            type: "password",
          })}
          placeholder="Password"
          className="p-2 rounded-md border border-gray-300"
        />
        {fields.password.errors && (
          <p className="text-red-500">{fields.password.errors.join(", ")}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          {isPending ? "..." : "Signup"}
        </button>
        {form.errors && <p className="text-red-500">{form.errors.join(", ")}</p>}
      </form>
    </div>
  );
}
