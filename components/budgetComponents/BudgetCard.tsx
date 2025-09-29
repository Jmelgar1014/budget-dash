"use client";
import { Pencil } from "lucide-react";
import React from "react";
import { Progress } from "../ui/progress";

const BudgetCard = () => {
  return (
    <>
      <div className="h-48 rounded-md shadow-lg ">
        <div className="flex justify-between px-8 py-6">
          <p className="font-semibold flex items-center">Home</p>
          <span className="m-4">
            <Pencil />
          </span>
        </div>
        <div className="px-8 py-6">
          <div className="flex justify-between">
            <p>0/800</p>
            <p>0.0%</p>
          </div>
          <Progress value={60} />
        </div>
      </div>
    </>
  );
};

export default BudgetCard;
