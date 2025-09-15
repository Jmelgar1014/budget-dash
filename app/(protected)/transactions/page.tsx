"use client";
import AllTransactions from "@/components/AllTransactions";
import TransactionCards from "@/components/TransactionCards";
import React from "react";
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

const Page = () => {
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
        console.log(result);
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

  if (data) {
    if (data.length === 0) {
      return (
        <>
          <main className="container mx-auto px-4 py-8 space-y-8">
            <h1 className="font-semibold">
              There are no transactions for the current month
            </h1>
          </main>
        </>
      );
    }
  }

  return (
    <>
      <main className="container mx-auto px-4 py-8 space-y-8">
        {isPending ? (
          <>
            <Skeleton className="h-9 w-32" />
          </>
        ) : (
          <>
            <Button className="cursor-pointer " variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft />
                Back to Dashboard
              </Link>
            </Button>
          </>
        )}
        <div className="flex justify-between">
          <div className="flex">
            {isPending ? (
              <>
                <Skeleton className="h-9 w-36 mr-4" />
                <Skeleton className="h-9 w-32" />
              </>
            ) : (
              <>
                <span className="px-3 py-2">Transaction TimeFrame: </span>
                <MonthSelect />
              </>
            )}
          </div>
          <div>
            {isPending ? (
              <>
                <Skeleton className="h-9 w-32" />
              </>
            ) : (
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => exportData()}
              >
                Export Transactions
              </Button>
            )}
          </div>
        </div>
        <TransactionCards />
        <AllTransactions />
      </main>
    </>
  );
};

export default Page;
