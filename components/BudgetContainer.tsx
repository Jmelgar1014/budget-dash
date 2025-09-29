"use client";
import React, { useState } from "react";
import { Plus, Target } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import BudgetForm from "./FormComponents/BudgetForm";
import BudgetCard from "./budgetComponents/BudgetCard";
const BudgetContainer = () => {
  const [budgetModal, setBudgetModal] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { isPending, data, error } = useQuery({
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

  if (error) {
    console.log(error);
    return <div>There is an error</div>;
  }

  if (isPending) {
    return <div>Loading</div>;
  }

  const handleBudget = () => {
    setBudgetModal(true);
  };
  if (data.data) {
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
          {data.data.map((item, index) => {
            return (
              <div key={index}>
                <BudgetCard />
              </div>
            );
          })}
        </div>
      </>
    );
  }
  console.log(data);
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
