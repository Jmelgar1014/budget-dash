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
import { Button } from "./ui/button";
import Link from "next/link";
import MonthSelect from "./MonthSelect";
import { useSearchParams } from "next/navigation";

export function Dashboard() {
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
      console.log(url);

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    },
  });

  const recentTransactions = data ? data.slice(0, 5) : [];
  console.log(recentTransactions);

  const chartData = data ? convertToChart(data) : [];

  const balanceTotals = data ? getTotalBalance(data) : "0.00";

  const expenseTotals = data ? getExpensesOnly(data) : "0.00";

  const savingsTotals = data ? getSavingsTotals(data) : "0.00";

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-500/10 ">
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-500/10 ">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8 ">
        <div className="flex">
          <span className="p-2 mx-2">Transactions TimeFrame: </span>
          <MonthSelect />
        </div>

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
          <Card className="border-0 shadow-lg ">
            <CardHeader>
              <CardTitle className="text-xl font-serif ">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <CardHeader className="pb-2 sm:pb-3 sm:pt-3 ">
                <CardTitle className="text-xl font-serif">
                  Recent Transactions
                </CardTitle>
                <CardDescription>
                  Your latest financial activity
                </CardDescription>
              </CardHeader>
              <div className="flex justify-center sm:justify-center px-6 sm:px-0">
                <Button
                  className="w-full sm:max-w-52 cursor-pointer"
                  variant="outline"
                >
                  <Link href={`/transactions${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}>View All Transactions</Link>
                </Button>
              </div>
            </div>
            <CardContent>
              <RecentTransactions TransactionData={recentTransactions} />
            </CardContent>
          </Card>
        </div>

        {/* Budget Statistics */}
        {/* <BudgetStats /> */}
      </main>
    </div>
  );
}
