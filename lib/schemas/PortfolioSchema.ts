import { z } from "zod";

export const PortfolioSchema = z.object({
  portfolioId: z.string(),
  carveoutId: z.string(),
  portfolioLongName: z.string(),
  carveoutLongName: z.string(),
  currency: z.string(),
});

export const PortfolioListSchema = z.array(PortfolioSchema);

export type PortfolioRow = z.infer<typeof PortfolioSchema>;
