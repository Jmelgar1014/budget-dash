"use client";
import { Pencil } from "lucide-react";
import React from "react";
import { Progress } from "../ui/progress";

interface budgetInfo {
  budgetName: string;
  budgetAmount: number;
}

const BudgetCard = ({ budgetAmount, budgetName }: budgetInfo) => {
  return (
    <>
      <div className="h-48 rounded-md shadow-lg ">
        <div className="flex justify-between px-8 py-6">
          <p className="font-semibold flex items-center">{budgetName}</p>
          <span className="m-4">
            <Pencil />
          </span>
        </div>
        <div className="px-8 py-6">
          <div className="flex justify-between">
            <p>{budgetAmount}</p>
            <p>0.0%</p>
          </div>
          <Progress value={60} />
        </div>
      </div>
    </>
  );
};

export default BudgetCard;
