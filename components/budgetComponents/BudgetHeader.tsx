import React from "react";
import {
  Car,
  Home,
  Utensils,
  Zap,
  Circle,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

interface budgetProps {
  budgetName: string;
  budgetType: string;
  deleteBudget: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryIcons: Record<string, any> = {
  Food: Utensils,
  Transportation: Car,
  Utilities: Zap,
  Salary: Home,
  "Fixed Expsense": Home,
  Misc: ShoppingBag,
};

const BudgetHeader = ({
  budgetName,
  budgetType,
  deleteBudget,
}: budgetProps) => {
  const Icon = categoryIcons[budgetType] || Circle;
  return (
    <div className="flex w-full flex-col gap-6">
      <Item>
        <ItemContent className="flex">
          <div className="flex">
            <div className="p-4 dark:bg-yaleBlue rounded-lg dark:text-gold">
              <Icon
                className="h-4 w-4 dark:text-mikadoYellow text-oxfordBlue"
                // style={{ color: "#ffd60a" }}
              />
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
