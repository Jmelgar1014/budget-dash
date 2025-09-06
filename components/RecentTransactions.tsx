import { Badge } from "@/components/ui/badge";
import { DetailedTransaction } from "@/schema/TransactionSchema";
import { Car, Home, Utensils, Gamepad2, Zap } from "lucide-react";

type TransactionArray = {
  TransactionData: DetailedTransaction[];
};

export function RecentTransactions({ TransactionData }: TransactionArray) {
  return (
    <div className="space-y-3">
      {TransactionData.map((transaction) => {
        return (
          <div
            key={transaction._id}
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
                transaction.PurchaseType === "Income" ||
                transaction.PurchaseType === "Savings"
                  ? "text-green-600"
                  : "text-red-600"
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
