import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { auth } from "@/server/auth";

async function logoutAction() {
  "use server";
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}

export default async function Home() {
  const { user } = await getServerSession();

  if (!user) {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You are not authorized to access this page</p>
        <Link href="/login">Login</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome, {user?.name}</p>
      <form action={logoutAction}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
