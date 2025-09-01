import { Target } from "lucide-react";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

type SavingsTotal = {
  total: string;
};

const SavingsCard = ({ total }: SavingsTotal) => {
  return (
    <>
      <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-500 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">
            Monthly Savings
          </CardTitle>
          <Target className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{`$${total}`}</div>
          {/* <p className="text-xs opacity-80 mt-1">$7,800 of $10,000 goal</p> */}
        </CardContent>
      </Card>
    </>
  );
};

export default SavingsCard;
