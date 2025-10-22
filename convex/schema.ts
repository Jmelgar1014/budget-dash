import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  transactions: defineTable({
    Vendor: v.string(),
    Category: v.string(),
    Description: v.optional(v.string()),
    Amount: v.number(),
    PurchaseDate: v.number(),
    PurchaseType: v.string(),
    AuthId: v.string(),
    ImagePath: v.optional(v.string()),
  }).searchIndex("by_vendor", {
    searchField: "Vendor",
    filterFields: ["AuthId", "Category"],
  }),
  budgets: defineTable({
    AuthId: v.string(),
    BudgetName: v.string(),
    Amount: v.number(),
    Category: v.string(),
  }),
});
