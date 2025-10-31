import React from "react";
import { Skeleton } from "../ui/skeleton";

const SingleTransactionSkeleton = () => {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <Skeleton className="h-88 rounded-lg" />
      </div>
    </main>
  );
};

export default SingleTransactionSkeleton;
