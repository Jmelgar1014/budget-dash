import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { X } from "lucide-react";

const TransactionDetailDeleted = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <X />
        </EmptyMedia>
        <EmptyTitle>Transaction Does Not Exist</EmptyTitle>
        <EmptyDescription>Return to all transactions. </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
};

export default TransactionDetailDeleted;
