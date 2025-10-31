import { DetailedTransaction } from "@/schema/TransactionSchema";
import React from "react";

interface transactionDescription {
  transaction: DetailedTransaction;
}

const TransactionDetailDescription = ({
  transaction,
}: transactionDescription) => {
  return (
    <>
      <div className="bg-oxfordBlue border border-yaleBlue rounded-lg h-40">
        <div className="m-7">
          <h1 className="text-2xl font-semibold mb-4">Notes</h1>
          <h3 className="text-slate-400">
            {transaction.Description
              ? transaction.Description
              : "There was no description provided for transaction"}
          </h3>
        </div>
      </div>
    </>
  );
};

export default TransactionDetailDescription;
