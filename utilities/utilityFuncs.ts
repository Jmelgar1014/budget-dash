import { Transaction } from "@/components/Dashboard";

//get Total balance
export const getTotalBalance = (expenses: Transaction[]): string => {
  const totalExpenses = expenses.reduce((total, current) => {
    let result;
    if (current.PurchaseType === "Expense") {
      result = total -= current.Amount;
    } else {
      result = total += current.Amount;
    }
    return result;
  }, 0);
  return totalExpenses.toFixed(2).toString();
};

export const getExpensesOnly = (expenses: Transaction[]): string => {
  const allExpenses = expenses.filter(
    (item) => item.PurchaseType === "Expense"
  );

  const totals = allExpenses.reduce((total, current) => {
    return (total += current.Amount);
  }, 0);

  return totals.toFixed(2).toString();
};

export const getSavingsTotals = (expense: Transaction[]): string => {
  const savingsList = expense.filter((item) => item.PurchaseType === "Savings");

  const savingsTotal = savingsList.reduce((total, current) => {
    return total + current.Amount;
  }, 0);

  return savingsTotal.toFixed(2).toString();
};
