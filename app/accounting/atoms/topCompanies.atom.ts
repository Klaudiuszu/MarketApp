import { atom } from "jotai";
import { ChartDataPoint } from "../topCompanies/types";
import { accountingDataAtom } from "./accountingData.atom";

/**
 * Builds time-series chart data and extracts top companies by total sales
 */
export const topCompaniesAtom = atom((get) => {
  const data = get(accountingDataAtom);
  if (!data?.length) {
    return { chartData: [], topCompanies: [] };
  }

  const dateMap = new Map<string, Map<string, number>>();

  data.forEach(({ transaction_date, company, monthly_sales }) => {
    if (!dateMap.has(transaction_date)) {
      dateMap.set(transaction_date, new Map());
    }

    const companyMap = dateMap.get(transaction_date)!;
    companyMap.set(
      company,
      Math.max(companyMap.get(company) ?? 0, monthly_sales),
    );
  });

  const companyTotals = new Map<string, number>();
  dateMap.forEach((companyMap) => {
    companyMap.forEach((sales, company) => {
      if (sales > 0) {
        companyTotals.set(company, (companyTotals.get(company) || 0) + sales);
      }
    });
  });

  const topCompanies = Array.from(companyTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([company]) => company);

  const chartData: ChartDataPoint[] = Array.from(dateMap.keys())
    .sort()
    .map((date) => {
      const companyMap = dateMap.get(date)!;
      const point: ChartDataPoint = { date };

      let hasSales = false;
      topCompanies.forEach((company) => {
        const value = companyMap.get(company) ?? 0;
        point[company] = value > 0 ? value : null;
        if (value > 0) hasSales = true;
      });

      return hasSales ? point : null;
    })
    .filter(Boolean) as ChartDataPoint[];

  return { chartData, topCompanies };
});
