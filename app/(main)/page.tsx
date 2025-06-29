import { headers } from "next/headers";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { honoClient } from "@/server/client";

async function TotalSpent() {
  const { api } = await honoClient(await headers());
  const res = await api.expenses["total-spent"].$get();

  if (!res.ok) {
    return <div className="text-red-500">Something went wrong</div>;
  }

  const { total } = await res.json();
  return <div>{total}</div>;
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
