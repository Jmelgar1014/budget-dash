import { z } from "zod";

export const transactionType = z.object({
  Vendor: z.string(),
  Amount: z.float64(),
  PurchaseDate: z.string(),
  PurchaseType: z.string(),
});

export type transactionTableType = z.infer<typeof transactionType>;
