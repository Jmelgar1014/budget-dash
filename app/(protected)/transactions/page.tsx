"use client";
import AllTransactions from "@/components/AllTransactions";
import TransactionCards from "@/components/TransactionCards";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MonthSelect from "@/components/MonthSelect";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Papa from "papaparse";
import { DetailedTransaction } from "@/schema/TransactionSchema";
import { saveAs } from "file-saver";
import { exportTable } from "@/schema/ExportSchema";
import { z } from "zod";

const Page = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const transactions = queryClient.getQueryData([
    "transactions",
    searchParams.toString(),
  ]) as DetailedTransaction[] | undefined;

  const exportData = () => {
    if (transactions) {
      const parsedData = z.array(exportTable).safeParse(transactions);
      if (!parsedData.success) {
        console.log("there is an error");
      } else {
        const csv = Papa.unparse(parsedData.data);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        saveAs(
          blob,
          `transactions-${new Date().toISOString().split("T")[0]}.csv`
        );
      }
    }
  };

  return (
    <>
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
    </>
  );
};

export default Page;
