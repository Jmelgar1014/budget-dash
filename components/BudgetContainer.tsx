"use client";
import React, { useState } from "react";
import { Plus, Target } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import BudgetForm from "./FormComponents/BudgetForm";
import BudgetCard from "./budgetComponents/BudgetCard";
import { getBudgetType } from "@/schema/budgetSchema";
import { DetailedTransaction } from "@/schema/TransactionSchema";
const BudgetContainer = () => {
  const [budgetModal, setBudgetModal] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const transactionQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const url = "/api/transactions";
      //   const url = searchParams.toString()
      //     ? `/api/transactions?${searchParams.toString()}`
      //     : "/api/transactions";
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
  const budgetQuery = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const response = await fetch("/api/budgets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      return result;
    },
  });

  const transactionList: DetailedTransaction[] = transactionQuery.data
    ? transactionQuery.data
    : [];

  const categorySpendingAmount = transactionList.reduce(
    (acc, transaction) => {
      if (transaction.PurchaseType === "Expense") {
        acc[transaction.Category] =
          (acc[transaction.Category] || 0) + transaction.Amount;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  if (budgetQuery.error) {
    console.log(budgetQuery.error);
    return <div>There is an error</div>;
  }

  if (budgetQuery.isPending) {
    return <div>Loading</div>;
  }

  const handleBudget = () => {
    setBudgetModal(true);
  };
  if (budgetQuery.data.data.length > 0) {
    return (
      <>
        <Button
          onClick={() => handleBudget()}
          className="mt-4 cursor-pointer"
          variant="outline"
        >
          <Plus />
          Add Budget
        </Button>
        {budgetModal && <BudgetForm onClose={() => setBudgetModal(false)} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {budgetQuery.data.data.map((item: getBudgetType) => {
            return (
              <div key={item._id}>
                <BudgetCard
                  budgetCategory={item.Category}
                  spentAmount={categorySpendingAmount[item.Category] || 0}
                  budgetName={item.BudgetName}
                  budgetAmount={item.Amount}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  }
  console.log(budgetQuery.data);
  return (
    <>
      <div className="flex justify-center">
        <div className="container rounded-lg shadow-md sm:max-w-[500px]">
          <div className="flex flex-col items-center px-6 py-18">
            <Target size={48} />
            <p className="text-lg font-semibold m-2">No budgets yet</p>
            <p className=" text-center m-2">
              Create your first budget to start tracking your spending goals and
              take control of your finances.
            </p>
            <Button
              onClick={() => handleBudget()}
              className="mt-4 cursor-pointer"
              variant="outline"
            >
              <Plus />
              Add Budget
            </Button>
          </div>
        </div>
      </div>
      {budgetModal && <BudgetForm onClose={() => setBudgetModal(false)} />}
    </>
  );
};

export default BudgetContainer;
