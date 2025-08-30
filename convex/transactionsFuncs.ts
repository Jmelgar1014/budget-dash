import { mutation, query } from "./_generated/server";

import { v } from "convex/values";

// Create a new task with the given text
export const addTransaction = mutation({
  args: {
    Vendor: v.string(),
    Amount: v.number(),
    PurchaseDate: v.number(),
    PurchaseType: v.string(),
  },
  handler: async (ctx, args) => {
    // const parsed = transactionType.safeParse(args);

    // if (!parsed.success) {
    //   throw new Error(`Validation failed: ${parsed.error.message}`);
    // }

    const newTransaction = await ctx.db.insert("transactions", {
      Vendor: args.Vendor,
      Amount: args.Amount,
      PurchaseDate: args.PurchaseDate,
      PurchaseType: args.PurchaseType,
    });
    return newTransaction;
  },
});

export const getTransactions = query({
  handler: async (ctx) => {
    const transactions = await ctx.db.query("transactions").collect();
    return transactions;
  },
});
