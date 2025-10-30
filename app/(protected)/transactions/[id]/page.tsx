"use client";
import SingleTransactionSkeleton from "@/components/skeletons/SingleTransactionSkeleton";
import TransactionDetailHeader from "@/components/TransactionDetail/TransactionDetailHeader";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  console.log(params);

  const transactionDetails = useQuery({
    queryKey: ["singleTransaction"],
    queryFn: async () => {
      const response = await fetch(`/api/transactions/${params.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      return data;
    },
  });

  if (transactionDetails.isLoading) {
    return <SingleTransactionSkeleton />;
  }

  return (
    <>
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Button
          className="cursor-pointer dark:bg-richBlack hover:bg-mikadoYellow dark:hover:bg-mikadoYellow dark:hover:text-yaleBlue bg-yaleBlue dark:border dark:border-mikadoYellow dark:text-white"
          // variant="ghost"
          asChild
        >
          <Link href="/transactions">
            <ArrowLeft />
            Back to Transactions
          </Link>
        </Button>
        <TransactionDetailHeader transaction={transactionDetails.data} />
      </main>
    </>
  );
};

export default Page;
