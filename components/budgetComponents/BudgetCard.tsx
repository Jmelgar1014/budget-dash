"use client";
import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

interface budgetInfo {
  budgetName: string;
  budgetAmount: number;
  spentAmount: number;
  budgetCategory: string;
}

const BudgetCard = ({
  budgetAmount,
  budgetName,
  spentAmount,
  budgetCategory,
}: budgetInfo) => {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    setPercent((spentAmount / budgetAmount) * 100);
  }, [spentAmount, budgetAmount]);

  return (
    <>
      <div className="h-48 rounded-md shadow-lg bg-card ">
        <div className="flex justify-between px-8 py-6">
          <p className="font-semibold flex items-center">{budgetName}</p>
          <span className="m-4">
            <Pencil />
          </span>
        </div>
        <div className="px-8 py-6">
          <div className="flex justify-between">
            <p>
              {spentAmount}/{budgetAmount}
            </p>
            <p>{budgetCategory}</p>
            <p
              className={`${percent < 100 ? "text-green-600" : "text-red-600"} font-semibold`}
            >{`${percent.toFixed(2)}%`}</p>
          </div>
          <Progress value={percent <= 100 ? percent : 100} />
        </div>
      </div>
    </>
  );
};

export default BudgetCard;
