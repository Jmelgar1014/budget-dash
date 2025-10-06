"use client";
import React, { useState } from "react";
import { Plus, Target } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import BudgetForm from "./FormComponents/BudgetForm";
import BudgetCard from "./budgetComponents/BudgetCard";
import { getBudgetType } from "@/schema/budgetSchema";
import { DetailedTransaction } from "@/schema/TransactionSchema";
import { toast } from "sonner";
import DeleteConfirmation from "./DeleteConfirmation";
import EmptyBudgetCard from "./budgetComponents/EmptyBudgetCard";
const BudgetContainer = () => {
  const [budgetModal, setBudgetModal] = useState<boolean>(false);
  const [budgetId, setBudgetId] = useState<string>("");
  const [removeBudget, setDeleteBudget] = useState<boolean>(false);

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

  const deleteBudget = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/budgets/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  const handleDeleteBudget = (id: string) => {
    deleteBudget.mutate(id);
    toast.success("Budget has been successfully deleted");
  };

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
          className=" cursor-pointer float-right dark:bg-richBlack hover:bg-mikadoYellow dark:hover:bg-mikadoYellow dark:hover:text-yaleBlue bg-yaleBlue dark:border dark:border-mikadoYellow text-white"
          variant="outline"
        >
          <Plus />
          Add Budget
        </Button>
        {budgetModal && <BudgetForm onClose={() => setBudgetModal(false)} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgetQuery.data.data.map((item: getBudgetType) => {
            return (
              <div key={item._id}>
                <BudgetCard
                  budgetCategory={item.Category}
                  spentAmount={categorySpendingAmount[item.Category] || 0}
                  budgetName={item.BudgetName}
                  budgetAmount={item.Amount}
                  deleteBudget={() => setDeleteBudget(true)}
                  setId={() => setBudgetId(item._id)}
                />
              </div>
            );
          })}
        </div>
        {removeBudget && (
          <DeleteConfirmation
            showAlert={removeBudget}
            setAlert={() => setDeleteBudget(false)}
            deleteTransaction={() => handleDeleteBudget(budgetId)}
          />
        )}
      </>
    );
  }
  console.log(budgetQuery.data);
  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <EmptyBudgetCard addBudget={() => handleBudget()} />
      </div>
      {budgetModal && <BudgetForm onClose={() => setBudgetModal(false)} />}
    </>
  );
};

export default BudgetContainer;
