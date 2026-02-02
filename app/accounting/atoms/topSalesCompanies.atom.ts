import { atom } from "jotai";
import { accountingDataAtom } from "./accountingData.atom";

export interface TopSalesCompany {
  company: string;
  totalSales: number;
}

/**
 * Aggregates total sales per company and returns top sellers
 */
export const topSalesCompaniesAtom = atom((get) => {
  const data = get(accountingDataAtom);
  if (!data?.length) return [];

  const totals = new Map<string, number>();

  data.forEach(({ company, monthly_sales }) => {
    if (monthly_sales > 0) {
      totals.set(company, (totals.get(company) || 0) + monthly_sales);
    }
  });

  return Array.from(totals.entries())
    .map(([company, totalSales]) => ({ company, totalSales }))
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 5);
});
