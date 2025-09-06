import { z } from "zod";

export const transactionType = z.object({
  Vendor: z.string(),
  Amount: z.number(),
  Category: z.string(),
  Description: z.string().optional(),
  PurchaseDate: z.date(),
  PurchaseType: z.string(),
});

export type transactionTableType = z.infer<typeof transactionType>;

export const TransactionDetailed = z.object({
  Amount: z.number(),
  Vendor: z.string(),
  Category: z.string(),
  Description: z.optional(z.string()),
  PurchaseDate: z.number(),
  PurchaseType: z.string(),
  _creationTime: z.number(),
  _id: z.string(),
  AuthId: z.string(),
});
export type DetailedTransaction = z.infer<typeof TransactionDetailed>;
