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
// import { BudgetStats } from "@/components/BudgetStats";
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
import { Suspense, useEffect } from "react";
import ManageBudgets from "./ManageBudgets";
import { useAuth } from "@clerk/nextjs";

export function Dashboard() {
  const { getToken } = useAuth();
  useEffect(() => {
    const displaytoken = async () => {
      const token = await getToken();
      console.log(token);
    };

    displaytoken();
  });

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
      // console.log(url);

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    },
  });

  const recentTransactions = data ? data.slice(0, 5) : [];
  // console.log(recentTransactions);

  const chartData = data ? convertToChart(data) : [];

  const balanceTotals = data ? getTotalBalance(data) : "0.00";

  const expenseTotals = data ? getExpensesOnly(data) : "0.00";

  const savingsTotals = data ? getSavingsTotals(data) : "0.00";

  if (error) {
    return (
      <div className="min-h-screen dark:bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ">
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
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen  dark:bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Header */}

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 space-y-8 antialiased">
          <div className="flex justify-center sm:justify-start items-center gap-3">
            <span className="text-sm font-medium text-slate-300 tracking-wide">
              Transactions TimeFrame:
            </span>
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
          <ManageBudgets />

          {/* Charts and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Budget Breakdown Chart */}
            <Card className="border border-white/5 bg-gradient-to-br from-slate-800/40 via-slate-800/30 to-slate-900/40    ">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  Budget Breakdown
                </CardTitle>
                <CardDescription className="text-sm text-slate-400 mt-1.5">
                  {/* Your spending categories for this month */}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetChart dataArray={chartData} />
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="border border-white/5 bg-gradient-to-br from-slate-800/40 via-slate-800/30 to-slate-900/40  ">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <CardHeader className="pb-2 sm:pb-3 sm:pt-3 ">
                  <CardTitle className="text-2xl font-semibold tracking-tight">
                    Recent Transactions
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-400 mt-1.5">
                    Your latest financial activity
                  </CardDescription>
                </CardHeader>
                <div className="flex justify-center sm:justify-center px-6 sm:px-0">
                  {recentTransactions.length > 0 ? (
                    <Button
                      className="w-full sm:max-w-52 cursor-pointer dark:bg-richBlack hover:bg-mikadoYellow dark:hover:bg-mikadoYellow dark:hover:text-yaleBlue dark:border-mikadoYellow bg-yaleBlue text-white text-sm font-medium tracking-wide"
                      variant="outline"
                      asChild
                    >
                      <Link
                        href={`/transactions${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
                      >
                        View All Transactions
                      </Link>
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <CardContent>
                <RecentTransactions
                  TransactionData={recentTransactions}
                  isPending={isPending}
                />
              </CardContent>
            </Card>
          </div>

          {/* Budget Statistics */}
          {/* <BudgetStats /> */}
        </main>
      </div>
    </Suspense>
  );
}
