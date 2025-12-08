"use client";
import AllTransactions from "@/components/AllTransactions";
import TransactionCards from "@/components/TransactionCards";
import React, { Suspense, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MonthSelect from "@/components/MonthSelect";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { exportTable } from "@/schema/ExportSchema";
import { z } from "zod";
import TransactionPageSkeleton from "@/components/TransactionPageSkeleton";
import RecurringTransactionForm from "@/components/FormComponents/RecurringTransactionForm";

const TransactionsPageContent = () => {
  const [recurringModal, setRecurringModal] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const { data, error } = useQuery({
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
      <Button
        className="cursor-pointer dark:bg-richBlack hover:bg-mikadoYellow dark:hover:bg-mikadoYellow dark:hover:text-yaleBlue bg-yaleBlue dark:border dark:border-mikadoYellow dark:text-white"
        // variant="ghost"
        asChild
      >
        <Link href="/">
          <ArrowLeft />
          Back to Dashboard
        </Link>
      </Button>

      <div className="flex flex-col items-center sm:justify-between  sm:flex-row">
        <div className="flex flex-col items-center sm:flex-row">
          <span className="px-3 py-2">Transaction TimeFrame: </span>
          <MonthSelect />
        </div>
        {data && data.length == 0 ? (
          ""
        ) : (
          <div className="mt-4 sm:mt-0 flex flex-col lg:flex-row justify-center ">
            <Button
              onClick={() => setRecurringModal(true)}
              variant="outline"
              className="m-2 cursor-pointer w-[180px]  dark:bg-richBlack hover:bg-mikadoYellow dark:hover:bg-mikadoYellow dark:hover:text-yaleBlue bg-yaleBlue dark:border dark:border-mikadoYellow dark:text-white text-white"
            >
              <Plus /> Recurring
            </Button>
            <Button
              className="m-2 cursor-pointer w-[180px] dark:bg-richBlack hover:bg-mikadoYellow dark:hover:bg-mikadoYellow dark:hover:text-yaleBlue bg-yaleBlue dark:border dark:border-mikadoYellow dark:text-white text-white"
              variant="outline"
              onClick={() => exportData()}
            >
              Export Transactions
            </Button>
          </div>
        )}
      </div>
      {recurringModal && (
        <RecurringTransactionForm onClose={() => setRecurringModal(false)} />
      )}
      <TransactionCards />
      {/* <TransactionSearch /> */}
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
