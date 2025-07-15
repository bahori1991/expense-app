import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/server/client";

export default function ExpensesPage() {
  return (
    <div className="p-2 m-auto max-w-md">
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <Suspense fallback={<SkeletonRows />}>
          <ExpensesRows />
        </Suspense>
      </Table>
    </div>
  );
}

async function ExpensesRows() {
  const res = await api.expenses.$get();

  if (!res.ok) {
    return <div className="text-red-500">Something went wrong</div>;
  }

  const { expenses } = await res.json();

  return (
    <TableBody>
      {expenses.map((expense) => (
        <TableRow key={expense.id}>
          <TableCell>{expense.id}</TableCell>
          <TableCell>{expense.title}</TableCell>
          <TableCell>{expense.amount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

function SkeletonRows() {
  return (
    <TableBody>
      {[1, 2, 3].map((i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
