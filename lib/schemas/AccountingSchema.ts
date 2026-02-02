import { z } from "zod";

export const AccountingSchema = z.object({
  id: z.string(),
  company: z.string(),
  daily_sales: z.number(),
  monthly_sales: z.number(),
  transaction_date: z.string(),
  profit_margin: z.number(),
});

export const AccountingArraySchema = z.array(AccountingSchema);

export type IAccountingType = z.infer<typeof AccountingSchema>;
