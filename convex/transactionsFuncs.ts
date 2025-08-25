import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { z } from "zod";
import {
  transactionTableType,
  transactionType,
} from "../schema/TransactionSchema";

// Create a new task with the given text
export const addTransaction = mutation({
  args: {
    Vendor: v.string(),
    Amount: v.float64(),
    PurchaseDate: v.string(),
    PurchaseType: v.string(),
  },
  handler: async (ctx, args) => {
    const parsed = transactionType.safeParse(args);

    if (!parsed.success) {
      throw new Error(`Validation failed: ${parsed.error.message}`);
    }

    const newTransaction = await ctx.db.insert("transactions", parsed.data);
    return newTransaction;
  },
});
