"use client";
import React, { useState, Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Home,
  Utensils,
  Zap,
  Circle,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DetailedTransaction } from "@/schema/TransactionSchema";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";
import DeleteConfirmation from "./DeleteConfirmation";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { useAuth } from "@clerk/nextjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryIcons: Record<string, any> = {
  Food: Utensils,
  Transportation: Car,
  Utilities: Zap,
  Salary: Home,
  "Fixed Expsense": Home,
  Misc: ShoppingBag,
};

const AllTransactionsContent = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const searchParams = useSearchParams();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const month = parseInt(searchParams.get("month") || currentMonth.toString());
  const year = parseInt(searchParams.get("year") || currentYear.toString());

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.transactionsFuncs.getTransactionsPaginated,
    userId ? { AuthId: userId, month: month, year: year } : "skip",
    { initialNumItems: 10 }
  );

  // const { isPending, data, error } = useQuery({
  //   queryKey: ["transactions", searchParams.toString()],
  //   queryFn: async () => {
  //     const url = searchParams.toString()
  //       ? `/api/transactions?${searchParams.toString()}`
  //       : "/api/transactions";
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error status: ${response.status}`);
  //     }

  //     const result = await response.json();

  //     return result;
  //   },
  // });
  // const results = data ? data : [];

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.json();

      // console.log(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
    toast.success("Transaction has been successfully deleted");
  };

  // if (error) {
  //   return (
  //     <>
  //       <div>There was an error. Please try again</div>
  //     </>
  //   );
  // }
  if (results) {
    if (!isLoading && results.length === 0) {
      return (
        <>
          <main className="container mx-auto px-4 py-8 space-y-8">
            <div className="dark:bg-gradient-to-br from-oxfordBlue to-yaleBlue h-96 flex justify-center items-center rounded-lg">
              <h1 className="font-semibold">
                There are no transactions for the current month
              </h1>
            </div>
          </main>
        </>
      );
    }
  }
  if (status === "LoadingFirstPage") {
    return (
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
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
      <div className="space-y-3 ">
        {results.map((transaction: DetailedTransaction) => {
          const millisecondsToDate = new Date(
            transaction.PurchaseDate
          ).toLocaleDateString("en-US");
          const Icon = categoryIcons[transaction.Category] || Circle;
          return (
            <div
              key={transaction._id}
              className="flex items-center justify-between p-3 rounded-lg border border-yaleBlue bg-card/50 dark:hover:bg-richBlack/80 transition-colors hover:shadow-md hover:bg-yaleBlue/35"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: "" }}>
                  <Icon
                    className="h-4 w-4 dark:text-mikadoYellow text-oxfordBlue"
                    // style={{ color: "#ffd60a" }}
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.Vendor}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="secondary"
                      className="text-xs dark:text-mikadoYellow text-yaleBlue"
                    >
                      {transaction.Category}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-semibold">
                      {millisecondsToDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div
                  className={`font-semibold flex items-center ${
                    transaction.PurchaseType === "Income" ||
                    transaction.PurchaseType === "Savings"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.PurchaseType === "Expense" ? "-" : "+"}$
                  {transaction.Amount.toFixed(2)}
                </div>
                <Button
                  className="m-2 cursor-pointer hover:bg-oxfordBlue group dark:hover:bg-oxfordBlue"
                  variant="ghost"
                  // onClick={() => handleDelete(transaction._id)}
                  onClick={() => {
                    setShowConfirm(true);
                    setTransactionId(transaction._id);
                  }}
                >
                  <Trash2 className="text-oxfordBlue group-hover:text-gold dark:text-gold group-dark:text-gold" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="">
        <Button
          className="float-end my-4 cursor-pointer dark:bg-richBlack hover:bg-mikadoYellow dark:hover:bg-mikadoYellow dark:hover:text-yaleBlue bg-yaleBlue dark:border dark:border-mikadoYellow dark:text-white text-white"
          onClick={() => loadMore(10)}
          disabled={status !== "CanLoadMore"}
        >
          Load More
        </Button>
      </div>
      {showConfirm && (
        <DeleteConfirmation
          showAlert={showConfirm}
          setAlert={() => setShowConfirm(false)}
          deleteTransaction={() => handleDelete(transactionId)}
        />
      )}
    </>
  );
};

const AllTransactions = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllTransactionsContent />
    </Suspense>
  );
};

export default AllTransactions;
