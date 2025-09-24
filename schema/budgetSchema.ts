import { z } from "zod";

export const budgetTable = z.object({
  //   AuthId: z.string(),
  BudgetName: z.string(),
  Amount: z.number(),
});

export type budgetTableType = z.infer<typeof budgetTable>;
