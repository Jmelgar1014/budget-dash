"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "./CardSkeleton";
import BalanceCard from "./BalanceCard";
import SavingsCard from "./SavingsCard";
import SpendingCard from "./SpendingCard";
import {
  getExpensesOnly,
  getSavingsTotals,
  getTotalBalance,
} from "@/utilities/utilityFuncs";

const TransactionCards = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await fetch("/api/transactions", {
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

  //   const recentTransactions = data ? data.slice(0, 5) : [];
  //   console.log(recentTransactions);

  //   const chartData = data ? convertToChart(data) : [];

  const balanceTotals = data ? getTotalBalance(data) : "0.00";

  const expenseTotals = data ? getExpensesOnly(data) : "0.00";

  const savingsTotals = data ? getSavingsTotals(data) : "0.00";

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isPending ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <BalanceCard total={balanceTotals} />
            <SpendingCard total={expenseTotals} />

            <SavingsCard total={savingsTotals} />
          </>
        )}
      </div>
    </>
  );
};

export default TransactionCards;
