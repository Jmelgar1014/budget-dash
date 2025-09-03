import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  transactions: defineTable({
    Vendor: v.string(),
    Amount: v.number(),
    PurchaseDate: v.number(),
    PurchaseType: v.string(),
    AuthId: v.string(),
  }),
});
