import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign } from "lucide-react";

type TimeTotals = {
  total: string;
};

const BalanceCard = ({ total }: TimeTotals) => {
  return (
    <>
      <Card className="border border-white/5 shadow-lg bg-gradient-to-br from-oxfordBlue to-yaleBlue text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">
            Total Balance
          </CardTitle>
          <DollarSign className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{`$${total}`}</div>
          {/* <p className="text-xs opacity-80 mt-1">+12.5% from last month</p> */}
        </CardContent>
      </Card>
    </>
  );
};

export default BalanceCard;
