import { Badge } from "@/components/ui/badge";
import { TransactionDetailed } from "@/Types/types";
import { Car, Home, Utensils, Gamepad2, Zap } from "lucide-react";

const transactions = [
  {
    id: 1,
    description: "Grocery Store",
    amount: -85.5,
    category: "Food & Dining",
    date: "2 hours ago",
    icon: Utensils,
    color: "hsl(var(--chart-2))",
  },
  {
    id: 2,
    description: "Gas Station",
    amount: -45.2,
    category: "Transportation",
    date: "1 day ago",
    icon: Car,
    color: "hsl(var(--chart-3))",
  },
  {
    id: 3,
    description: "Salary Deposit",
    amount: 3200.0,
    category: "Income",
    date: "2 days ago",
    icon: Home,
    color: "hsl(var(--primary))",
  },
  {
    id: 4,
    description: "Netflix Subscription",
    amount: -15.99,
    category: "Entertainment",
    date: "3 days ago",
    icon: Gamepad2,
    color: "hsl(var(--chart-4))",
  },
  {
    id: 5,
    description: "Electric Bill",
    amount: -120.45,
    category: "Utilities",
    date: "5 days ago",
    icon: Zap,
    color: "hsl(var(--accent))",
  },
];

type TransactionArray = {
  TransactionData: TransactionDetailed[];
};

export function RecentTransactions({ TransactionData }: TransactionArray) {
  return (
    <div className="space-y-3">
      {TransactionData.map((transaction) => {
        return (
          <div
            key={transaction.Id}
            className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "green" }}
              >
                {/* <Icon className="h-4 w-4" style={{ color: "green" }} /> */}
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.Description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {transaction.Category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {transaction.PurchaseDate}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`font-semibold ${
                transaction.Amount > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {transaction.Amount > 0 ? "+" : ""}$
              {transaction.Amount.toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
