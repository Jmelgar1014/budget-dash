import { z } from "zod";

export const recurringTable = z.object({
  Vendor: z.string(),
  Category: z.string(),
  Description: z.string().optional(),
  Amount: z.number(),
  Frequency: z.string(),
  RecurringDate: z.number(),
  PurchaseType: z.string(),
  AuthId: z.string(),
});

export type recurringTableType = z.infer<typeof recurringTable>;
