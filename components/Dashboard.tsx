"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BudgetChart } from "@/components/BudgetChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { BudgetStats } from "@/components/BudgetStats";
import { Target } from "lucide-react";
import BalanceCard from "./BalanceCard";
import { useEffect, useState } from "react";
import {
  getExpensesOnly,
  getSavingsTotals,
  getTotalBalance,
} from "@/utilities/utilityFuncs";
import SpendingCard from "./SpendingCard";
import SavingsCard from "./SavingsCard";

export type Transaction = {
  Amount: number;
  Vendor: string;
  PurchaseDate: number;
  PurchaseType: string;
};

export function Dashboard() {
  const [balance, setBalance] = useState<Transaction[]>([]);

  const balanceTotals = getTotalBalance(balance);

  const expenseTotals = getExpensesOnly(balance);

  const savingsTotals = getSavingsTotals(balance);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await fetch("/api/transactions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setBalance(result);

        console.log(result);
      } catch (error) {
        return { error: `${error}` };
      }
    };

    getBalance();
    console.log(balance);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-500/10">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BalanceCard total={balanceTotals} />
          <SpendingCard total={expenseTotals} />

          <SavingsCard total={savingsTotals} />
        </div>

        {/* Charts and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Budget Breakdown Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-serif">
                Budget Breakdown
              </CardTitle>
              <CardDescription>
                Your spending categories for this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetChart />
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-serif">
                Recent Transactions
              </CardTitle>
              <CardDescription>Your latest financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </div>

        {/* Budget Statistics */}
        <BudgetStats />
      </main>
    </div>
  );
}
