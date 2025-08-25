import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  transactions: defineTable({
    Vendor: v.string(),
    Amount: v.float64(),
    PurchaseDate: v.string(),
    PurchaseType: v.string(),
  }),
});
