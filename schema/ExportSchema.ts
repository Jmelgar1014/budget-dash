import { z } from "zod";

export const exportTable = z.object({
  Amount: z.number(),
  Vendor: z.string(),
  Category: z.string(),
  PurchaseDate: z.number(),
  PurchaseType: z.string(),
});

export type tableExport = z.infer<typeof exportTable>;
