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
import BalanceCard from "./BalanceCard";
import {
  convertToChart,
  getExpensesOnly,
  getSavingsTotals,
  getTotalBalance,
} from "@/utilities/utilityFuncs";
import SpendingCard from "./SpendingCard";
import SavingsCard from "./SavingsCard";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "./CardSkeleton";

export function Dashboard() {
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

  const chartData = data ? convertToChart(data) : [];

  const balanceTotals = data ? getTotalBalance(data) : "0.00";

  const expenseTotals = data ? getExpensesOnly(data) : "0.00";

  const savingsTotals = data ? getSavingsTotals(data) : "0.00";

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-500/10">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-500">Failed to load transactions</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-500/10">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
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

        {/* Charts and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Budget Breakdown Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-serif">
                Budget Breakdown
              </CardTitle>
              <CardDescription>
                {/* Your spending categories for this month */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetChart dataArray={chartData} />
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
