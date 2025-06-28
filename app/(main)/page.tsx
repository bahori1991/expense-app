import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { honoClient } from "@/server";
import { auth } from "@/server/auth";

async function logoutAction() {
  "use server";
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}

export default async function Home() {
  const { api } = await honoClient();
  const res = await api.user.$get();

  if (!res.ok) {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You are not authorized to access this page</p>
        <Link href="/login">Login</Link>
      </div>
    );
  }

  const { user } = await res.json();

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome, {user ? user.name : "Guest"}</p>
      <form action={logoutAction}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
