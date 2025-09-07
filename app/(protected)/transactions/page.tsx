import AllTransactions from "@/components/AllTransactions";
import TransactionCards from "@/components/TransactionCards";
import React from "react";

const page = () => {
  return (
    <>
      <main className="container mx-auto px-4 py-8 space-y-8">
        <TransactionCards />
        <AllTransactions />
      </main>
    </>
  );
};

export default page;
