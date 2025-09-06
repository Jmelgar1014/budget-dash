import { mutation, query } from "./_generated/server";

import { v } from "convex/values";

// Create a new task with the given text
export const addTransaction = mutation({
  args: {
    Vendor: v.string(),
    Category: v.string(),
    Description: v.optional(v.string()),
    Amount: v.number(),
    PurchaseDate: v.number(),
    PurchaseType: v.string(),
    AuthId: v.string(),
  },
  handler: async (ctx, args) => {
    const newTransaction = await ctx.db.insert("transactions", {
      Vendor: args.Vendor,
      Amount: args.Amount,
      Category: args.Category,
      Description: args.Description,
      PurchaseDate: args.PurchaseDate,
      PurchaseType: args.PurchaseType,
      AuthId: args.AuthId,
    });
    return newTransaction;
  },
});

export const getTransactions = query({
  args: {
    month: v.number(),
    year: v.number(),
    AuthId: v.string(),
  },
  handler: async (ctx, args) => {
    const startOfMonth = new Date(args.year, args.month - 1, 1).getTime();
    const endOfMonth = new Date(args.year, args.month, 0, 23, 59, 59).getTime();
    const transactions = await ctx.db
      .query("transactions")
      .filter((item) =>
        item.and(
          item.gte(item.field("PurchaseDate"), startOfMonth),
          item.lte(item.field("PurchaseDate"), endOfMonth),
          item.eq(item.field("AuthId"), args.AuthId)
        )
      )
      .order("desc")
      .collect();
    return transactions;
  },
});
