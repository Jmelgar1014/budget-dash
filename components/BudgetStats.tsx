import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const budgetCategories = [
  { name: "Housing", spent: 1200, budget: 1400, color: "hsl(var(--chart-1))" },
  {
    name: "Food & Dining",
    spent: 650,
    budget: 800,
    color: "hsl(var(--chart-2))",
  },
  {
    name: "Transportation",
    spent: 420,
    budget: 500,
    color: "hsl(var(--chart-3))",
  },
  {
    name: "Entertainment",
    spent: 280,
    budget: 300,
    color: "hsl(var(--chart-4))",
  },
  { name: "Shopping", spent: 380, budget: 400, color: "hsl(var(--chart-5))" },
  { name: "Utilities", spent: 180, budget: 200, color: "hsl(var(--accent))" },
];

export function BudgetStats() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-serif">Budget Progress</CardTitle>
        <CardDescription>
          Track your spending against your monthly budget goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgetCategories.map((category) => {
            const percentage = (category.spent / category.budget) * 100;
            const isOverBudget = percentage > 100;

            return (
              <div key={category.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-sm">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      ${category.spent} / ${category.budget}
                    </div>
                    <div
                      className={`text-xs ${
                        isOverBudget
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {percentage.toFixed(0)}% used
                    </div>
                  </div>
                </div>
                <Progress
                  value={Math.min(percentage, 100)}
                  className="h-2"
                  style={
                    {
                      "--progress-background": isOverBudget
                        ? "hsl(var(--destructive))"
                        : category.color,
                    } as React.CSSProperties
                  }
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
