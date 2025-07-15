import { api } from "@/server/client";

export default async function ProfilePage() {
  const res = await api.user.$get();

  if (!res.ok) {
    return <div>Unauthorized</div>;
  }

  const { user } = await res.json();

  return (
    <div>
      <h1>Profile</h1>
      <p>{user?.email}</p>
      <p>{user?.name}</p>
    </div>
  );
}
