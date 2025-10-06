"use client";
import { SquareX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import BudgetHeader from "./BudgetHeader";

interface budgetInfo {
  budgetName: string;
  budgetAmount: number;
  spentAmount: number;
  budgetCategory: string;
  deleteBudget: () => void;
  setId: () => void;
}

const BudgetCard = ({
  budgetAmount,
  budgetName,
  spentAmount,
  budgetCategory,
  deleteBudget,
  setId,
}: budgetInfo) => {
  const [percent, setPercent] = useState<number>(0);

  const setIdAndConfirmation = () => {
    deleteBudget();
    setId();
  };

  useEffect(() => {
    setPercent((spentAmount / budgetAmount) * 100);
  }, [spentAmount, budgetAmount]);

  return (
    <>
      <div className="h-56 rounded-2xl hover:shadow-lg hover:shadow-gold transition-all duration-300 hover:-translate-y-1  dark:bg-oxfordBlue border-2 border-yaleBlue hover:border-gold">
        <div className="flex justify-between px-2 py-6">
          <BudgetHeader
            budgetName={budgetName}
            budgetType={budgetCategory}
            deleteBudget={setIdAndConfirmation}
          />
          {/* <p className="font-semibold flex items-center text-oxfordBlue dark:text-mikadoYellow">
            {budgetName}
          </p>
          <span
            className="m-4 hover:cursor-pointer p-1 rounded-md hover:dark:bg-yaleBlue hover:bg-mikadoYellow "
            onClick={setIdAndConfirmation}
          >
            <SquareX className="text-oxfordBlue dark:text-mikadoYellow" />
          </span> */}
        </div>
        <div className="px-4 py-6">
          <div className="flex justify-between mb-2">
            <p className="text-oxfordBlue dark:text-mikadoYellow">
              {`$${spentAmount}/$${budgetAmount}`}
            </p>
            <p className="text-oxfordBlue dark:text-mikadoYellow">
              {budgetCategory}
            </p>
            <p
              className={`${percent < 100 ? "text-green-600" : "text-red-600"} font-semibold`}
            >{`${percent.toFixed(2)}%`}</p>
          </div>
          <Progress
            value={percent <= 100 ? percent : 100}
            className="[&>div]:bg-gold"
          />
        </div>
      </div>
    </>
  );
};

export default BudgetCard;
