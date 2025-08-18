import { Badge } from "@/components/ui/badge";
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

export function RecentTransactions() {
  return (
    <div className="space-y-3">
      {transactions.map((transaction) => {
        const Icon = transaction.icon;
        return (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${transaction.color}15` }}
              >
                <Icon
                  className="h-4 w-4"
                  style={{ color: transaction.color }}
                />
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {transaction.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {transaction.date}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`font-semibold ${
                transaction.amount > 0 ? "text-primary" : "text-foreground"
              }`}
            >
              {transaction.amount > 0 ? "+" : ""}$
              {Math.abs(transaction.amount).toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
