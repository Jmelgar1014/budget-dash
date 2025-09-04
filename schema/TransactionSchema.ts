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
