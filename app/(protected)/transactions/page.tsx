"use client";
import AllTransactions from "@/components/AllTransactions";
import TransactionCards from "@/components/TransactionCards";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MonthSelect from "@/components/MonthSelect";

const page = () => {
  return (
    <>
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Button className="cursor-pointer " variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex">
          <span>Transaction TimeFrame: </span>
          <MonthSelect />
        </div>
        <TransactionCards />
        <AllTransactions />
      </main>
    </>
  );
};

export default page;
