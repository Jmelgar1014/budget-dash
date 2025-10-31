import React from "react";
import { Badge } from "../ui/badge";
import { Image, Receipt } from "lucide-react";

const TransactionDetailViewReceipt = () => {
  return (
    <>
      <div className="bg-oxfordBlue border border-yaleBlue rounded-lg h-28 ">
        <div className="m-7">
          <div className="flex justify-between">
            <div className="flex">
              <Receipt className="mr-2" />
              <h1 className="text-2xl font-semibold">Receipt Image</h1>
            </div>
            <Badge className="dark:bg-richBlack/50 dark:text-mikadoYellow px-4 font-semibold">
              Show
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetailViewReceipt;
