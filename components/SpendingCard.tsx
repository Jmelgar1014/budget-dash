import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp } from "lucide-react";

type SpendingTotal = {
  total: string;
};

const SpendingCard = ({ total }: SpendingTotal) => {
  return (
    <>
      <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">
            Monthly Spending
          </CardTitle>
          <TrendingUp className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{`$${total}`}</div>
          {/* <p className="text-xs opacity-80 mt-1">-8.2% from last month</p> */}
        </CardContent>
      </Card>
    </>
  );
};

export default SpendingCard;
