import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function TotalSpent() {
  return (
    <div>
      <h1>Total Spent</h1>
    </div>
  );
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
