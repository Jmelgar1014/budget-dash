import React from "react";
import { Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface emptyBudgetProps {
  addBudget: () => void;
}

const EmptyBudgetCard = ({ addBudget }: emptyBudgetProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-richBlack dark:bg-oxfordBlue">
          <Target
            size={48}
            className="dark:text-mikadoYellow text-mikadoYellow "
          />
        </EmptyMedia>
        <EmptyTitle className="dark:text-mikadoYellow text-yaleBlue">
          No Budgets Yet
        </EmptyTitle>
        <EmptyDescription className="">
          You haven&apos;t created any budgets yet. Get started by creating your
          first budget.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2 ">
          <Button
            className="cursor-pointer hover:text-oxfordBlue dark:bg-richBlack hover:bg-mikadoYellow dark:hover:bg-mikadoYellow dark:hover:text-yaleBlue bg-yaleBlue dark:border dark:border-mikadoYellow dark:text-white text-white"
            onClick={addBudget}
          >
            Create Budget
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyBudgetCard;
