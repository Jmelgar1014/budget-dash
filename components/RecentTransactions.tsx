import { Badge } from "@/components/ui/badge";
import { DetailedTransaction } from "@/schema/TransactionSchema";
import { Car, Home, Utensils, Zap, Circle, ShoppingBag } from "lucide-react";

type TransactionArray = {
  TransactionData: DetailedTransaction[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryIcons: Record<string, any> = {
  Food: Utensils,
  Transportation: Car,
  Utilities: Zap,
  Salary: Home,
  "Fixed Expsense": Home,
  Misc: ShoppingBag,
};

export function RecentTransactions({ TransactionData }: TransactionArray) {
  return (
    <div className="space-y-3">
      {TransactionData.map((transaction) => {
        const millisecondsToDate = new Date(transaction.PurchaseDate);
        const Icon = categoryIcons[transaction.Category] || Circle;
        return (
          <div
            key={transaction._id}
            className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "" }}>
                <Icon className="h-4 w-4" style={{ color: "black" }} />
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.Vendor}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {transaction.Category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {millisecondsToDate.toDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`font-semibold ${
                transaction.PurchaseType === "Income" ||
                transaction.PurchaseType === "Savings"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.PurchaseType === "Expense" ? "-" : "+"}$
              {transaction.Amount.toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
