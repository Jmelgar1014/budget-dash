import React from "react";
import {
  BadgeCheckIcon,
  ChevronRightIcon,
  Trash2,
  Utensils,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

interface budgetProps {
  budgetName: string;
  budgetType: string;
  deleteBudget: () => void;
}

const BudgetHeader = ({
  budgetName,
  budgetType,
  deleteBudget,
}: budgetProps) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Item>
        <ItemContent className="flex">
          <div className="flex">
            <div className="p-4 dark:bg-yaleBlue rounded-lg dark:text-gold">
              <Utensils size={16} />
            </div>
            <div className="mx-4">
              <ItemTitle className="text-xl font-bold">{budgetName}</ItemTitle>
              <ItemDescription className="text-sm font-medium">
                {`${budgetType} budget`}
              </ItemDescription>
            </div>
          </div>
        </ItemContent>
        <ItemActions>
          <Button
            className="cursor-pointer dark:bg-transparent dark:text-gray-400 dark:hover:text-white dark:hover:bg-yaleBlue"
            size="sm"
            onClick={() => deleteBudget()}
          >
            <Trash2 />
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
};

export default BudgetHeader;
