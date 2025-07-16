import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/server/client";

async function TotalSpent() {
  const res = await api.user.$get();

  if (!res.ok) {
    return <div>Something went wrong</div>;
  }

  const { user } = await res.json();

  return <div>{user?.name}</div>;
}

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <TotalSpent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
