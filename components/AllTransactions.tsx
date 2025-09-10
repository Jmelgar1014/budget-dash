"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Car, Home, Utensils, Zap, Circle, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DetailedTransaction } from "@/schema/TransactionSchema";
import { useSearchParams } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryIcons: Record<string, any> = {
  Food: Utensils,
  Transportation: Car,
  Utilities: Zap,
  Salary: Home,
  "Fixed Expsense": Home,
  Misc: ShoppingBag,
};

const AllTransactions = () => {
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

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    },
  });
  const results = data ? data : [];
  console.log(results);

  if (error) {
    return (
      <>
        <div>There was an error. Please try again</div>
      </>
    );
  }

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg border bg-card/50 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-lg" />
              <div>
                <div className="w-24 h-4 bg-gray-200 rounded mb-2" />
                <div className="w-16 h-3 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="w-20 h-4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {results.map((transaction: DetailedTransaction) => {
          const millisecondsToDate = new Date(
            transaction.PurchaseDate
          ).toLocaleDateString("en-US");
          const Icon = categoryIcons[transaction.Category] || Circle;
          return (
            <div
              key={transaction._id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: "" }}>
                  <Icon className="h-4 w-4" style={{ color: "black" }} />
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.Vendor}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.Category}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-semibold">
                      {millisecondsToDate}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`font-semibold ${
                  transaction.PurchaseType === "Income" ||
                  transaction.PurchaseType === "Savings"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.PurchaseType === "Expense" ? "-" : "+"}$
                {transaction.Amount.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllTransactions;
