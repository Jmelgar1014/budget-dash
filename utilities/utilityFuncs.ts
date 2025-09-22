import { TransactionDetailed } from "@/Types/types";

//get Total balance
export const getTotalBalance = (expenses: TransactionDetailed[]): string => {
  const totalExpenses = expenses.reduce((total, current) => {
    let result;
    if (
      current.PurchaseType === "Expense" ||
      current.PurchaseType === "Savings"
    ) {
      result = total -= current.Amount;
    } else {
      result = total += current.Amount;
    }
    return result;
  }, 0);
  return totalExpenses.toFixed(2).toString();
};

export const getExpensesOnly = (expenses: TransactionDetailed[]): string => {
  const allExpenses = expenses.filter(
    (item) => item.PurchaseType === "Expense"
  );

  const totals = allExpenses.reduce((total, current) => {
    return (total += current.Amount);
  }, 0);

  return totals.toFixed(2).toString();
};

export const getSavingsTotals = (expense: TransactionDetailed[]): string => {
  const savingsList = expense.filter((item) => item.PurchaseType === "Savings");

  const savingsTotal = savingsList.reduce((total, current) => {
    return total + current.Amount;
  }, 0);

  return savingsTotal.toFixed(2).toString();
};

export const convertToChart = (array: TransactionDetailed[]) => {
  const result = array.reduce(
    (acc, item) => {
      if (acc[item.Category]) {
        acc[item.Category] += item.Amount;
      } else {
        acc[item.Category] = item.Amount;
      }
      return acc;
    },
    {} as Record<string, number>
  );
  return Object.entries(result).map(([category, total]) => ({
    name: category,
    value: total,
  }));
};

export const adding = (num1: number, num2: number): number => {
  return num1 + num2;
};
