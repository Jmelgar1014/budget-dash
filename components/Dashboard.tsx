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
import { TrendingUp, DollarSign, Target } from "lucide-react";
import BalanceCard from "./BalanceCard";
import { useEffect, useState } from "react";


type Transaction = {
    Amount: number;
    Vendor: string;
    PurchaseDate: number;
    PurchaseType: string;
  }

export function Dashboard() {
  const [balance, setBalance] = useState<Transaction[]>([])


  const totalBalance = balance.length>0 ?balance.reduce((total,current) => {return total + current.Amount},0) : 0


  useEffect(() => {
    const getBalance = async () => {
      try{
        const response = await fetch("/api/transactions",{
          method: "GET",
          headers:{
            "Content-Type": "application/json"
          }
        })

        const result = await response.json()
        setBalance(result)

        console.log( result)
      }catch(error){
        return {error: `${error}`}
      }
    }

    getBalance()
    console.log(balance)

  },[])
  

  const result = totalBalance.toString()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-500/10">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BalanceCard total={result}/>
          

          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Monthly Spending
              </CardTitle>
              <TrendingUp className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,247.80</div>
              <p className="text-xs opacity-80 mt-1">-8.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Savings Goal
              </CardTitle>
              <Target className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs opacity-80 mt-1">$7,800 of $10,000 goal</p>
            </CardContent>
          </Card>
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
