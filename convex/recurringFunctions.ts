import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addRecurringTransaction = mutation({
  args: {
    Vendor: v.string(),
    Category: v.string(),
    Description: v.optional(v.string()),
    Amount: v.number(),
    RecurringDate: v.number(),
    Frequency: v.string(),
    PurchaseType: v.string(),
    AuthId: v.string(),
  },
  handler: async (ctx, args) => {
    const transactions = await ctx.db.insert("recurringTransactions", {
      Vendor: args.Vendor,
      Category: args.Category,
      Description: args.Description,
      Amount: args.Amount,
      RecurringDate: args.RecurringDate,
      Frequency: args.Frequency,
      PurchaseType: args.PurchaseType,
      AuthId: args.AuthId,
    });

    return transactions;
  },
});
