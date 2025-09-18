"use client";
import AllTransactions from "@/components/AllTransactions";
import TransactionCards from "@/components/TransactionCards";
import React, { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MonthSelect from "@/components/MonthSelect";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { exportTable } from "@/schema/ExportSchema";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionPageSkeleton from "@/components/TransactionPageSkeleton";

const TransactionsPageContent = () => {
  const searchParams = useSearchParams();
  const { isPending, data, error } = useQuery({
    queryKey: ["transactions", searchParams.toString()],
    queryFn: async () => {
      const url = searchParams.toString()
        ? `/api/transactions?${searchParams.toString()}`
        : "/api/transactions";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    },
  });
  const exportData = () => {
    if (data) {
      const parsedData = z.array(exportTable).safeParse(data);
      if (!parsedData.success) {
        console.log("there is an error");
      } else {
        const result = parsedData.data.map((transaction) => ({
          ...transaction,
          PurchaseDate: new Date(transaction.PurchaseDate),
        }));
        // console.log(result);
        const csv = Papa.unparse(result);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        saveAs(
          blob,
          `transactions-${new Date().toISOString().split("T")[0]}.csv`
        );
      }
    }
  };
  if (error) {
    return (
      <>
        <div>
          <h1>There is an error. Please try again later </h1>
        </div>
      </>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <Button className="cursor-pointer " variant="ghost" asChild>
        <Link href="/">
          <ArrowLeft />
          Back to Dashboard
        </Link>
      </Button>

      <div className="flex justify-between">
        <div className="flex">
          <span className="px-3 py-2">Transaction TimeFrame: </span>
          <MonthSelect />
        </div>
        <div>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => exportData()}
          >
            Export Transactions
          </Button>
        </div>
      </div>
      <TransactionCards />
      <AllTransactions />
    </main>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<TransactionPageSkeleton />}>
      <TransactionsPageContent />
    </Suspense>
  );
};

export default Page;
