import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBudget = mutation({
  args: { AuthId: v.string(), BudgetName: v.string(), Amount: v.number() },
  handler: async (ctx, args) => {
    const newBudget = await ctx.db.insert("budgets", {
      AuthId: args.AuthId,
      BudgetName: args.BudgetName,
      Amount: args.Amount,
    });
    return newBudget;
  },
});

export const getBudgets = query({
  args: { AuthId: v.string() },
  handler: async (ctx, args) => {
    const budgets = await ctx.db
      .query("budgets")
      .filter((item) => item.and(item.eq(item.field("AuthId"), args.AuthId)))
      .collect();

    return budgets;
  },
});
